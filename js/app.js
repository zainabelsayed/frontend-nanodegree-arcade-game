// Enemies our player must avoid

var Enemy = function(y,sprite) {
    this.x=-100;//enemy start x-axies
    this.y=y;  // enemy fixed y axies
    this.speed=Math.floor((Math.random()*200)+100);// random speed for all enemies
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite =sprite;//enemy image
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
let collisionNum=0;//collision number counter

Enemy.prototype.update = function(dt) {
    this.x+=(this.speed)*dt;//speed of moving enemies
    if(this.x>550)//when enemy go off canvas it reset to intial position(for continue moving)
    {
        this.x=-100;
        this.speed=Math.floor((Math.random()*200)+100);
    }

    if((this.x<player.x+48)&&(this.x+80>player.x)&&(this.y<player.y+64)&&(this.y+30>player.y))// collision detection
    {
        collisionNum+=1;
        //Oops modal appear with every collision
     swal({
        title:'Oops!',
        type:'warning',
        width: 200,
        showConfirmButton: false,
        timer: 1500
            });
     // player reset 
        this.x=-100;
       player.x=200;
       player.y=420;  
    
         
      
    }


    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// player class
function Player(x=200,y=440,speed){//player position and image
    this.x=x;
    this.y=y;
    this.speed=speed;
    this.sprite = 'images/char-boy.png';
};


Player.prototype.update=function(dt){

    if(this.y===0)//success detection 
    {
        //congrtulation modal appear when success
       swal({
        title:'Congratulations!',
        text:'You Won! with '+gemCount+'Gems!',
        type:'success',
        confirmButtonText:'Play again',
            }).then((result)=>{
                location.reload();
            })
        this.reset();    
         
    }
    //player lives code
    let lives=Array.from(document.getElementsByClassName('fa-heart'));   
    switch(true){
        case (collisionNum===1):
        lives[3].classList.remove('glow');
        break;
        case (collisionNum===2):
        lives[2].classList.remove('glow');
        lives[3].classList.remove('glow');
        break;
        case (collisionNum===3):
        lives[1].classList.remove('glow');
        lives[2].classList.remove('glow');
        lives[3].classList.remove('glow');
        break;
        case (collisionNum===4):
        lives[0].classList.remove('glow');
        lives[1].classList.remove('glow');
        lives[2].classList.remove('glow');
        lives[3].classList.remove('glow');
        //Game Over modal appear after 4 collisions
        swal({
        title:'Game Over!',
        text:'You Lose!',
        confirmButtonText:'Play again',
            }).then((result)=>{
                location.reload();
            })
        this.reset();    
         
        break;
}
//Gems collision detection
for(const gem of allGems)//collecting gem method
{
if((this.x<=(gem.x))&&((this.x+40)>=gem.x)&&(this.y<=(gem.y))&((this.y+60)>=gem.y))
    {
        
        Object.getOwnPropertyNames(gem).forEach(function (prop) {
        delete gem[prop];
          });
        gemCount+=1;//gem collect counter
        document.querySelector('.gems').innerHTML=gemCount;
    }
 }
}
Player.prototype.render= function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput=function(allowedKeys){
    //get input from user
   switch(allowedKeys){
    case'left':
     if(this.x>=0){//prevent player go off canvas
        this.x-=10;
    }
    else if(this.x<0){//prevent player go off canvas
        this.x=0;
    }
    break;
     case'right':
     if(this.x<=405){//prevent player go off canvas
        this.x+=10;
    }
    else if(this.x>405){//prevent player go off canvas
        this.x=405;
    }
    break;
     case'up':
     if(this.y>=0){//prevent player go off canvas
        this.y-=10;
    }
    else if(this.y<0){//prevent player go off canvas
        this.y=0;
    }
    break;
     case'down':
     if(this.y<=440){//prevent player go off canvas
        this.y+=10;
    }
    else if(this.y>440){//prevent player go off canvas
        this.y=440;
    }
    break;
   }
    
}
let gemCount=0;
function Gem(sprite) {//gem class
    this.x=Math.floor((Math.random()*405)+30);
    this.y=Math.floor((Math.random()*400)+100);
    this.sprite =sprite;
};
//Gem drawing function
Gem.prototype.render= function() {
    if(this.hasOwnProperty('sprite')===true)
    {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y,30,50);
    }
};
Gem.prototype.update=function(dt){
   
}
const player=new Player();

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const allEnemies=[];//enemies array
const enemy1=new Enemy(100,'images/enemy-school bus.png');
const enemy2=new Enemy(190,'images/enemy-bus.png');
const enemy3=new Enemy(270,'images/enemy-car.png');

    
allEnemies.push(enemy1,enemy2,enemy3);
const allGems=[];//Gems array
const gem1=new Gem('images/Gem Orange.png');
const gem2=new Gem('images/Gem Green.png');
const gem3=new Gem('images/Gem Blue.png');
allGems.push(gem1,gem2,gem3);




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
//keyup and keydown for continue player move
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        65: 'left',
        38: 'up',
        87: 'up',
        39: 'right',
        69: 'right',
        40: 'down',
        83: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        65: 'left',
        38: 'up',
        87: 'up',
        39: 'right',
        69: 'right',
        40: 'down',
        83: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

