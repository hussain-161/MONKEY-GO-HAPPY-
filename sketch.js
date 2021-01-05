  
  var sprite ,sprite_running;
var ground;
var obstacleGroup;
var bananaGroup;
var END=0;
var PLAY=1;
var restart;
var restartImage;
var sprite_collided;
var sprite ,sprite_running;
var gameState=PLAY;
var score
var backgroundImage,background;
var score=0;
var gameOverImage;
var  bananaNumber; 

function preload(){
  
sprite_running= loadAnimation("sprite_0.png","sprite_1.png",
"sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  gameOverImage=loadImage("download (2).jfif")
  obstacle1=loadImage("obstacle.png");  
 banana1=loadImage("banana.png");   
 restartImage=loadImage("restart.png") 
  backgroundImage=loadImage("jungle.jpg");
  sprite_collided=loadImage("Monkey_08.png");
}



function setup() {
 createCanvas(600,200);

 background=createSprite(0,0,800,400);
 background.addImage(backgroundImage);
  background.scale=1.5;
  background.x=background.width/2;
  background.velocityX=-4;
     
  sprite = createSprite(50,155,20,50);
  sprite.addAnimation("running", sprite_running);
 sprite.addAnimation("collided",sprite_collided);
  sprite.scale=0.07;
  
 invisibleGround=createSprite(30,190,600,20);
  invisibleGround.visible=false;
  
  ground=createSprite(30,185,600,14);    
  
  
  obstacleGroup=new Group();
  bananaGroup=new Group();
  
  restart=createSprite(300,120);
   restart.addImage(restartImage);
   restart.scale=0.5;
   restart.visible=false
  
  sprite.setCollider("rectangle",0,0,40,600)  
  score = 0;
   gameOver=createSprite(300,70);
   gameOver.addImage(gameOverImage);
   gameOver.visible=false
  gameOver.scale=0.3;
  bananaNumber = 1; 
}



function draw() {
  
   //background("lightblue");
  //console.log(gameState)
  
 if(gameState===PLAY){
   // console.log("PLAY")
      fill("white")
    text("score : "+score,300,20)
    score=score+Math.round(frameRate()/60);
     
    //making trex jump
    if(keyDown("space") && sprite.y >120){
      sprite.velocityY=-19;
    }
     if(background.x<100){
    background.x=background.width/2;
  }
  
    //gravity
   sprite.velocityY=sprite.velocityY+0.5;
  
    //making the ground stay on the canvas
    if(ground.x<0){
      ground.x=ground.width/2;
    }
    
    ground.velocityX=-4;
  
     spawnbanana();
     spawnObstacles() ;
      // checking if trex is colliding the obstacle 
   if(sprite.isTouching(obstacleGroup)){
    gameState=END 
  
     
    }  
   
   if(bananaGroup.isTouching(sprite)){
     bananaGroup.destroyEach();
     console.log("no of bananas" +bananaNumber);
    bananaNumber = bananaNumber+1;
     switch(bananaNumber) {
    case 2: sprite.scale=0.12; 
    break;  
     case 4: sprite.scale=0.14; 
    break;    
     case 6: sprite.scale=0.16; 
    break;    
     case 8: sprite.scale=0.18;  
    break;    
    default:break;
     }
    score = score + 2;

    }
 /* switch(score) {
    case 10: sprite.scale=0.12; 
    break;  
     case 20: sprite.scale=0.14; 
    break;    
     case 30: sprite.scale=0.16; 
    break;    
     case 40: sprite.scale=0.18;  
    break;    
    default:break;
  }*/
 
  }

  

  
    
    
 
  
  else if (gameState===END){
    restart.visible=true
    ground.velocityX=0;  
   console.log("END")  
   sprite.velocityY=0;
   obstacleGroup.setVelocityXEach(0);  
 bananaGroup.setVelocityXEach(0); 
   sprite.changeAnimation("collided",sprite_collided);
   obstacleGroup.setLifetimeEach(-1); 
    bananaGroup.setLifetimeEach(-1);   
    fill("white")
    text("score : "+score,300,20) 
    background.velocityX=0;  
gameOver.visible=true
  
    }  
    
     sprite.velocityY=sprite.velocityY+0.8; 
  if(ground.x<600){
     ground.x=ground.width/2;
    }
  
  
   if(mousePressedOver(restart)) {
     reset();
    }
ground.velocityX=-4;
 sprite.collide(invisibleGround);
  
  
  if(obstacleGroup.isTouching(sprite)){ 
       sprite.scale=0.08;
     // score=score-2;
    }
  
  
 
   drawSprites();
stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);

}
function spawnObstacles(){
  if(frameCount%100===0){
  var obstacle=createSprite(600,160,10,40) 
    obstacle.velocityX=-6;  
    obstacle.scale=0.1;
    obstacle.lifetime=600/6;
     obstacle.addImage(obstacle1);  
    
    obstacleGroup.add(obstacle);  
   }
    
}

function spawnbanana(){
  if(frameCount%40===0){
  var banana=createSprite(600,45,10,40) 
    banana.velocityX=-5; 
    banana.scale=0.06;
    banana.lifetime=600/5;
    banana.addImage(banana1);  
    banana.y=Math.round(random(10,70));
    bananaGroup.add(banana);
    sprite.depth = banana.depth + 1;
   }
    
}

function reset(){
console.log("inside the resetet button")  
 gameState=PLAY 
  sprite.scale=0.07;
 obstacleGroup.destroyEach();
 bananaGroup.destroyEach();
 restart.visible=false
  sprite.changeAnimation("running",sprite_running);
  score=0;
//sprite.changeAnimation("running",sprite_running);  
   gameOver.visible=false
    gameOver.scale=0.1;
}

