var player,monkey_running
var score
var backimage,forest,invground
var bananaimg,bananaGroup
var stoneimg,stoneGroup


function preload(){
  monkey_running = loadImage("running4.png")
  forest = loadImage("bg 2.png")
  
  bananaimg = loadImage("sheild4.png")
  
  stoneimg = loadImage("stone.png")
}

function setup() {
  createCanvas(700, 300);
  
  player = createSprite(100,250,10,10)
  player.addAnimation("r",monkey_running)
  player.scale = 0.1
  player.setCollider("circle",0,0,150)
  
  score = 0
  
  backimage = createSprite(700,100,10,50)
  backimage.addImage("b1",forest)
  backimage.x = backimage.width /2;
  backimage.velocityX = -5;
  
  invground = createSprite(700,290,700,10)
  invground.visible = false
  
  
  bananaGroup = createGroup()
  
  stoneGroup = createGroup()
  
  player.debug = true
}

function draw() {
  background(220);
  
  if(keyDown("space")&&player.y>240){ 
    player.velocityY = -10
  }
  
  if(player.y<245){
    player.velocityY = player.velocityY+0.5
  }
  
  edges = createEdgeSprites()
    
  player.collide(invground)
  player.collide(edges)
  
  player.depth = backimage.depth
  player.depth = player.depth+1
  
  if(backimage.x<200){
    backimage.x = backimage.width/2
  }
  
  switch(score){
    case 10: player.scale = 0.12
      break;
    case 20: player.scale = 0.14
      break;
    case 30: player.scale = 0.16
      break;
    case 40: player.scale = 0.18
      break;
    case 50: player.scale = 0.2
      break;
    case 60: player.scale = 0.22
      break;
    case 70: player.scale = 0.24
      default:break;
  }
  
  if(bananaGroup.isTouching(player)){
    bananaGroup.destroyEach()
    score = score+2
  }
  
  if(stoneGroup.isTouching(player)){
    player.scale = 0.08
  }
  
  spawnBananas()
  spawnStones()
  
  drawSprites()
  
  
  textSize(20)
  fill("white")
  textFont("Georgia") 
  text("Score: "+ score, 500,50)
}



function spawnBananas(){
  if(frameCount%160===0){
    var banana = createSprite(700,50,10,10)
    banana.velocityX = -5
    banana.y = random(100,180)
    banana.addImage("b",bananaimg)
    banana.scale = 0.2
    banana.lifetime = 140
    bananaGroup.add(banana)
  }
}

function spawnStones(){
  if(frameCount%Math.round(random(60,180))===0){
    var stone = createSprite(700,250,10,10)
    stone.velocityX = -6
    stone.addImage("stoneimage",stoneimg)
    stone.scale = 0.2  
    stone.lifetime = 116
    stoneGroup.add(stone)
  }
}