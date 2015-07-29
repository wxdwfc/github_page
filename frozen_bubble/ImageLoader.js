// ²Î¿¼http://www.webreference.com/programming/javascript/gr/column3/index.html

function ImageLoader(srcs,callBack){

    this.srcs = srcs;
    this.callBack = callBack;
    this.length = srcs.length;
    
    this.alImages = new Array();
    this.nload = 0;

    for(var i = 0;i < this.length;++i){
	this.load(srcs[i]);
    }
    
}

ImageLoader.prototype.load = function(image){

    var img = new Image();
    img.src = image;
    this.alImages.push(img);

    img.onload = ImageLoader.prototype.onload;
    img.loader = this;
}

ImageLoader.prototype.onload = function(){

    this.loader.nload++;
    this.loader.onComplete();
}


ImageLoader.prototype.onComplete = function(){
    if(this.nload == this.length)
	this.callBack();
}