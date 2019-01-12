class card {
    constructor(question, answer) {
        this.question = question;
        this.answer = answer;
    }
}

class set{
    #cards;
    #index;

    constructor(name, author, image, course) {
        this.name = name;
        this.author = author;
        this.image = image;
        this.course = course;
        this.#cards = [];
    }

    addCard(question, answer){
        cards.add(new card(question,answer));
    }

    removeCard(card){
        #cards.remove(card)
    }
}
function f1() {

    document.getElementById("change").innerHTML = "Paragraph bit.";

}

function myFunction() {

    document.getElementById("change").innerHTML = "Paragraph changed.";
}



function f() {
    var cardArray = [];
    cardArray[0] = card;
    document.getElementById("change").innerHTML = cardArray[0].question;
}
