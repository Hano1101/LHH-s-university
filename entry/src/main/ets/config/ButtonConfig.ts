import { ButtonConfig, ButtonType, OperationType } from '../model/CalculatorTypes';


export const buttonConfigs: ButtonConfig[] = [

  {
    label: 'MC',
    type: ButtonType.FUNCTION,
    color: '#2E2E2E',
    textColor: '#FFFFFF',
    gridSpan: 1
  },
  {
    label: 'MR',
    type: ButtonType.FUNCTION,
    color: '#2E2E2E',
    textColor: '#FFFFFF',
    gridSpan: 1
  },
  {
    label: 'M+',
    type: ButtonType.FUNCTION,
    color: '#2E2E2E',
    textColor: '#FFFFFF',
    gridSpan: 1
  },
  {
    label: 'M-',
    type: ButtonType.FUNCTION,
    color: '#2E2E2E',
    textColor: '#FFFFFF',
    gridSpan: 1
  },
  {
    label: 'C',
    type: ButtonType.FUNCTION,
    color: '#FF9500',
    textColor: '#FFFFFF',
    gridSpan: 1
  },


  {
    label: '√',
    type: ButtonType.FUNCTION,
    color: '#2E2E2E',
    textColor: '#FFFFFF',
    gridSpan: 1
  },
  {
    label: 'x²',
    type: ButtonType.FUNCTION,
    color: '#2E2E2E',
    textColor: '#FFFFFF',
    gridSpan: 1
  },
  {
    label: '1/x',
    type: ButtonType.FUNCTION,
    color: '#2E2E2E',
    textColor: '#FFFFFF',
    gridSpan: 1
  },
  {
    label: '⌫',
    type: ButtonType.FUNCTION,
    color: '#2E2E2E',
    textColor: '#FFFFFF',
    gridSpan: 1
  },
  {
    label: '÷',
    type: ButtonType.OPERATOR,
    color: '#FF9500',
    textColor: '#FFFFFF',
    operation: OperationType.DIVIDE,
    gridSpan: 1
  },


  {
    label: '7',
    type: ButtonType.NUMBER,
    color: '#4A4A4A',
    textColor: '#FFFFFF',
    gridSpan: 1
  },
  {
    label: '8',
    type: ButtonType.NUMBER,
    color: '#4A4A4A',
    textColor: '#FFFFFF',
    gridSpan: 1
  },
  {
    label: '9',
    type: ButtonType.NUMBER,
    color: '#4A4A4A',
    textColor: '#FFFFFF',
    gridSpan: 1
  },
  {
    label: '×',
    type: ButtonType.OPERATOR,
    color: '#FF9500',
    textColor: '#FFFFFF',
    operation: OperationType.MULTIPLY,
    gridSpan: 1
  },
  {
    label: '%',
    type: ButtonType.FUNCTION,
    color: '#2E2E2E',
    textColor: '#FFFFFF',
    gridSpan: 1
  },


  {
    label: '4',
    type: ButtonType.NUMBER,
    color: '#4A4A4A',
    textColor: '#FFFFFF',
    gridSpan: 1
  },
  {
    label: '5',
    type: ButtonType.NUMBER,
    color: '#4A4A4A',
    textColor: '#FFFFFF',
    gridSpan: 1
  },
  {
    label: '6',
    type: ButtonType.NUMBER,
    color: '#4A4A4A',
    textColor: '#FFFFFF',
    gridSpan: 1
  },
  {
    label: '−',
    type: ButtonType.OPERATOR,
    color: '#FF9500',
    textColor: '#FFFFFF',
    operation: OperationType.SUBTRACT,
    gridSpan: 1
  },
  {
    label: '+/-',
    type: ButtonType.FUNCTION,
    color: '#2E2E2E',
    textColor: '#FFFFFF',
    gridSpan: 1
  },


  {
    label: '1',
    type: ButtonType.NUMBER,
    color: '#4A4A4A',
    textColor: '#FFFFFF',
    gridSpan: 1
  },
  {
    label: '2',
    type: ButtonType.NUMBER,
    color: '#4A4A4A',
    textColor: '#FFFFFF',
    gridSpan: 1
  },
  {
    label: '3',
    type: ButtonType.NUMBER,
    color: '#4A4A4A',
    textColor: '#FFFFFF',
    gridSpan: 1
  },
  {
    label: '+',
    type: ButtonType.OPERATOR,
    color: '#FF9500',
    textColor: '#FFFFFF',
    operation: OperationType.ADD,
    gridSpan: 1
  },
  {
    label: '(',
    type: ButtonType.FUNCTION,
    color: '#2E2E2E',
    textColor: '#FFFFFF',
    gridSpan: 1
  },


  {
    label: '0',
    type: ButtonType.NUMBER,
    color: '#4A4A4A',
    textColor: '#FFFFFF',
    gridSpan: 2
  },
  {
    label: '.',
    type: ButtonType.NUMBER,
    color: '#4A4A4A',
    textColor: '#FFFFFF',
    gridSpan: 1
  },
  {
    label: '=',
    type: ButtonType.EQUAL,
    color: '#FF9500',
    textColor: '#FFFFFF',
    operation: OperationType.EQUAL,
    gridSpan: 2
  }
];