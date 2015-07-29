function Launcher(){

    this.launcher = new Image();
    this.launcher.src = "pictures/launcher.png";
    this.ball = new Image();
    this.ball.src = null;
    this.position = 20;

}


Launcher.prototype.changePos = function(pos){
    this.position = pos;

}

Launcher.prototype.draw = function(context){
    if(this.ball.src)
	context.drawImage(this.ball,302,390);
    context.save();
    context.translate(318,406);
    context.rotate(0.025 * Math.PI * (this.position - 20));
    context.drawImage(this.launcher,-50,-50);
    context.restore();
    

}