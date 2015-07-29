function BubbleFont(){

    this.chars = [
    '!', '"', '#', '$', '%', '&', '\'', '(', ')', '*',
    '+', ',', '-', '.', '/', '0', '1', '2', '3', '4',
    '5', '6', '7', '8', '9', ':', ';', '<', '=', '>',
    '?', '@', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '|', '{',
    '}', '[', ']', ' ', '\\', ' ', ' '];
    
    this.positions = [
    0, 9, 16, 31, 39, 54, 69, 73, 80, 88, 96, 116, 121, 131,
    137, 154, 165, 175, 187, 198, 210, 223, 234, 246, 259,
    271, 276, 282, 293, 313, 324, 336, 351, 360, 370, 381,
    390, 402, 411, 421, 435, 446, 459, 472, 483, 495, 508,
    517, 527, 538, 552, 565, 578, 589, 602, 616, 631, 645,
    663, 684, 700, 716, 732, 748, 764, 780, 796, 812 ];

    this.SPACE_CHAR_WIDTH = 6;
    this.SEPERATE_WIDTH = 1;
    
    this.img = new Image();
    this.img.src = "pictures/bubbleFont.gif";
    

}

BubbleFont.prototype.findIndex = function(c){
   
    for(var i = 0;i < this.chars.length;++i){
	
	if(this.chars[i] == c)
	    return i;
    }
    return -1;
}

BubbleFont.prototype.drawChar= function(context,x,y,c){
    
    if(c == " "){
	return this.SEPERATE_WIDTH + this.SPACE_CHAR_WIDTH;
    }
    var index = this.findIndex(c);
    
    if(index == -1)
	return;
    var sx = this.positions[index];
    var width = this.positions[index+1] - sx;
    
    var sy = 0;
    context.drawImage(this.img,sx,sy,width,this.img.height,x,y,width,this.img.height);

    return width + this.SEPERATE_WIDTH;
}

BubbleFont.prototype.print = function(s,x,y,context){

    var len = s.length;
    for(var i = 0;i < len;++i){
	var c = s[i];
	x += this.drawChar(context,x,y,c);
	
    }

}
