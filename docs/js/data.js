BLANK = ""
DELIMETER = "-"

function arrayToString(array) {
    return array.join(DELIMETER)
}

function stringToArray(string) {
    return string.split(DELIMETER)
}

function getWritten(className) {
    var array = []
    var elements = document.getElementsByClassName(className);
    for (const element of elements) {
        var written = element.innerHTML;
        if (! written || written.length === 0) {
            written = BLANK
        }
        array.push(written)
    }
    return array
}

function setWritten(className, array) {
    var elements = document.getElementsByClassName(className);
    for (let index = 0; index < array.length; index++) {
        if (index >= elements.length) {
            return
        }
        elements[index].innerHTML = array[index]
    }
}

function setWritten2D(className, array2, row) {
    var elements = document.getElementsByClassName(className);
    for (let col = 0; col < array2.length; col++) {
        var array = array2[col]
        for (let index = 0; index < array.length; index++) {
            if (index >= row) {
                break
            }
            const pos = col * row + index
            if (pos >= elements.length) {
                break
            }
            elements[pos].innerHTML = array[index]
        }
    }
}

function getHintChar() {
    return getWritten("problemChar")
}

function getHintNum(row = 0) {
    var array = getWritten("problemNumber")
    if (row === 0) {
        return array
    }
    const column = array.length / row
    var array2 = []
    for (let col = 0; col < column; col++) {
        array2.push(array.slice(col * row, col * row + row))
    }
    return array2
}

function setHint(hintChar, hintNum, row = 0) {
    setWritten("problemChar", hintChar)
    if(row === 0) {
        setWritten("problemNumber", hintNum)
    } else {
        setWritten2D("problemNumber", hintNum, row)
    }
}

function getAnswerChar() {
    return getWritten("answerChar")
}

function getAnswerPart() {
    return getWritten("answerPart")
}

function setAnswer(answerChar, answerPart) {
    setWritten("answerChar", answerChar)
    setWritten("answerPart", answerPart)
}