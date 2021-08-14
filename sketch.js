var diano,dianoImg;

var bg,bgImg;
var invisibleGround;

var collidedSound,jumpSound,winSound,loseSound;

var obsImg,shrub1Img,shrub2Img,shurb3Img;

var score;
var life = 3;

var heart1Img,heart2Img,heart3Img;
var heart1,heart2,heart3;

var gameState ="fight";

function preload(){
  dianoImg = loadAnimation("assets/diano1.png","assets/diano 2.png","assets/diano 3.png");  
  bgImg = loadImage("assets/bg.png");

  collidedSound = loadSound("assets/collided.wav");
  jumpSound = loadSound("assets/jump.wav");
  winSound = loadSound("assets/win.mp3");
  loseSound = loadSound("assets/lose.mp3");

  obsImg = loadImage("assets/stone.png");
  shrub1Img = loadImage("assets/shrub1.png");
  shrub2Img = loadImage("assets/shrub2.png");
  shrub3Img = loadImage("assets/shrub3.png");

  heart1Img = loadImage("assets/heart_1.png");
  heart2Img = loadImage("assets/heart_2.png");
  heart3Img = loadImage("assets/heart_3.png");

}

function setup() {
  createCanvas(800,630);
  bg = createSprite(700, 300, 7000, 200);
  bg.addImage(bgImg);
  bg.scale = 0.4;
  //bg.x = bg.width/2;

  diano = createSprite(100,520,1000,50);
  diano.addAnimation("dianoImg",dianoImg);
  diano.scale = 2;
  

  invisibleGround = createSprite(80,610,100,10);
  invisibleGround.visible = false;

  heart1 = createSprite(700,20,20,20);
  heart1.visible = false
  heart1.addImage("heart1",heart1Img)
  heart1.scale = 0.3

  heart2 = createSprite(700,20,20,20);
  heart2.visible = false
  heart2.addImage("heart2",heart2Img)
  heart2.scale = 0.3

  heart3 = createSprite(700,20,20,20);
  heart3.addImage("heart3",heart3Img)
  heart3.scale = 0.3



  obstaclesGroup = new Group ();
  shrub1Group = new Group ();
  shrub2Group = new Group ();
  shrub3Group = new Group ();

  score = 0;
}

function draw(){ 
  background(0); 

  if(gameState === "fight"){
    if(life === 3){
      heart3.visible = true;
      heart2.visible = false;
      heart1.visible = false;
    }

    if(life === 2){
      heart3.visible = false;
      heart2.visible = true;
      heart1.visible = false;
    }

    if(life === 1){
      heart3.visible = false;
      heart2.visible = false;
      heart1.visible = true;
    }

    if(life === 0){
      heart3.visible = false;
      heart2.visible = false;
      heart1.visible = false;
      gameState = "lost";
     }
    }

  bg.velocityX = -4;

if(bg.x < 0){
    bg.x = 400;
  }


  if(keyDown("space")){
    diano.velocityY = -12;

  }

  diano.velocityY = diano.velocityY +0.5;

  diano.collide(invisibleGround);

  spawnObstacles();
  spawnShrub1();
  spawnShrub2();
  spawnShrub3();

  if(score === 100){
    gameState = "Win";

  }

  if(diano.isTouching(obstaclesGroup)){

    for(var j=0;j<obstaclesGroup.length;j++){
    obstaclesGroup[j].destroy();
    life = life -1;
}
} 


if(diano.isTouching(shrub1Group)){

 for(var i=0;i<shrub1Group.length;i++){

     if(diano.isTouching(shrub1Group[i])){
         shrub1Group[i].destroy();
         score = score + 5;
     }
    }
  }
     

     if(diano.isTouching(shrub2Group)){
      for(var i=0;i<shrub2Group.length;i++){
     
          if(diano.isTouching(shrub2Group[i])){
              shrub2Group[i].destroy();
              score = score + 5;
          }
        }
      }

        if(diano.isTouching(shrub3Group)){
          for(var i=0;i<shrub3Group.length;i++){
         
              if(diano.isTouching(shrub3Group[i])){
                  shrub3Group[i].destroy();
                  score = score + 5;
              }
          }
      }
 
  drawSprites();
textSize(30);
fill ("black");
text ("Score: "+score,650,70);
text("Lives: "+life, 670,100);

if(gameState === "lost"){
  textSize(100);
   stroke("black");
   fill("green");
   text("Oops!! You lost!!",50,400);
   obstaclesGroup.destroyEach();
   diano.destroy();
   bg.velocityX = 0; 
   bg.velocityY = 0;
   shrub1Group.destroyEach();
   shrub2Group.destroyEach();
   shrub3Group.destroyEach();
 }

 else if(gameState === "Win"){
  textSize(100);
   stroke("black");
   fill("green");
   text("Congratulations!! You Win!!",400,400);
   obstaclesGroup.destroyEach();
   diano.destroy();
   bg.velocityX = 0; 
   bg.velocityY = 0;
   shrub1Group.destroyEach();
   shrub2Group.destroyEach();
   shrub3Group.destroyEach();
 }
} 

function spawnObstacles(){
  if(frameCount % 60 === 0){
    var obstacle = createSprite(900,570,70,70);
    obstacle.addImage(obsImg);
    obstacle.scale = 0.2;
    obstacle.velocityX = -6;
    obstacle.lifetime = 500;
    var rand = Math.round(random(1,9));
    

    obstaclesGroup.add(obstacle);
  }
}

function spawnShrub1(){
  if(frameCount % 80 === 0){
    var shrub1 = createSprite(900,570,70,70);
    shrub1.addImage(shrub1Img);
    shrub1.scale = 0.05;
    shrub1.velocityX = -6;
    shrub1.lifetime = 500;
    var rand = Math.round(random(1,9));

    shrub1Group.add(shrub1);
  }
}

function spawnShrub2(){
  if(frameCount % 100 === 0){
    var shrub2 = createSprite(900,570,70,70);
    shrub2.addImage(shrub2Img);
    shrub2.scale = 0.05;
    shrub2.velocityX = -6;
    shrub2.lifetime = 500;
    var rand = Math.round(random(1,9));

    shrub2Group.add(shrub2);
  }
}

function spawnShrub3(){
  if(frameCount % 300 === 0){
    var shrub3 = createSprite(900,570,70,70);
    shrub3.addImage(shrub3Img);
    shrub3.scale = 0.05;
    shrub3.velocityX = -6;
    shrub3.lifetime = 500;
    var rand = Math.round(random(1,9));

    shrub3Group.add(shrub3);
  }
}