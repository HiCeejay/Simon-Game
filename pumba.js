var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var leveler = 0;

function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor)
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor)
    leveler++
    $('#level-title').text("Level"+ " " +leveler)

}

$(".btn").click(function(evt){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer([userClickedPattern.length - 1])
})



function playSound(name){
    var sounder = new Audio('soundz\\' + name + '.mp3');
    sounder.play();
}

function animatePress(currentColor){
 $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
    }, 100);
}


function isKeyPressOn(event) {
    // Check if the event is a keypress event.
    if (event.type === "keypress") {
     return true;
    } 
  }
  
  $(document).on("keypress", function(event) {
    // Check if the keypress is on.
    if (isKeyPressOn(event)) {
        if(!started){
      started = true;
      nextSequence();
        }
    }
  });

  function checkAnswer(currentLevel){

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        console.log("success");
        
    if (userClickedPattern.length === gamePattern.length) {
         setTimeout(function () {
            nextSequence();
         }, 1000);
        
    }
    
    }else{

        playSound("wrong")

        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");
        }, 200);
        
        $('#level-title').text("Game Over, Press Any Key to Restart");


        console.log("wrong")

        startOver();

    }
        
    }

    function startOver(){

        gamePattern = [];
        started = false;
        leveler = 0;
    }