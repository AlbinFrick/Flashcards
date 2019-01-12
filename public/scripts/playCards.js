function loadJQuery() {


    var width = '68vw';
    var sliderAnimationSpeed = 500;
    var buttonAnimationSpeed = 300;
    var currentSlide = 1;

    var $content = $('#content');
    var $rightArrow = $content.find('#arrowFrameRight');
    var $leftArrow = $content.find('#arrowFrameLeft');
    var $leftArrowImg = $leftArrow.find('#leftArrow>img');
    var $rightArrowImg = $leftArrow.find('#rightArrow>img');
    var $slider = $content.find('#slideShow');
    var $cardContainer = $slider.find('#cardContainer');
    var $card = $cardContainer.find('.card');
    var moveRightIsFinished = true;
    var moveLeftIsFinished = true;

     function moveRight(){
         if(moveRightIsFinished){
             moveRightIsFinished =false;
             $cardContainer.animate({'margin-left': '-=' + width}, sliderAnimationSpeed, function () {
                 currentSlide++;
                 if (currentSlide === $card.length) {
                     $rightArrow.fadeOut(buttonAnimationSpeed);
                 }
                 if (currentSlide > 1) {
                     $leftArrow.fadeIn(buttonAnimationSpeed);
                 }
                 moveRightIsFinished = true;
             });
         }
     }

    function moveLeft(){
         if(moveLeftIsFinished){
             moveLeftIsFinished = false;
             $cardContainer.animate({'margin-left': '+='+width}, sliderAnimationSpeed, function () {
                 currentSlide--;
                 if (currentSlide === 1){
                     $leftArrow.fadeOut(buttonAnimationSpeed);
                 }
                 if(currentSlide < $card.length){
                     $rightArrow.fadeIn(buttonAnimationSpeed);
                 }
                 moveLeftIsFinished = true;
             });
         }
    }


    $card.flip({trigger: 'click', axis: 'x'});
    $rightArrow.on('click', moveRight);
    $leftArrow.on('click', moveLeft);

}

window.onload = function setUp() {
    console.log("laddar");
    console.log(location.search);

    fetch('/set/' + location.search)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            buildCards(myJson);
        });
}

function buildCards(data) {
    console.log(data);

    for (let i = 1; i < data.length; i++) {
        let card = data[i];
        let div = document.createElement("li");
        div.setAttribute("class", "card");
        div.innerHTML = "<div class=\"front\"><p>"+ card.card_question +"</p></div>" +
            "<div class=\"back\"><p>"+ card.card_answer +"</p></div>";
        document.getElementById("cardContainer").appendChild(div);

    }

    loadJQuery();
}



