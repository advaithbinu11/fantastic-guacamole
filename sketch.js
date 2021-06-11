var bob, hiimage, alienYellowWalkImage, alienYellowWalkLeftImage, arrowImage;
var knifeImage, bobJumpImage;
var bobWalkImage, bobWalkLeftImage, bobDeadImage, bobDuckLeftImage;
var doorImage, guardStopImage, youWinImage
var outback, winsound, losingsound;
var soundnum;
var gameState;
var guard, guardnum = 0, downnum = 0;
function preload() {
  hiimage = loadAnimation("BobSaysHi.png")
  bobWalkImage = loadAnimation("alien1.png", "alien2.png");
  bobWalkLeftImage = loadAnimation("alien1copy.png", "alien2copy.png")
  alienYellowWalkImage = loadImage("yellowalien.png");
  alienYellowWalkLeftImage = loadImage("yellowalienleft.png")
  doorImage = loadImage("door.png")
  knifeImage = loadImage("knife1.png")
  bobDeadImage = loadAnimation("bobDead.png")
  bobDuckImage = loadAnimation("bobduck.png")
  bobDuckLeftImage = loadAnimation("bobduckleft.png")
  youWinImage = loadImage("You Win.png")
  outback = loadSound("outback.mp3")
  winsound = loadSound("puzzle_game_achievement_02.mp3")
  losingsound = loadSound("mission_failed_male.mp3")
}

function setup() {
  createCanvas(400, 400);
  bob = createSprite(68, 336);
  bob.debug = true
  bob.scale = 0.8
  bob.addAnimation("bobright", bobWalkImage);
  bob.addAnimation("bobleft", bobWalkLeftImage);
  bob.addAnimation("bobdead", bobDeadImage);
  bob.addAnimation("bobduck", bobDuckImage);
  bob.addAnimation("bobduckleft", bobDuckLeftImage);
  bob.addAnimation("bobjump", hiimage);
  bob.x = 58
  bob.y = 80
  guard = createSprite(202, 70, 50, 50);
  guard.addImage("alien", alienYellowWalkImage);
  gameState = "intro";
  outback.play()
}


function draw() {
  if (gameState === "intro") {
    background(25, 255, 0);
    textSize(20);
    text("Hi, my name is Bob. I was kidnapped by the ", 10, 150);
    textSize(20);
    text("evil yellow aliens. Help me escape!", 10, 180);
    textSize(20);
    text("The yellow button is for jumping.", 10, 210);
    textSize(20);
    text("The joystick is for walking...", 10, 240);
    textSize(20);
    text("But the bottom make me duck", 10, 280);
    textSize(20);
    text("Press the yellow button to continue", 10, 360);
    textSize(20);
    text("If I die, press the yellow button to restart", 10, 340);
    textSize(20);
    text("Go through the door to win!", 10, 300);
  }
  if (gameState == "intro" && keyDown("space")) {
    gameState = "play";
    guard.x = 30;
    guard.y = 352;
    bob.x = 8;
    bob.y = 80;
  }
  if (gameState === "lose" && keyDown("space")) {
    gameState = "play";
    bob.x = 58;
    bob.y = 80;
  }
  if (gameState === "play") {
    console.log(bob.y)
    background(72, 61, 139);
    var wall1 = createSprite(150, 148, 380, 40);
    var wall2 = createSprite(250, 268, 380, 40);
    var wall3 = createSprite(200, 400, 400, 10);
    var sword1 = createSprite(250, 148);
    var door = createSprite(150, 342);
    var sword2 = createSprite(120, 148);
    door.addImage(doorImage);
    door.scale = 1.5;
    sword1.scale = 0.6;
    sword1.addImage(knifeImage);
    sword1.setCollider("rectangle", 0, 10, 30, 115);
    sword2.scale = 0.6;
    sword2.addImage(knifeImage);
    if (keyDown("space")) {
      bob.changeAnimation("bobjump", hiimage);
      downnum = 0;
      bob.scale = 0.8
      bob.velocityY = -10;
    }
    if (bob.isTouching(sword1) || bob.isTouching(sword2) || bob.isTouching(guard)) {
      bob.velocityX = 0;
      bob.velocityY = 0;
      gameState = "lose";
    }
    //gravity
    bob.velocityY = bob.velocityY + 0.8;
    bob.collide(wall1)
    bob.collide(wall2)
    bob.collide(wall3)
    if (keyDown("left") && downnum === 0) {
      bob.x = bob.x - 5;
      bob.changeAnimation("bobleft", bobWalkLeftImage)
    }
    if (keyDown("right") && downnum === 0) {
      bob.x = bob.x + 5;
      bob.changeAnimation("bobright", bobWalkImage);
    }
    if (keyDown("left") && downnum === 1) {
      bob.x = bob.x - 5;
      bob.changeAnimation("bobduckleft", bobDuckLeftImage);
    }
    if (keyDown("right") && downnum === 1) {
      bob.x = bob.x + 5;
      bob.changeAnimation("bobduck", bobDuckImage);
    }
    if (keyDown("down")) {
      bob.changeAnimation("bobduck", bobDuckImage);
      bob.scale = 0.5
      downnum = 1;
    }
    if (guardnum === 0) {
      guard.velocityX = 2;
      guard.addImage(alienYellowWalkImage);
    }
    if (guardnum === 1) {
      guard.velocityX = -2;
      guard.addImage(alienYellowWalkLeftImage);
    }
    if (guard.x === 390) {
      guardnum = 1;
    }
    if (guard.x === 10) {
      guardnum = 0;
    }
    if (bob.isTouching(door)) {
      outback.stop();
      winsound.play();
      gameState = "Win!";
      bob.destroy();
      guard.velocityX = 0;
      var win = createSprite(200, 200);
      win.addImage(youWinImage);
    }
  }
  if (gameState === "lose") {
    background(72, 61, 139);
    if (soundnum = 1){
      soundnum=soundnum-1
      losingsound.play()
    }
    if (soundnum = 0){
      losingsound.play()
      soundnum=soundnum+1
    }
    bob.changeAnimation("bobdead", bobDeadImage);
    guard.addImage(alienYellowWalkImage);
    guard.velocityX = 0;

  }
  drawSprites();
}
