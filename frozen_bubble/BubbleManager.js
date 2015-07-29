function BubbleManager(){

	this.bubbles = new Array();
	for(var i = 0;i < 8;++i)
		this.bubbles.push(false);

    this.length = 0;
}

BubbleManager.prototype.add = function(id){
    if(this.bubbles[id])
	return;
    this.bubbles[id] = true;
    this.length++;
    
}

BubbleManager.prototype.get = function(){
	var index = Math.floor(Math.random()*(this.bubbles.length));
    if(this.length == 0)
	return index;
    if(this.bubbles[index])
	return index;
    else
	return this.get();
    
}

BubbleManager.prototype.reSet = function(){
    for(var i = 0;i < this.bubbles.length;++i)
	this.bubbles[i] = false;
    this.length = 0;
}

function test(){
	var manager = new BubbleManager();
	manager.add(0);
	manager.add(3);
	manager.add(4);
	console.log(manager.get());

}

//test();