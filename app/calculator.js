(function () {
  function stringToNumber(str) {
    return str.match(/[.]/) ? parseFloat(str) : parseInt(str)
  }
  function Calculator(calculatorDom) {
    this.dom = calculatorDom
    this.operationMode = 'number'
    this.numberMode = 'primary'
    this.primaryNumber = '0'
    this.secondaryNumber = ''
    this.operation = ''
    this.inputHandler = this.inputHandler.bind(this)
    this.addListener()
  }

  Calculator.prototype.setOperationMode = function(operationMode) {
    this.operationMode = operationMode
  }
  Calculator.prototype.getOperationMode = function() {
    return this.operationMode
  }

  Calculator.prototype.setOperation = function(operation) {
    this.operation = operation
  }
  Calculator.prototype.getOperation = function() {
    return this.operation
  }

  Calculator.prototype.setNumberMode = function(numberMode) {
    this.numberMode = numberMode
  }

  Calculator.prototype.getNumberMode = function() {
    return this.numberMode
  }

  Calculator.prototype.setPrimaryNumber = function(number) {
    if(number === '0' && this.getPrimaryNumber() !== '0') {
      this.primaryNumber += number
    }
    else if(this.getPrimaryNumber() === '0'){
      this.primaryNumber = number
    }
    else {
      this.primaryNumber += number
    }
  }

  Calculator.prototype.getPrimaryNumber = function() {
    return this.primaryNumber
  }

  Calculator.prototype.setSecondaryNumber = function(number) {
    if(this.getOperationMode() === 'operation') {
      this.secondaryNumber = ''
    }
    if(number === '0' && this.getSecondaryNumber() !== '0') {
      this.secondaryNumber += number
    }
    else if(this.getSecondaryNumber() === '0'){
      this.secondaryNumber = number
    }
    else {
      this.secondaryNumber += number
    }
  }

  Calculator.prototype.getSecondaryNumber = function() {
    return this.secondaryNumber
  }


  Calculator.prototype.add = function() {
    this.primaryNumber = stringToNumber(this.primaryNumber)
    this.secondaryNumber = stringToNumber(this.secondaryNumber)
    this.primaryNumber += this.secondaryNumber
    this.primaryNumber += ''
    this.secondaryNumber += ''
  }

  Calculator.prototype.subtract = function() {
    this.primaryNumber = stringToNumber(this.primaryNumber)
    this.secondaryNumber = stringToNumber(this.secondaryNumber)
    this.primaryNumber -= this.secondaryNumber
    this.primaryNumber += ''
    this.secondaryNumber += ''
  }

  Calculator.prototype.multiply = function() {
    this.primaryNumber = stringToNumber(this.primaryNumber)
    this.secondaryNumber = stringToNumber(this.secondaryNumber)
    this.primaryNumber *= this.secondaryNumber
    this.primaryNumber += ''
    this.secondaryNumber += ''
  }

  Calculator.prototype.divide = function() {
    this.primaryNumber = stringToNumber(this.primaryNumber)
    this.secondaryNumber = stringToNumber(this.secondaryNumber)
    this.primaryNumber /= this.secondaryNumber
    this.primaryNumber += ''
    this.secondaryNumber += ''
  }

  Calculator.prototype.inverse = function() {
    this.setNumberMode('primary')
    if(this.primaryNumber !== '0') {
      this.primaryNumber = stringToNumber(this.primaryNumber)
      this.primaryNumber *= -1
      this.primaryNumber += ''
    }
  }

  Calculator.prototype.percent = function() {
    this.setNumberMode('primary')
    if(this.primaryNumber !== '0') {
      this.primaryNumber = stringToNumber(this.primaryNumber)
      this.primaryNumber /= 100
      this.primaryNumber += ''
    }
  }

  Calculator.prototype.decimal = function() {
    this.setNumberMode('primary')
    if(this.primaryNumber !== '0') {
      this.primaryNumber += '.'
    }
  }

  Calculator.prototype.numberClick = function(number) {
    document.getElementsByClassName("calculator-button")[0].innerHTML = 'C'

    if(this.getNumberMode() === 'primary') {
      this.setPrimaryNumber(number)
    }
    else {
      this.setSecondaryNumber(number)
    }
    this.setOperationMode('number')
  }

  Calculator.prototype.operationClick = function(operation) {
    document.getElementsByClassName("calculator-button")[0].innerHTML = 'C'

    this.setOperationMode('operation')
    this.setNumberMode('secondary')
    this.setSecondaryNumber(this.getPrimaryNumber())
    if(this.getOperation() === operation) {
      this.evaluate()
    }
    else {
      this.setOperation(operation)
    }
  }

  Calculator.prototype.clear = function() {
    document.getElementsByClassName("calculator-button")[0].innerHTML = 'AC'
    this.operationMode = 'number'
    this.numberMode = 'primary'
    this.primaryNumber = '0'
    this.secondaryNumber = ''
    this.operation = ''
    this.handleDisplay()
  }

  Calculator.prototype.evaluate = function() {
    const temp = this.primaryNumber.split('')
    if(temp[temp.length - 1] === '.') {
      temp.length -= 1
      this.primaryNumber = temp.join('')
    }
    switch(this.operation) {
      case '+':
        this.add()
        break
      case '-':
        this.subtract()
        break
      case 'x' :
        this.multiply()
        break
      case '÷':
        this.divide()
        break
      default:
        break
    }
    this.setNumberMode('primary')
    this.handleDisplay()
    this.setNumberMode('secondary')
    this.setOperation('')
  }

  Calculator.prototype.handleDisplay = function() {
    if(this.getNumberMode() === 'primary') {
      this.dom.querySelector('.calculator-prompt').innerHTML = this.getPrimaryNumber()
    }
    else {
      this.dom.querySelector('.calculator-prompt').innerHTML = this.getSecondaryNumber()
    }
  }

  Calculator.prototype.inputHandler = function(event) {
    switch(event.target.innerHTML) {
      case '0':
        this.numberClick('0')
        this.handleDisplay()
        break
      case '1':
        this.numberClick('1')
        this.handleDisplay()
        break
      case '2':
        this.numberClick('2')
        this.handleDisplay()
        break
      case '3':
        this.numberClick('3')
        this.handleDisplay()
        break
      case '4':
        this.numberClick('4')
        this.handleDisplay()
        break
      case '5':
        this.numberClick('5')
        this.handleDisplay()
        break
      case '6':
        this.numberClick('6')
        this.handleDisplay()
        break
      case '7':
        this.numberClick('7')
        this.handleDisplay()
        break
      case '8':
        this.numberClick('8')
        this.handleDisplay()
        break
      case '9':
        this.numberClick('9')
        this.handleDisplay()
        break
      case '+':
        this.operationClick('+')
        break
      case '-':
        this.operationClick('-')
        break
      case 'x':
        this.operationClick('x')
        break
      case '÷':
        this.operationClick('÷')
        break
      case '±':
        this.inverse()
        this.handleDisplay()
        break
      case '%':
        this.percent()
        this.handleDisplay()
        break
      case '=':
        this.evaluate()
        break
      case '.':
        this.decimal()
        this.handleDisplay()
        break
      case 'AC':
      case 'C':
        this.clear()
        break
      default:
      break
    }
  }

  Calculator.prototype.addListener = function() {
    this.dom.addEventListener('click', this.inputHandler)
  }
  
}

  var domArray = document.getElementsByClassName("calculator")
  for(var i = 0; i < domArray.length; i++) {
    var calculator = new Calculator(domArray[i])
    console.log(calculator)
    console.log(domArray)
  }
})()
