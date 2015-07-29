function GameWindow(context,n){
	
    var level = levels[n];	
    
    this.context = context;
    this.bubbles = new Array();
  
    this.waiting = true;
    
    this.dropped = new Array();
    this.jump = new Array();
    this.fall = new Array();
    this.manager = new BubbleManager();
    
    for(var i = 0;i < 13;++i)
	this.bubbles.push(new Array());
    for(var i = 0;i < level.length;++i){
	if(i%2){
	    for(var j = 0;j < 7;++j){
		if(level[i][j] != -1){
		    this.bubbles[i][j+1] = new Bubble(level[i][j],new Point(190+(j+1)*32-(i%2)*16,44+i*28),this,true);
		    this.manager.add(level[i][j]);
		}
	    }
	}
	else{
	    
	    for(var j = 0;j < 8;++j){
		if(level[i][j] != -1){
		    
		    this.bubbles[i][j] = new Bubble(level[i][j],new Point(190+j*32-(i%2)*16,44+i*28),this,true);
		    this.manager.add(level[i][j]);
		}
		
	    }
	}
	
    }
    this.sprites = new Array();
    this.backGround = new Image();
    this.backGround.src = "pictures/background.jpg";
    this.width = 640;
    this.height = 480;
    this.launcherDirc = 20;
    this.launcher = new Launcher();
    //
    this.nextBubble = new Image();
    this.nextBubble.id = this.manager.get();
    this.nextBubble.src = "pictures/balls/"+this.nextBubble.id+".gif";
    
    
    //		
    this.movingBubble = new Bubble(this.manager.get(),new Point(302,390),this,false);
    this.movingBubble.changeDirection(20);
    this.waiting = false;
    this.compressor = new Compressor();
    this.bubblefont = new BubbleFont();
    
    
    this.loseGame = new  Image();
    this.winGame = new Image();
    this.loseGame.src = "pictures/lose_panel.jpg";
    this.winGame.src = "pictures/win_panel.jpg";
    
    this.font = new BubbleFont();
    this.levelNumber = n + 1;
    this.moveDown = 0;
    this.steps = 0;

//    this.sendBubblesDown();
//    this.sendBubblesDown();
//    this.sendBubblesDown();
    
    this.status = NORMAL;
    
    //		console.log(this.manager.bubbles);
}


GameWindow.prototype.draw = function(){
    this.context.drawImage(this.backGround,0,0);
    for(var i = 0;i < this.sprites.length;++i){
	if(this.sprites[i])
	    this.sprites[i].draw(this.context);
    }
    for(var i = 0;i < 13;++i){
	for(var j = 0;j < 8;++j){
	    if(this.bubbles[i][j])
		this.bubbles[i][j].draw(this.context);
	}
    }
    for(var i = 0;i < this.jump.length;++i){
	this.jump[i].draw(this.context);
    }
    
    context.drawImage(this.nextBubble,302,440);
    this.launcher.draw(this.context);
    
    this.movingBubble.draw(this.context);
    this.compressor.draw(this.context);
    
    var y = 433;
    var x;
    
    if(this.levelNumber < 10){
	x = 185;
	this.font.print(this.levelNumber.toString(),x,y,this.context);
    }
    else{
	x = 178;
	this.font.print(this.levelNumber.toString(),x,y,this.context);
    }
    
    if(this.status == WIN){
	this.context.drawImage(this.winGame,152,190,337,116);
    }
    else if(this.status == LOSE){
	
	
	var id = this.manager.get();
	this.nextBubble.src = "pictures/balls/frozen_"+id+".gif";
	this.context.drawImage(this.nextBubble,302-1,440-1);
	this.context.drawImage(this.loseGame,152,190,337,116);
    }
    
    
}

GameWindow.prototype.clear = function(){
    this.context.clearRect(0,0,this.width,this.height);
    
}



GameWindow.prototype.redraw = function(){
    this.clear();
    this.draw();
    
}

GameWindow.prototype.addSprite = function(sprite){
    this.sprites.push(sprite);
    
}

GameWindow.prototype.getGrid = function(){
	return this.bubbles;
}

