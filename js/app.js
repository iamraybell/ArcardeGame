// Enemies our player must avoid

 function Enemy (width=157, height=101, maxSpeed = 500, minSpeed = 100) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.width = width;
    this.height = height;
    this.maxSpeed = maxSpeed;
    this.minSpeed = minSpeed;
    this.sprite = 'images/enemy-bug.png';
    this.initPosition(maxSpeed, minSpeed);
};
Enemy.prototype.getY = function(){
    return this.y;
}
Enemy.prototype.getX = function(){
    return this.x;
}
Enemy.prototype.getWidth = function(){
    return this.width;
}
Enemy.prototype.getHeight = function(){
    return this.height;
}

Enemy.prototype.initPosition = function(maxSpeed, minSpeed){
    this.y = Math.random() *(500 - 320)+70;
    this.x =-100;
    this.speed = Math.floor(Math.random() *(maxSpeed - minSpeed) + minSpeed);
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt, canvas, allEnemies) {
    if(this.x < canvas.width){
        this.x += dt* this.speed;
        if(this.x > canvas.width){
            setTimeout(()=>{
                this.initPosition(this.maxSpeed, this.minSpeed);
            },Math.random() *(3000 - 500) + 500);
        }
    }

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


function Player(canvas, yMove, xMove, width, height, image) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = image;
    this.yMove = yMove;
    this.xMove = xMove;
    this.width = width;
    this.height = height; 
    this.x;
    this.y;
    this.timesCrossed = 0;
    this.initPosition(canvas);
};
Player.prototype.getY = function(){
    return this.y;
}
Player.prototype.getX = function(){
    return this.x;
}
Player.prototype.getWidth = function(){
    return this.width;
}
Player.prototype.getHeight = function(){
    return this.height;
}
Player.prototype.initPosition = function(canvas, x=(canvas.width/2)-35, y = canvas.height-150){
    this.x = x;
    this.y = y;
}
Player.prototype.possiblePosition = function(canvas, x, y){
    if(x > 0 && y >-10 && x <canvas.width-50 && y < canvas.height-150){
        return true;
    }
    return false;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};
Player.prototype.handleInput = function(direction, canvas) {
    if(direction == 'up'){
        console.log(this.y + this.yMove)
        if(!this.possiblePosition(canvas, this.x, this.y- this.yMove)){
            this.initPosition(canvas, this.x,canvas.height-150);
            this.timesCrossed +=1
            console.log(this.timesCrossed)
        }else{
            this.y -= this.yMove;
        }

    }
    if(direction == 'down' && this.possiblePosition(canvas, this.x, this.y+ this.yMove)){
        this.y += this.yMove;
    }
    if(direction == 'left'&& this.possiblePosition(canvas, this.x- this.xMove, this.y)){
        this.x -= this.xMove;
    }
    if(direction == 'right' && this.possiblePosition(canvas, this.x+ this.xMove, this.y)){
        this.x += this.xMove;
    }
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};







// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
