function exchangeRow(row1, row2) {
    var hintChar = swapArray(getHintChar(), row1, row2)
    var answerChar = swapArray(getAnswerChar(), row1, row2)
    var answerPart = getAnswerPart()
    const row = answerPart.length
    var hintNum = swapArray(getHintNum(row), row1, row2)
    setHint(hintChar, hintNum, row)
    setAnswer(answerChar, answerPart)
}

function exchangeColumn(column1, column2) {
    var answerPart = swapArray(getAnswerPart(), column1, column2)
    const row = answerPart.length
    var hintNum = getHintNum(row)
    var newHintNum = []
    hintNum.forEach(hintNumLine => {
        newHintNum.push(swapArray(hintNumLine, column1, column2))
    });
    setHint(getHintChar(), newHintNum, row)
    setAnswer(getAnswerChar(), answerPart)
}

function swapArray(array, pos1, pos2) {
    const l = array.length
    const x = pos1 - 1
    const y = pos2 - 1
    if ( x === y || x < 0 || l <= x || y < 0 || l <= y) {
        return array
    }
    var temp = array[x]
    array[x] = array[y]
    array[y] = temp
    return array
}