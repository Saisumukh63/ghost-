var tower,towerImage;
var door,doorimg,doorgroup;
var climber,climbergroup,climberimg;
var ghost,ghostimg,ghostimg2;
var block,blockgroup;
var edges;
var gamestate="play";
var spooky;
function preload(){
  towerImage=loadImage("tower.png")
 // doorgroup=new Group();
  doorimg=loadImage("door.png")
  
  climberimg=loadImage("climber.png")
  ghostimg=loadImage("ghost-standing.png")
  spooky=loadSound("spooky.wav");
  ghostimg2=loadImage("ghost-standing.png");
  
}
function setup (){
  createCanvas(600,600);
  tower = createSprite(300,300,10,10);
  tower.addImage("egf",towerImage);
  tower.velocityY=2
  ghost=createSprite(300,200,10,10);
  ghost.addImage("sfse",ghostimg);
  ghost.scale=0.3;
  climbergroup=new Group();
  blockgroup=new Group();
  doorgroup=new Group();
  spooky.loop();
}
function draw(){
  background("black");
  if (gamestate==="play"){
 edges= createEdgeSprites();
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
   if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
   if(keyDown("space")){
    ghost.velocityY=-5;
     ghost.changeImage("sfg",ghostimg2);
  }
  if(climbergroup.isTouching(ghost)){
    ghost.velocityY=0;
    ghost.changeImage("sfse",ghostimg)
  }
 
  ghost.velocityY=ghost.velocityY+0.8
  if(tower.y>400){
    tower.y=300;
  }
  if (blockgroup.isTouching(ghost)||ghost.isTouching(edges[3])){
    ghost.destroy();
    gamestate="end";
  }
  spawndoors();

  drawSprites();
  }
  if (gamestate==="end"){
    stroke("orange")
    fill("blue");
    textSize(30);
    text("GAME OVER",200,250);
    spooky.stop();
  }
}
function spawndoors(){
  if(frameCount % 200===0){
    door=createSprite(300,-60,10,10)
    door.addImage("ewf",doorimg);
    door.x=Math.round(random(150,400));
    door.velocityY=2
    door.lifetime=800;
    doorgroup.add(door)
    climber=createSprite(300,-10,10,10)
    climber.addImage("sfg",climberimg)
    climber.x=door.x;
    climber.velocityY=2;
    climber.lifetime=800;
    climbergroup.add(climber);
    door.depth=ghost.depth;
    ghost.depth+=1;
    block=createSprite(300,-5)
    block.width=climber.width;
    block.height=2;
    block.vislble=false;
    block.x=door.x;
    block.velocityY=2
    blockgroup.add(block);
    block.debug=true
  }
} 