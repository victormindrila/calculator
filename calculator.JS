const form = document.querySelector('.calculator');
let input = '';
let numberButtonPress = 0;
let typedNumbers = [];
let currentInput;
let typedOperators = [];
let calculation = 0;
let nextCalculation = false;

form.addEventListener('click', pressButton);
form.addEventListener('submit', calculate);

function calculate(event) {
	event.preventDefault();
	for (let i in typedNumbers) {
		i = +i;
		let firstNumber;
		i === 0 ? (firstNumber = +typedNumbers[i]) : (firstNumber = calculation);
		let operator = typedOperators[i];
		let secondNumber = +typedNumbers[i + 1];
		if (operator === '=') {
			document.querySelector('.display').setAttribute('value', calculation);
			nextCalculation = true;
			break;
		} else calculation = calculationF(firstNumber, secondNumber, i);
	}
}
function calculationF(a, b, i) {
	switch (typedOperators[i]) {
		case '/':
			return b === 0 ? 'can not divide by zero' : a / b;
			break;
		case '*':
			return a * b;
			break;
		case '-':
			return a - b;
			break;
		case '+':
			return a + b;
			break;
		default:
			return 'operator not recognised';
	}
}
function pressOnNumber(event) {
	if (numberButtonPress === 1) {
		input = currentInput;
		document.querySelector('.display').setAttribute('value', input);
	} else {
		input = input + currentInput;
		document.querySelector('.display').setAttribute('value', input);
	}
}

function pressOnOperator(event) {
	if (nextCalculation === false) {
		typedNumbers.push(input);
		typedOperators.push(currentInput);
		numberButtonPress = 0;
	} else {
		typedNumbers = [];
		typedOperators = [];
		typedNumbers.push(calculation);
		typedOperators.push(currentInput);
		numberButtonPress = 0;
		nextCalculation = false;
	}
}

function pressOnEqual(event) {
	typedNumbers.push(input);
	typedOperators.push(currentInput);
	numberButtonPress = 0;
}

function cancelAll(event) {
	numberButtonPress = 0;
	input = 0;
	nextCalculation = false;
	typedNumbers = [];
	typedOperators = [];
	document.querySelector('.display').setAttribute('value', '');
}

function changeSign() {
	input === 0 ? (input = '') : (input = input * -1);
	document.querySelector('.display').setAttribute('value', input);
}

function pressButton(event) {
	currentInput = event.target.defaultValue;
	numberButtonPress += 1;
	switch (currentInput) {
		case '1':
		case '2':
		case '3':
		case '4':
		case '5':
		case '6':
		case '7':
		case '8':
		case '9':
		case '0':
		case '.':
			pressOnNumber();
			break;
		case '+/-':
			changeSign();
			break;
		case '+':
		case '-':
		case '*':
		case '/':
			pressOnOperator();
			break;
		case 'C':
			cancelAll();
			break;
		case '=':
			pressOnEqual();
			break;
		default:
			console.log('you just found a bug');
			break;
	}
}
