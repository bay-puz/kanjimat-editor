BLANK = ""
DELIMETER = "-"

function arrayToString(array) {
    return array.join(DELIMETER)
}

function stringToArray(string) {
    return string.split(DELIMETER)
}

function writeChar(input, element, type) {
    const char = validate(input, type)
    if (char === null) {
        return
    }
    element.innerText = char
}

function validate(input, type) {
    if (input.length === 0) {
        return ""
    }
    if (type === "hintChar") {
        return kanaString(input)
    }
    if (type === "answerChar") {
        return input.at(0)
    }
    if (type === "answerPart") {
        return input.substring(0, 4)
    }
    return null
}

function kanaString(string) {
    var kana = ""
    for (let index = 0; index < string.length; index++) {
        const code =string.codePointAt(index)
        if (string.at(index) == "ー") {
            kana += string.at(index)
        }else if ("ぁ".codePointAt(0) <= code && code <= "ゖ".codePointAt(0)) {
            kana += string.at(index)
        } else if("ァ".codePointAt(0) <= code && code <= "ヶ".codePointAt(0)) {
            kana += string.at(index)
        }
    }
    return kana
}

function upHintNumber(element) {
    if (! isProblemMode()) {
        return;
    }
    var number = parseInt(element.innerText);
    if (number) {
        element.innerText = number + 1;
    } else {
        element.innerText = 1;
    }
}

function downHintNumber(element) {
    if (! isProblemMode()) {
        return;
    }
    var number = parseInt(element.innerText);
    if (number) {
        element.innerText = number > 1 ? number - 1: "";
    }
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
    return getWritten("hintChar")
}

function getHintNum(row = 0) {
    var array = getWritten("hintNumber")
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
    setWritten("hintChar", hintChar)
    if(row === 0) {
        setWritten("hintNumber", hintNum)
    } else {
        setWritten2D("hintNumber", hintNum, row)
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

async function hashAnswer(answerChar, answerPart) {
    const messageString = answerChar.join("") + answerPart.join("")
    const message = new TextEncoder().encode(messageString)
    const hashBuffer = await crypto.subtle.digest('SHA-1', message);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}