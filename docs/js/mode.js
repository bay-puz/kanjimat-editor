
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