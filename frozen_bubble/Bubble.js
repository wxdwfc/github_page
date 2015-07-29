function Bubble(id,leftTop,game,fixed,direction){


    this.MAX_BUBBLE_SPEED = 8;
	  this.MINIMUM_DISTANCE = 841.;
		this.pos = new Point();
    this.leftTop = leftTop;
    this.id = id;
    this.img = new Image();
    this.img.src = "pictures/balls/"+id+".gif";

    this.frozenSrc = "pictures/balls/frozen_"+id+".gif";
    this.frozen = false;
    
    this.width = this.img.width;
    this.height = this.img.height;
    this.moveX = 0;
    this.moveY = 0;
    
    
    this.done = false;
    
    this.fixed = fixed;
    if(direction){
	this.moveX = this.MAX_BUBBLE_SPEED*(-Math.cos(direction*Math.PI/40));
	this.moveY = this.MAX_BUBBLE_SPEED*(-Math.sin(direction*Math,PI/40));
	
    }
    this.released = false;
    this.checkJump = false;
    this.checkFall = false;
    
   
    
    this.game = game;
    
}

Bubble.prototype.move = function(dx,dy){
    if(this.fixed)
	return;
    this.released = true;
    this.leftTop.x += this.moveX;
    if(this.leftTop.x >= 414.){
	this.moveX = -this.moveX;
	this.leftTop.x += 414.-this.leftTop.x;
    }
    else if(this.leftTop.x < 190.){
	this.moveX = -this.moveX;
	this.leftTop.x += 190 - this.leftTop.x;
    }
    this.leftTop.y += this.moveY;
    var position = this.currentPosition();
    var neighbors = this.getNeighbors(position);
    if(this.checkCollision(neighbors) || this.leftTop.y < (44.+this.game.getMoveDown())){
	this.leftTop.x = 190.+position.x*32-(position.y%2)*16;
	this.leftTop.y = 44. + position.y*28 + this.game.getMoveDown();
	this.fixed = true;
	this.released = false;
	
	this.game.jump = new Array();
	this.checkJumpNei(this.game.jump,this.getNeighbors(this.currentPosition()));
	if(this.game.jump.length >= 3){
	    this.released = true;
	    var grid = this.game.getGrid();
	    for(var i = 0;i < this.game.jump.length;++i){
		var pos = this.game.jump[i].currentPosition();
		delete this.game.bubbles[pos.y][pos.x];
	    }
	    for(var i=0 ; i < grid[0].length ; i++) {
		if (grid[0][i]) {
		    grid[0][i].checkFalling();
		}
	    }
	    this.game.fall = new Array();
	    for(var i = 0;i < grid.length;++i){
		for(var j = 0;j < grid[i].length;++j){
		    if(grid[i][j]){
			//						console.log(i,j,grid[i][j].checkFall);
			if(!grid[i][j].checkFall)
			    this.game.fall.push(grid[i][j]);
		    }
		}
	    }
	    //				console.log("fall",this.game.fall.length);
	}
    }
    
}




Bubble.prototype.draw = function(context){
    
    context.drawImage(this.img,this.leftTop.x,this.leftTop.y);
    
}

Bubble.prototype.currentPosition = function(){
    
    var posY = Math.floor((this.leftTop.y-28.)/28.-this.game.getMoveDown()/28);
    var posX = Math.floor((this.leftTop.x-174.)/32. + 0.5*(posY%2));
    if(posX > 7)
	posX = 7;
    if(posX < 0)
	posX = 0;
    if(posY < 0)
	posY = 0;
    
    return new Point(posX,posY);
}



Bubble.prototype.moveDown = function(){
    
    if(this.fixed)
	this.leftTop.y += 28;
}

