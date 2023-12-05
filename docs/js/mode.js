function setEditMode() {
    var elements = document.getElementsByClassName("displaySolveMode");
    for (const element of elements) {
        element.classList.add("hidden")
    }
}

function setSolveMode() {
    var elements = document.getElementsByClassName("displayEditMode");
    for (const element of elements) {
        element.classList.add("hidden")
    }
}

function setMode() {
    var params = new URLSearchParams(document.location.search);
    if (params.has("m") && params.get("m") === "solve") {
        setSolveMode();
    } else {
        setEditMode();
    }
}
setMode();
