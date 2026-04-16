import { CalculatorState, OperationType, initialState } from '../model/CalculatorTypes';


export class CalculatorEngine {
  private state: CalculatorState;
  private listeners: Array<(state: CalculatorState) => void> = [];

  constructor() {
    this.state = { ...initialState };
  }


  inputDigit(digit: string): CalculatorState {
    if (this.state.hasError) {
      this.clearAll();
    }

    if (this.state.waitingForOperand) {
      this.state.displayValue = digit;
      this.state.waitingForOperand = false;
    } else {
      this.state.displayValue = this.state.displayValue === '0' ? digit : this.state.displayValue + digit;
    }

    this.state.currentValue = parseFloat(this.state.displayValue);
    this.state.hasError = false;

    this.notifyListeners();
    return this.getState();
  }


  inputDecimal(): CalculatorState {
    if (this.state.waitingForOperand) {
      this.state.displayValue = '0.';
      this.state.waitingForOperand = false;
    } else if (!this.state.displayValue.includes('.')) {
      this.state.displayValue += '.';
    }

    this.state.currentValue = parseFloat(this.state.displayValue);

    this.notifyListeners();
    return this.getState();
  }


  setOperation(operation: OperationType): CalculatorState {

    this.addHistory(`${this.state.displayValue} ${this.getOperationSymbol(operation)}`);

    if (this.state.operation !== OperationType.NONE && !this.state.waitingForOperand) {
      this.calculate();
    }

    this.state.previousValue = this.state.currentValue;
    this.state.operation = operation;
    this.state.waitingForOperand = true;

    this.notifyListeners();
    return this.getState();
  }


  calculate(): CalculatorState {
    if (this.state.operation === OperationType.NONE || this.state.waitingForOperand) {
      return this.getState();
    }

    try {
      let result: number;

      switch (this.state.operation) {
        case OperationType.ADD:
          result = this.state.previousValue + this.state.currentValue;
          break;
        case OperationType.SUBTRACT:
          result = this.state.previousValue - this.state.currentValue;
          break;
        case OperationType.MULTIPLY:
          result = this.state.previousValue * this.state.currentValue;
          break;
        case OperationType.DIVIDE:
          if (Math.abs(this.state.currentValue) < Number.EPSILON) {
            throw new Error('Cannot divide by zero');
          }
          result = this.state.previousValue / this.state.currentValue;
          break;
        default:
          return this.getState();
      }


      result = this.roundNumber(result, 12);

      this.state.displayValue = this.formatDisplay(result);
      this.state.currentValue = result;


      this.addHistory(`${this.state.currentValue} = ${result}`);

      this.state.operation = OperationType.NONE;
      this.state.waitingForOperand = true;
      this.state.hasError = false;

    } catch (error) {
      this.state.hasError = true;
      this.state.displayValue = 'Error';
      this.state.operation = OperationType.NONE;
    }

    this.notifyListeners();
    return this.getState();
  }


  clearAll(): CalculatorState {
    this.state = { ...initialState };

    this.notifyListeners();
    return this.getState();
  }


  clearEntry(): CalculatorState {
    this.state.displayValue = '0';
    this.state.currentValue = 0;
    this.state.hasError = false;

    this.notifyListeners();
    return this.getState();
  }


  deleteLast(): CalculatorState {
    if (this.state.hasError || this.state.waitingForOperand) {
      return this.clearAll();
    }

    if (this.state.displayValue.length > 1) {
      this.state.displayValue = this.state.displayValue.slice(0, -1);
    } else {
      this.state.displayValue = '0';
    }

    this.state.currentValue = parseFloat(this.state.displayValue) || 0;

    this.notifyListeners();
    return this.getState();
  }


  toggleSign(): CalculatorState {
    if (this.state.hasError) {
      return this.clearAll();
    }

    this.state.currentValue = -this.state.currentValue;
    this.state.displayValue = this.formatDisplay(this.state.currentValue);

    this.notifyListeners();
    return this.getState();
  }


  percentage(): CalculatorState {
    if (this.state.hasError) {
      return this.clearAll();
    }

    this.state.currentValue = this.state.currentValue / 100;
    this.state.displayValue = this.formatDisplay(this.state.currentValue);

    this.notifyListeners();
    return this.getState();
  }


  squareRoot(): CalculatorState {
    if (this.state.hasError || this.state.currentValue < 0) {
      this.state.hasError = true;
      this.state.displayValue = 'Error';
    } else {
      this.state.currentValue = Math.sqrt(this.state.currentValue);
      this.state.displayValue = this.formatDisplay(this.state.currentValue);
    }

    this.notifyListeners();
    return this.getState();
  }


  square(): CalculatorState {
    if (this.state.hasError) {
      return this.clearAll();
    }

    this.state.currentValue = this.state.currentValue * this.state.currentValue;
    this.state.displayValue = this.formatDisplay(this.state.currentValue);

    this.notifyListeners();
    return this.getState();
  }


  reciprocal(): CalculatorState {
    if (this.state.hasError || Math.abs(this.state.currentValue) < Number.EPSILON) {
      this.state.hasError = true;
      this.state.displayValue = 'Error';
    } else {
      this.state.currentValue = 1 / this.state.currentValue;
      this.state.displayValue = this.formatDisplay(this.state.currentValue);
    }

    this.notifyListeners();
    return this.getState();
  }


  memoryAdd(): CalculatorState {
    this.state.memoryValue += this.state.currentValue;

    this.notifyListeners();
    return this.getState();
  }


  memorySubtract(): CalculatorState {
    this.state.memoryValue -= this.state.currentValue;

    this.notifyListeners();
    return this.getState();
  }


  memoryRecall(): CalculatorState {
    if (this.state.hasError) {
      this.clearAll();
    }

    this.state.currentValue = this.state.memoryValue;
    this.state.displayValue = this.formatDisplay(this.state.currentValue);

    this.notifyListeners();
    return this.getState();
  }


  memoryClear(): CalculatorState {
    this.state.memoryValue = 0;

    this.notifyListeners();
    return this.getState();
  }


  getState(): CalculatorState {
    return { ...this.state };
  }


  private addHistory(entry: string): void {
    this.state.history.unshift(entry);
    if (this.state.history.length > 10) {
      this.state.history.pop();
    }
  }


  private formatDisplay(value: number): string {

    if (Number.isInteger(value)) {
      return value.toString();
    }

    const strValue = value.toString();


    if (strValue.includes('e') || strValue.includes('E')) {
      return value.toExponential(8);
    }

    if (strValue.includes('.') && strValue.split('.')[1].length > 8) {
      return value.toFixed(8).replace(/\.?0+$/, '');
    }

    return strValue;
  }


  private roundNumber(value: number, precision: number): number {
    const factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
  }


  private getOperationSymbol(operation: OperationType): string {
    switch (operation) {
      case OperationType.ADD: return '+';
      case OperationType.SUBTRACT: return '−';
      case OperationType.MULTIPLY: return '×';
      case OperationType.DIVIDE: return '÷';
      case OperationType.EQUAL: return '=';
      default: return '';
    }
  }


  addListener(listener: (state: CalculatorState) => void): void {
    this.listeners.push(listener);
  }

  removeListener(listener: (state: CalculatorState) => void): void {
    const index = this.listeners.indexOf(listener);
    if (index !== -1) {
      this.listeners.splice(index, 1);
    }
  }

  private notifyListeners(): void {
    const stateCopy = JSON.parse(JSON.stringify(this.state));
    this.listeners.forEach(listener => listener(stateCopy));
  }
}