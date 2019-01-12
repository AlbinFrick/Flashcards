var emptyField = false;
var fillFieldsShown = false;
var canSend = true;
var fullForm;
var metaDataTextAreaCount = 3;
var submitNr;
var currentSendNr = 0;
var cardIDs = 0;


window.onload = function setUp() {
    document.getElementById("saveCardSet").addEventListener("click", saveCardSet);
    document.getElementById("addCardSet").addEventListener("click", addCard);
}

function addCard() {
    cardIDs++;
    var div = document.createElement("div");
    div.id = cardIDs;

    div.innerHTML = "<textarea type=\"text\" form=\"form1\" placeholder=\"Fråga\"></textarea>\n" +
        "            <textarea type=\"text\" form=\"form1\" placeholder=\"Svar\"></textarea>";
    div.className = "cardContainer";

    var div2 = document.createElement("div");

    div2.innerHTML = "&times";
    div2.className = "cardDelete";
    div2.addEventListener("click",function() {
        deleteCard(div.id);
    });
    div.appendChild(div2);
    document.getElementById("allCards").appendChild(div);
}

function deleteCard(id) {
    document.getElementById(id).remove();
}


function saveCardSet() {
    fullForm = document.getElementById("form1");
    submitNr = (fullForm.length-metaDataTextAreaCount)/2 +1;
    console.log("Submit number: " + submitNr);
    controlEmptyFields();
    if (!emptyField) {
        sendNext();
    }
    // Simulate an HTTP redirect:
    console.log("redirecting")
}

function sendNext() {
    console.log("sendNext");
    if(currentSendNr == 0) {
        saveSet();
    } else {
        saveCards();
    }
}

function saveSet() {
    let metaForm = buildForm("metaForm", "/set");
    controlEmptyFields();

    var setName = buildInput("set_name", fullForm.elements[0].value);
    metaForm.appendChild(setName);
    var course = buildInput("course", fullForm.elements[1].value);
    metaForm.appendChild(course);
    var color = buildInput("color", fullForm.elements[2].value);
    metaForm.appendChild(color);

    document.body.appendChild(metaForm);

    console.log("sending metaForm");
    subForm("metaForm", "/set");
}

function saveCards() {
    let cardForm = buildForm("cardForm"+currentSendNr, "/card");

    var setName = buildInput("set_name", fullForm.elements[0].value);
    cardForm.appendChild(setName);

    var course = buildInput("course",fullForm.elements[1].value);
    cardForm.appendChild(course);

    var question = buildInput("card_question", fullForm.elements[metaDataTextAreaCount+(currentSendNr-1)*2].value);
    cardForm.appendChild(question);
    console.log("Question " + currentSendNr + " value: " + fullForm.elements[metaDataTextAreaCount+(currentSendNr-1)*2].value);

    var answer = buildInput("card_answer", fullForm.elements[metaDataTextAreaCount+(currentSendNr-1)*2+1].value);
    cardForm.appendChild(answer);
    console.log("Answer " + currentSendNr + " value: " + fullForm.elements[metaDataTextAreaCount+(currentSendNr-1)*2+1].value);


    document.body.appendChild(cardForm);

    console.log("sending cardForm");

    subForm("cardForm"+currentSendNr, "/card");
}

function controlEmptyFields() {
    for (let i = 0; i < fullForm.length; i++) {
        if (!fullForm.elements[i].value) {
            console.log("Empty field");
            emptyField = true;
            fillFieldsShown = true;
            break;
        }
        emptyField = false;
    }
    if(!fillFieldsShown) {
        //show error, that user is stupid >:|
    }
}

function subForm (formName, action){
    $.ajax({
        url:action,
        type:'post',
        data:$('#' + formName).serialize(),
        success:function() {
            currentSendNr++;
            if(currentSendNr < submitNr) {
                sendNext();
            } else {
                window.location.replace("/");
            }
        }
    });
}

function buildInput(id, value) {
    var builtInput = document.createElement("input");
    builtInput.setAttribute('type',"text");
    builtInput.setAttribute('name',id);
    builtInput.setAttribute('value', value);
    return builtInput;
}

function buildForm(id, location) {
    let builtForm = document.createElement("form");
    builtForm.setAttribute("id",id)
    builtForm.setAttribute('method', "post");
    builtForm.setAttribute('action', location);
    return builtForm;
}