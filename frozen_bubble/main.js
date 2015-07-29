//---------------------------
var GAME_WIN = 0;
var GAME_LOSE = 1;
var KEY_DOWN = 2;

var level = 1;

//localStorage.removeItem("level");
if(localStorage.level){
   
    level = parseInt(localStorage.getItem("level"));
    
}
else{
    localStorage.level = level;
}



var ready = false;


//---------------------------

var context = document.getElementById('canvas').getContext('2d');


var game = new GameWindow(context,level);

var image_loaded = false;

var waiting = false;

//---------------------------
var srcs = new Array();
var picture_names = ["background.jpg","launcher.png"];
for(var i = 0;i < 8;++i){
    picture_names.push("/balls/"+i+".gif");
    picture_names.push("/balls/frozen_"+i+".gif");

}

srcs.push("pictures/compressor.gif");
srcs.push("pictures/compressor_body.png");
srcs.push("pictures/bubbleFont.gif");
srcs.push("pictures/win_panel.jpg");
srcs.push("pictures/lose_panel.jpg");

for(var i = 0;i < picture_names.length;++i)
    srcs.push("pictures/"+picture_names[i]);

var loader = new ImageLoader(srcs,function(){ image_loaded = true;
					      game.draw();});

//---------------------------


//---------------------------

var main_interval = setInterval(main,0);

function main(){

    if(!image_loaded)
	return;
    
    if(messageBox.length > 0){

	var msg = messageBox.shift();
	switch (msg.id){
	case GAME_WIN:
	    clearInterval(main_interval);
	    break;
	case KEY_DOWN:
	    if(game.status != NORMAL && ready){
		level += ready-1;
		game = new GameWindow(context,level);
		localStorage.level = level;
		ready = false;
		game.draw();
		return;
	    }
	    game.play(msg.which);
	    break;
	}
    }
	switch(game.status){
	case WIN:
	    ready = 2;
	    break;
	case LOSE:
	    ready = 1;
	    break;
	}

    
}


