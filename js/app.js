// Enemies our player must avoid

 function Enemy (width=90, height=75, maxSpeed = 500, minSpeed = 100) {
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

//retuns enemys y coordinates
Enemy.prototype.getY = function(){
    return this.y;
}

//retuns enemys x coordinates
Enemy.prototype.getX = function(){
    return this.x;
}

//returns width of enemy image
Enemy.prototype.getWidth = function(){
    return this.width;
}

//returns height of enemy image
Enemy.prototype.getHeight = function(){
    return this.height;
}

//initilizes enemy starting point.
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
    this.timesBitten = 0;
    this.initPosition(canvas);
};

//returns Y coordinarte of player
Player.prototype.getY = function(){
    return this.y;
}

//returns x coordinarte of player
Player.prototype.getX = function(){
    return this.x;
}

//returns width of current player
Player.prototype.getWidth = function(){
    return this.width;
}

//returns height of current player
Player.prototype.getHeight = function(){
    return this.height;
}

//resets the player to a starting point.
Player.prototype.initPosition = function(canvas, x=(canvas.width/2)-35, y = canvas.height-150){
    this.x = x;
    this.y = y;
}

//returns a boolean telling if the move is something that can be done.
Player.prototype.possiblePosition = function(canvas, x, y){
    if(x > 0 && y >100 && x <canvas.width-50 && y < canvas.height-100){
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

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
Player.prototype.handleInput = function(direction, canvas) {
    if(direction == 'up'){
        if(!this.possiblePosition(canvas, this.x, this.y-this.yMove)){
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
