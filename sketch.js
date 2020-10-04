var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudimage;
var rand;
var score = 0;
var e1,e2,e3,e4,e5,e6;
var eg,cg;
var endimage,rimage;
var gamestate="play";


function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  cloudimage=loadImage("cloud.png")
  groundImage = loadImage("ground2.png");
  e1=loadImage("obstacle1.png");
  e2=loadImage("obstacle2.png");
  e3=loadImage("obstacle3.png");
  e4=loadImage("obstacle4.png");
  e5=loadImage("obstacle5.png");
  e6=loadImage("obstacle6.png");
  endimage=loadImage("gameover.png");
  rimage=loadImage("restart.png");
  
 
  
}

function setup() {
  background(220)
  createCanvas(600,200)
  
  //create a trex sprite

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  cg=new Group();
  eg=new Group();
  
    end=createSprite(300,100);
    end.addImage(endimage);
    end.scale=1;
    r=createSprite(300,130);
    r.addImage(rimage);
    r.scale=0.5;
  end.visible=false;
  r.visible=false;


}

function draw() {
  //set background color
  background("white");
  
  textSize(20)
  text("score=",400,30)
  text(score,550,30)
  
  trex.debug="true";
  
 
  
  if(gamestate==="play"){
    
      end.visible=false;
  r.visible=false;
    
    ground.velocityX = -4; 
    
  if(keyDown("space")&& trex.y >= 156) {
    trex.velocityY = -13;
  }
  
  trex.velocityY = trex.velocityY + 0.7
  

  if (ground.x < 0){
    ground.x = ground.width/2;
  }

  if(frameCount%5===0){
   score=score+1  
  }
    Clouds();
  Cactus();
  if(eg.isTouching(trex)){
     gamestate="end"; 
    } 
  }
 
  if(gamestate==="end"){
    ground.velocityX=0;
    trex.velocityY=0;
    trex.addAnimation("running",trex_collided)
    eg.setVelocityXEach(0);
    cg.setVelocityXEach(0);
    eg.setLifetimeEach(-1);
    cg.setLifetimeEach(-1);
     end.visible=true;
     r.visible=true;
    r.debug=true;
         if(mousePressedOver(r))
    {
      reset();
    }
  }
 
  trex.setCollider("circle",0,0,40)
  trex.collide(invisibleGround);

  

  
  drawSprites();
}

//function to spawn the clouds
function Clouds(){
  if(frameCount%100===0){
 // write your code here
 var cloud=createSprite(600,100,40,10);  
  cloud.velocityX=-2;
  cloud.addImage("cloud1",cloudimage);
  cg.add(cloud);
    cloud.scale=0.7;
    cloud.y=Math.round(random(10,100));
    cloud.depth=trex.depth-1;

    cloud.lifetime=350;
} 
 }

function Cactus(){
var rand=Math.round(random(1,6));
 if(frameCount%100===0){
  cactus=createSprite(600,165,10,40);
  cactus.x=Math.round(random(600,700));
   cactus.velocityX=-3;
   eg.add(cactus);
    switch(rand){
      case 1:cactus.addImage(e1);
      break;
      case 2:cactus.addImage(e2);
      break;
      case 3:cactus.addImage(e3);
      break;     
      case 4:cactus.addImage(e4);
      break;      
      case 5:cactus.addImage(e5);
      break;
      case 6:cactus.addImage(e6);

      break;
      default:break;
    }  
    cactus.scale=0.5;
    cactus.depth=trex.depth-1;
   cactus.lifetime=400
 }
}

function reset()
{
 gamestate="play";

  eg.destroyEach();
  cg.destroyEach();
  score=0;
  trex.addAnimation("running",trex_running);

}