GameWindow.prototype.play = function(key){
    if(this.status != NORMAL)
	return;
	var thisGame = this;
	var context = this.context;
	
    var launcher_interval = null;
    var jump_interval = null;

	switch(key){
	   case RIGHT:
		this.launcherDirc++;
		if(this.launcherDirc > 39)
			this.launcherDirc = 39;
		game.launcher.changePos(this.launcherDirc);
		game.movingBubble.changeDirection(this.launcherDirc);
		game.redraw();
		break;
	    case LEFT:
		this.launcherDirc--;
		if(this.launcherDirc < 1)
			this.launcherDirc = 1;
		game.launcher.changePos(this.launcherDirc);
		game.movingBubble.changeDirection(this.launcherDirc);
		game.redraw();
		break;
		case ENTER:
	    thisGame.steps++;
	    if(!(this.steps % 8)){
		
		thisGame.sendBubblesDown();
		
		thisGame.redraw();
		
	    }
		launcher_interval = setInterval(function(){
			thisGame.movingBubble.move();
			thisGame.redraw();
			if(thisGame.movingBubble.fixed){
			    if(thisGame.movingBubble.leftTop.y >= 380 && !thisGame.movingBubble.released){
				
				thisGame.frozen();
	
				clearInterval(launcher_interval);
				thisGame.redraw();
				return;
			    }
			    var position = thisGame.movingBubble.currentPosition();
			    thisGame.bubbles[position.y][position.x] = thisGame.movingBubble;
			    thisGame.movingBubble = new Bubble(thisGame.nextBubble.id,new Point(302,390),thisGame,false);
			    thisGame.movingBubble.changeDirection(thisGame.launcherDirc);
			    var radId = thisGame.manager.get();
			    /*				var radId = Math.floor(Math.random()*8);
							if(radId < 0)
							radId = 0;
							if(radId > 7)
							radId = 7;
			    */
			    thisGame.nextBubble = new Image();
			    thisGame.nextBubble.id = radId;
			    thisGame.nextBubble.src = "pictures/balls/"+thisGame.nextBubble.id+".gif";
			    
			    
			    thisGame.redraw();
			    clearInterval(launcher_interval);
			    
			    launcher_interval = null;
			    
			    thisGame.redraw();
//				console.log(thisGame.jump.length);
			    if(thisGame.jump.length >= 3){
				//    console.log(12);
				jump_interval = setInterval(function(){
				    var done = true;
				    for(var i = 0;i < thisGame.jump.length;++i){
					
					done = done && thisGame.jump[i].done;
					thisGame.jump[i].jump();
					
				    }
				    
				    for(var i = 0;i < thisGame.fall.length;++i){
					done = done && thisGame.fall[i].done;
					thisGame.fall[i].fall();
				    }
				    thisGame.redraw();
				    if(done){
					
					clearInterval(jump_interval);
					jump_interval = null;
					var status = false;
					thisGame.manager.reSet();
					for(var  i = 0;i < thisGame.bubbles.length;++i){
					    for(var j = 0;j < thisGame.bubbles[i].length;++j){
						if(thisGame.bubbles[i][j]){
						    //								thisGame.bubbles[i][j].checkJump = false;
						    //								thisGame.bubbles[i][j].checkFall = false;
						    thisGame.manager.add(thisGame.bubbles[i][j].id);
						}
						status = status || thisGame.bubbles[i][j];
						
					    }
					    
					}
					if(!status){
					    thisGame.status = WIN;
							thisGame.redraw();
						    }
						    thisGame.jump = new Array();

		
						}
					},20);
				
				}
				else{
					
				    thisGame.jump = new Array();
					
				}


			}
		},10);
	    break;
	    
	}

    //	var status = false;
//	this.manager.reSet();
	for(var i = 0;i < this.bubbles.length;++i){
	    for(var j = 0;j < this.bubbles[i].length;++j){
		if(this.bubbles[i][j]){
		    this.bubbles[i][j].checkJump = false;
		    this.bubbles[i][j].checkFall = false;
//		    this.manager.add(this.bubbles[i][j].id);
		}
		//			status = status || this.bubbles[i][j];
		//	
		}
	}
    //	if(!status)
    //		this.status = WIN;


   
}

GameWindow.prototype.getMoveDown = function(){
    
    return this.moveDown;

}


GameWindow.prototype.sendBubblesDown = function(){

    var lose = false;
    for(var i = 0;i < this.bubbles.length;++i){
	for(var j = 0;j < this.bubbles[i].length;++j){
	    if(this.bubbles[i][j]){

		this.bubbles[i][j].leftTop.y += 28;
		if(this.bubbles[i][j].leftTop.y >= 380.){
		    lose = true;
		    break;
		}
		    
	    }
	}
    }
    
    this.moveDown += 28;
    this.compressor.moveDown();
    if(lose)
	this.frozen();
}


GameWindow.prototype.frozen = function(){
    for(var i = 0;i < this.bubbles.length;++i){
	for(var j = 0;j < this.bubbles[i].length;++j){
	    if(this.bubbles[i][j]){
		this.bubbles[i][j].froze();
		this.redraw();
	    }
	}
    }
    this.movingBubble.froze();
    this.status = LOSE;
}


