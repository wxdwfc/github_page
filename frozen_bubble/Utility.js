var messageBox = new Array();
var LEFT = 37;
var RIGHT = 39;
var ENTER = 13;

var NORMAL = 1;
var WIN = 2;
var LOSE = 3;

function onKeyPress(evt){
    evt.preventDefault();
    var msg={};
    msg.id=KEY_DOWN;
    msg.which=evt.which;
    messageBox.push(msg);
}

function min(x,y){
	if(x>y)
		return y;
	else
		return x;

}

function max(x,y){

	if(x>y)
		return x;
	else
		return y;
}