var buttonColours = ["blue", "red", "green", "yellow"];

var gamePattern =[];
var userClickedPattern =[];
var spalva ="";

var started = false;
var turn = false;
var level = 0;


$(document).keypress(function(){
  if(!started){
    $("body").removeClass("game-over");
    nextSequence();
    started=true;
  }
});


$(".btn").click(function(event){
if(turn===true){
var userChosenColour = $(this).attr("id");
console.log(userChosenColour);
userClickedPattern.push(userChosenColour);
checkAnswer(); //3
if(userClickedPattern[userClickedPattern.length-1]!=
    gamePattern[userClickedPattern.length-1]){
      playSound("wrong");
    }else{
      playSound(userChosenColour);
    }
}
})

function checkAnswer(){

      if(userClickedPattern[userClickedPattern.length-1]===
          gamePattern[userClickedPattern.length-1]){
      if(gamePattern.length===userClickedPattern.length){
          turn=false;
          setTimeout(function(){
            nextSequence();
          },1000);}
        }else{
        gameOver();

};
}


//randomNumber
function nextSequence(){
userClickedPattern=[];
gamePattern=[];
$("#level-title").html("Level "+ (level+1));
for(var i=0;i<=level;i++){
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
};
var index = 0;
var blink = setInterval(function(){
  turn=false;
  $("#"+gamePattern[index]).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(gamePattern[index]);
 console.log(turn);
  index++;
     if(index == gamePattern.length){
        clearInterval(blink);
        turn=true;
     }
}, 1000)
level++;
}


function gameOver(){
  turn=false;
  $("body").addClass("game-over");
  $("#level-title").html("Press any key to restart");
 level=0;
  console.log("gameOver");
    started = false;

}

function startOver(){
  level = 0;
  gamePattern=[];

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
