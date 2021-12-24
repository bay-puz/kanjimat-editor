function setEditMode() {
    var elements = document.getElementsByClassName("displayAnswerMode");
    for (const element of elements) {
        element.classList.add("hidden")
    }
}

function setAnswerMode() {
    var elements = document.getElementsByClassName("displayEditMode");
    for (const element of elements) {
        element.classList.add("hidden")
    }
}

function setMode() {
    var params = new URLSearchParams(document.location.search);
    if (params.has("m") && params.get("m") === "solve") {
        setAnswerMode();
    } else {
        setEditMode();
    }
}
setMode();

function encodeHint() {
    var hint = "hint1"
    return hint
}

function decodeHint(hintString) {
    console.log("puts hint in table", hintString);
    return
}

function encodeAnswer() {
    var answer = "answer1"
    return answer
}

function decodeAnswer(answerString) {
    console.log("puts answer in table", answerString);
    return
}