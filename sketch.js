var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime ;
var monkey_collider,invisibleground;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
 
}



function setup() {
    createCanvas(400,400);
  
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  invisibleGround = createSprite(400,350,900,10);
  invisibleGround.visible = true;
  
  ground=createSprite(600,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
   //create Obstacle and fruit Groups
  fruitGroup=createGroup();
  obstaclesGroup=createGroup();

monkey.setCollider("rectangle",0,0,monkey.width,monkey.heigh);
  monkey.debug = true;
}


function draw() {
  background(220);
  
  
  
  stroke("black");
  textSize(20);
  fill("black");
   
  text("survival Time :"+survivalTime,100,50);
  
  
  if(gameState === PLAY){
   
    survivalTime=Math.ceil(frameCount/frameRate());
    
    if(obstaclesGroup.isTouching(monkey)){
      gameState=END;
    }
         
    
      //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 300) {
        monkey.velocityY = -12;
    }
     
     //add gravity
  monkey.velocityY = monkey.velocityY + 0.8    
    
      if (ground.x < 0){
      ground.x = ground.width/2;
       }
    
   bananas();
   obstacles();
     
   }
  monkey.collide(invisibleGround);   
  
   if (gameState === END) {
     
     //set lifetime of the game objects so that they are never destroyed
    fruitGroup.destroyEach();
    obstaclesGroup.destroyEach();
     
      //both group velocity is zero
       
      fruitGroup.setVelocityXEach(0);
      obstaclesGroup.setVelocityXEach(0);
   
   }
  
 drawSprites();

}


function bananas(){
   if(World.frameCount%80===0){
     banana=createSprite (400,200,20,20);                  banana.addImage(bananaImage);
     banana.y=Math.round(random(200,300));
     fruitGroup.add(banana);
     banana.scale=0.1;
     banana.velocityX=-5;
   }
}
  
  function obstacles(){
   if(World.frameCount%300===0){
     obstacle=createSprite(400,330,20,20);
     obstacle.addImage( obstaceImage);
     obstacle.scale=0.1;
     obstacle.velocityX=-5;
   }
  
  }
