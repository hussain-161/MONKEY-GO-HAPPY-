var sprite ,sprite_running;
var ground;
var obstacleGroup;
var bananaGroup;
var survivalTime=0;

function preload(){
  
sprite_running= loadAnimation("sprite_0.png","sprite_1.png",
"sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
 
obstacle1=loadImage("obstacle.png");  
 banana1=loadImage("banana.png");   
  
}



function setup() {
 createCanvas(600,200);

 
     
  sprite = createSprite(50,155,20,50);
    sprite.addAnimation("running", sprite_running);
    sprite.scale=0.09;
  
  invisibleGround=createSprite(30,190,600,20);
  invisibleGround.visible=false;
  
  ground=createSprite(30,185,600,14);    
  
  
  obstacleGroup=new Group();
  bananaGroup=new Group();
}



function draw() {
  
   background("lightblue");
  
  fill("black")
  textSize(15)
    text("survivalTime : "+survivalTime,400,20)
    survivalTime=Math.ceil(frameCount/frameRate());
  
  if(keyDown("space") && sprite.y>=150){
      sprite.velocityY=-12;
  }
     sprite.velocityY=sprite.velocityY+0.8; 
  if(ground.x<600){
     ground.x=ground.width/2;
    }
  
ground.velocityX=-4;
 sprite.collide(invisibleGround);
  
 spawnbanana(); 
  spawnObstacles(); 
   drawSprites(); 
}

function spawnObstacles(){
  if(frameCount%60===0){
  var obstacle=createSprite(600,160,10,40) 
    obstacle.velocityX=-8; 
    obstacle.scale=0.1;
    obstacle.lifetime=600/6;
     obstacle.addImage(obstacle1);  
    
    obstacleGroup.add(obstacle);  
   }
    
}

function spawnbanana(){
  if(frameCount%60===0){
  var banana=createSprite(600,45,10,40) 
    banana.velocityX=-8; 
    banana.scale=0.06;
    banana.lifetime=600/6;
    banana.addImage(banana1);  
    
    bananaGroup.add(banana);  
   }
    
}

