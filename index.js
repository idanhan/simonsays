var start = false;
var cont = false;
var clickedbool = false;
var j = 0;

$(".row").on("click",function(clickevent){
    onerror();
});

$(document).on("keypress",function(){
    start = true;
    startgame();
})



console.log("hereee");
let clickedidarray = [];

let colorsarray = ["green","red","yellow","blue"];



function addsound(keyevent){
    switch (keyevent) {
        case "green":
            let green = new Audio("sounds/green.mp3");
            green.play();
            break;
        case "red":
            let red = new Audio("sounds/red.mp3");
            red.play();
            break;
        case "yellow":
            let yellow = new Audio("sounds/yellow.mp3");
            yellow.play();
            break;
        case "blue":
            let blue = new Audio("sounds/blue.mp3");
            blue.play();
            break;
        default:
            break;
    }
}

function addsoundnobutton(keyevent){
    switch (keyevent) {
        case "green":
            const audio = new Audio("sounds/green.mp3");
            audio.addEventListener('canplay', e => {
            audio.play();
            });
            break;
        case "red":
            const audio2 = new Audio("sounds/red.mp3");
            audio2.addEventListener('canplay', e => {
            console.log('canplay');
            audio2.play();
            });
            break;
        case "yellow":
            const audio3 = new Audio("sounds/yellow.mp3");
            audio3.addEventListener('canplay', e => {
            console.log('canplay');
            audio3.play();
            });
            break;
        case "blue":
            const audio4 = new Audio("sounds/blue.mp3");
            audio4.addEventListener('canplay', e => {
            console.log('canplay');
            audio4.play();
            });
            break;
        default:
            break;
    }
}

function randomColor(){
    let number =Math.round( Math.random()*3);
    let color = colorsarray[number];
    return color;
}

function startgame(){
    $(".row").off("click");
    $("#level-title").text("level "+ 0);
    let selectedcolor = randomColor();
    animatebox(selectedcolor);
    addsoundnobutton(selectedcolor);
    clickedidarray.push(selectedcolor);
    checkUserInput(0,selectedcolor,0);
}

function nextlevel(level){
    $("#level-title").text("level "+ (level));
    let selectedcolor = randomColor();
    clickedidarray.push(selectedcolor);
    setTimeout(() => {
        animatebox(selectedcolor);
        addsound(selectedcolor);
    }, 500);

    checkUserInput(level,selectedcolor,0);
}

function checkUserInput(level,selectedcolor,index){
    $(".row").off("click").on("click",function(clickevent){
        let idelement = clickevent.target.id;
        if((clickedidarray.length!=0) && (idelement === clickedidarray[index])){
            animatebox(idelement);
            addsound(idelement);
            console.log("the number is" + index + "s" + level);
            if(index === level){
                setTimeout(nextlevel(level+1),1000);
                return;
            }
            checkUserInput(level,selectedcolor,index+1);
            return;
        }else{
            clickedidarray=[];
            onerror();
            $("#level-title").text("Game-Over press a key to restart!");
            start = false;
        }
    });
    
}


function onerror(){
    $("body").addClass("game-over");
    let audio = new Audio("sounds/wrong.mp3");
    audio.play();
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 100);
    
}

function animatebox(keyevent){
    let $element =$(("#") +keyevent);
    
    $element.addClass("pressed");

    setTimeout(() => {
        $element.removeClass("pressed");
    }, 100);
}

