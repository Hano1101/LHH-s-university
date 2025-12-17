export enum OperationType {
  ADD = 'ADD',
  SUBTRACT = 'SUBTRACT',
  MULTIPLY = 'MULTIPLY',
  DIVIDE = 'DIVIDE',
  EQUAL = 'EQUAL',
  NONE = 'NONE'
}

export enum ButtonType {
  NUMBER = 'NUMBER',
  OPERATOR = 'OPERATOR',
  FUNCTION = 'FUNCTION',
  EQUAL = 'EQUAL'
}


export interface ButtonConfig {
  label: string;
  type: ButtonType;
  color: string;
  textColor: string;
  operation?: OperationType;
  gridSpan?: number;
}


export interface CalculatorState {
  displayValue: string;
  currentValue: number;
  previousValue: number;
  operation: OperationType;
  waitingForOperand: boolean;
  hasError: boolean;
  memoryValue: number;
  history: string[];
}


export const initialState: CalculatorState = {
  displayValue: '0',
  currentValue: 0,
  previousValue: 0,
  operation: OperationType.NONE,
  waitingForOperand: false,
  hasError: false,
  memoryValue: 0,
  history: []
};