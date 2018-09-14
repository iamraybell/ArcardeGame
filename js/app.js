// Enemies our player must avoid

 function Enemy (maxSpeed = 500, minSpeed = 100) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.maxSpeed = maxSpeed;
    this.minSpeed = minSpeed;
    this.sprite = 'images/enemy-bug.png';
    this.initPosition(maxSpeed, minSpeed);
};

Enemy.prototype.initPosition = function(maxSpeed, minSpeed){
    this.y = 200;
    this.x = 0;
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
            },Math.random() *(4000 - 500) + 500);
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


function Player(canvas, yMove, xMove) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/char-boy.png';
    this.yMove = yMove;
    this.xMove = xMove;
    this.x;
    this.y;
    this.timesCrossed = 0;
    this.initPosition(canvas);
};
Player.prototype.initPosition = function(canvas, x=(canvas.width/2)-50, y = canvas.height-200){
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
        if(!this.possiblePosition(canvas, this.x, this.y- this.yMove)){
            this.initPosition(canvas, this.x,canvas.height-200);
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

let allEnemies = [new Enemy(), new Enemy(),new Enemy()];



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