Bubble.prototype.getNeighbors = function(p){

    var grid = this.game.getGrid();
    var list = new Array();
    
    if ((p.y % 2) == 0) {
	if (p.x > 0) {
            list.push(grid[p.y][p.x-1]);
	}
	
      if (p.x < 7) {
          list.push(grid[p.y][p.x+1]);
	  
          if (p.y > 0) {
              list.push(grid[p.y-1][p.x]);
              list.push(grid[p.y-1][p.x+1]);
          }
	  
          if (p.y < 12) {
              list.push(grid[p.y+1][p.x]);
          list.push(grid[p.y+1][p.x+1]);
          }
      } else {
          if (p.y > 0) {
              list.push(grid[p.y-1][p.x]);
          }

          if (p.y < 12) {
              list.push(grid[p.y+1][p.x]);
          }
      }
    } else {
	if (p.x < 7) {
        list.push(grid[p.y][p.x+1]);
	}
	
	if (p.x > 0) {
            list.push(grid[p.y][p.x-1]);
	    
            if (p.y > 0) {
          list.push(grid[p.y-1][p.x]);
		list.push(grid[p.y-1][p.x-1]);
            }
	    
            if (p.y < 12) {
		list.push(grid[p.y+1][p.x]);
          list.push(grid[p.y+1][p.x-1]);
            }
	} else {
            if (p.y > 0) {
		list.push(grid[p.y-1][p.x]);
            }
	    
        if (p.y < 12) {
            list.push(grid[p.y+1][p.x]);
        }
	}
    }
    
    return list;

}

Bubble.prototype.checkOne = function(b){
    
    var dx = this.leftTop.x - b.leftTop.x;
    var dy = this.leftTop.y - b.leftTop.y;
    var value = dx * dx + dy * dy;
    return (value < this.MINIMUM_DISTANCE);
    
}


Bubble.prototype.checkCollision = function(neighbors){
	for(var i = 0;i < neighbors.length;++i){
		var current = neighbors[i];
		if(current){
			if(this.checkOne(current))
				return true;
		}
	}
	return false;
}

Bubble.prototype.changeDirection = function(direction){

	if(this.released)
		return;
	this.moveX = this.MAX_BUBBLE_SPEED*(-Math.cos(direction*Math.PI/40));
	this.moveY = this.MAX_BUBBLE_SPEED*(-Math.sin(direction*Math.PI/40));

}

Bubble.prototype.absoluteMove = function(pos){
	this.leftTop = pos;

}

Bubble.prototype.moveDown = function(){
	this.leftTop.y += 28;

}

Bubble.prototype.checkJumpOne = function(jump,id){
    if(this.checkJump)
	return;
    this.checkJump = true;
    if(this.id == id){
	this.checkJumpNei(jump,this.getNeighbors(this.currentPosition()));
    }
}

Bubble.prototype.checkJumpNei = function(jump,neighbors){
    jump.push(this);
    for(var i = 0;i < neighbors.length;++i){
	var current = neighbors[i];
	if(current){
	    current.checkJumpOne(jump,this.id);
	}
    }
}

Bubble.prototype.jump = function(){

	if(this.done)
		return;
	 if(this.fixed) {
		this.pos = this.currentPosition();
      this.moveX = -6. + Math.random() * 12.;
      this.moveY = -5. - Math.random() * 10. ;

      this.fixed = false;
    }
	
	this.moveY += 1;

	this.leftTop.x += this.moveX;
	this.leftTop.y += this.moveY;

	if(this.leftTop.y >= 680){

		this.done = true;
		delete this.game.bubbles[this.pos.y][this.pos.x];

	}
}

Bubble.prototype.fall = function(){
	
	if(this.done)
		return;
	if(this.fixed){
		this.pos = this.currentPosition();
		this.moveY = Math.random()* 5.;
	}
	this.fixed = false;
	
	this.moveY += 1;
	this.leftTop.y += this.moveY;
	
	if(this.leftTop.y >= 680.){
		this.done = true;
		delete this.game.bubbles[this.pos.y][this.pos.x];

	}

}

Bubble.prototype.checkFalling = function(){
	if(this.checkFall)
		return;
	this.checkFall = true;
	var v = this.getNeighbors(this.currentPosition());
	for(var i = 0;i < v.length;++i){
	    if(v[i]){
		    v[i].checkFalling();
		
	    }
	}
    
}


Bubble.prototype.froze = function(){
    
    if(this.frozen)
	return;
    this.frozen = true;
    this.leftTop.x -= 1;
    this.leftTop.y -= 1;
    this.img.src = this.frozenSrc;
    
}
