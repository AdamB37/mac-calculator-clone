function stringToNumber(str) {
  return str.match(/[.]/) ? parseFloat(str) : parseInt(str)
}

function Calculator() {
  this.operationMode = 'number'
  this.numberMode = 'primary'
  this.primaryNumber = '0'
  this.secondaryNumber = ''
  this.operation = ''
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
    document.getElementsByClassName('calculator-prompt')[0].innerHTML = this.getPrimaryNumber()
  }
  else {
    document.getElementsByClassName('calculator-prompt')[0].innerHTML = this.getSecondaryNumber()
  }
}


const calculator = new Calculator()
document.getElementsByClassName("calculator")[0].addEventListener('click', function(event) {
  switch(event.target.innerHTML) {
    case '0':
      calculator.numberClick('0')
      calculator.handleDisplay()
      break
    case '1':
      calculator.numberClick('1')
      calculator.handleDisplay()
      break
    case '2':
      calculator.numberClick('2')
      calculator.handleDisplay()
      break
    case '3':
      calculator.numberClick('3')
      calculator.handleDisplay()
      break
    case '4':
      calculator.numberClick('4')
      calculator.handleDisplay()
      break
    case '5':
      calculator.numberClick('5')
      calculator.handleDisplay()
      break
    case '6':
      calculator.numberClick('6')
      calculator.handleDisplay()
      break
    case '7':
      calculator.numberClick('7')
      calculator.handleDisplay()
      break
    case '8':
      calculator.numberClick('8')
      calculator.handleDisplay()
      break
    case '9':
      calculator.numberClick('9')
      calculator.handleDisplay()
      break
    case '+':
      calculator.operationClick('+')
      break
    case '-':
      calculator.operationClick('-')
      break
    case 'x':
      calculator.operationClick('x')
      break
    case '÷':
      calculator.operationClick('÷')
      break
    case '±':
      calculator.inverse()
      calculator.handleDisplay()
      break
    case '%':
      calculator.percent()
      calculator.handleDisplay()
      break
    case '=':
      calculator.evaluate()
      break
    case '.':
      calculator.decimal()
      calculator.handleDisplay()
      break
    case 'AC':
    case 'C':
      calculator.clear()
      break
    default:
      break
  }
})
