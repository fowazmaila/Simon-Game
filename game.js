var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#level-title").text("Level "+level);
    level++;

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})

$(document).keydown(function (event) {
    if(event.key ==="a" && !gameStarted){
        gameStarted=true;
        nextSequence();
    }
});


function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function (){
        $("#"+currentColour).removeClass("pressed");
    }, 100)

}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel]) {
        if (userClickedPattern.length===gamePattern.length){
            setTimeout(nextSequence, 1000);
        }
    } else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("#level-title").text("Game Over, Press A Key to Restart");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)

        startOver();
    }

}

function startOver() {
    gamePattern=[];
    level=0;
    gameStarted=false;
}
