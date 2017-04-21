function Calculator() {
  this.mode = 'numbers'
  this.firstNumber = ''
  this.secondNumber = ''
  this.operation = ''
}

Calculator.prototype.setMode = function(mode) {
  this.mode = mode
}
Calculator.prototype.getMode = function() {
  return this.mode
}

Calculator.prototype.setFirstNumber = function(number) {
  this.firstNumber += number
}
Calculator.prototype.getFirstNumber = function(number) {
  return this.firstNumber
}

Calculator.prototype.setSecondNumber = function(number) {
  this.secondNumber += number
}
Calculator.prototype.getSecondNumber = function(number) {
  return this.secondNumber
}


Calculator.prototype.add = function(a, b) {
  return a + b
}

Calculator.prototype.subtract = function(a, b) {
  return a - b
}

Calculator.prototype.multiply = function(a, b) {
  return a * b
}

Calculator.prototype.divide = function(a, b) {
  return a / b
}

Calculator.prototype.inverse = function(a) {
  return a * (-1)
}

Calculator.prototype.percent = function(a) {
  return a / 100
}

const calculator = new Calculator()
document.getElementsByClassName("calculator")[0].addEventListener('click', function(event) {
  switch(event.target.innerHTML) {
    case '0':
      calculator.setMode('numbers')
      calculator.getFirstNumber() && false? calculator.setSecondNumber('0') : calculator.setFirstNumber('0')
      console.log(calculator.getFirstNumber())
      break
    case '1':
      break
    case '2':
      break
    case '3':
      break
    case '4':
      break
    case '5':
      break
    case '6':
      break
    case '7':
      break
    case '8':
      break
    case '9':
      break
    case '+':
      break
    case '-':
      break
    case '±':
      break
    case '÷':
      break
    case '%':
      break
    case 'X':
      break
    case '=':
      break
    case 'AC':
    case 'C':
      break
    default:
      break
  }

})
