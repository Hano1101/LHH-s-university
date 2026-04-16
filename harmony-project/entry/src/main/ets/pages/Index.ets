import { CalculatorEngine } from '../core/CalculatorEngine';
import { ButtonConfig, OperationType } from '../model/CalculatorTypes';
import { buttonConfigs } from '../config/ButtonConfig';

@Entry
@Component
struct CalculatorApp {
  private calculator: CalculatorEngine = new CalculatorEngine();

  @State displayValue: string = '0';
  @State memoryIndicator: boolean = false;
  @State hasError: boolean = false;
  @State history: string[] = [];
  @State showHistory: boolean = false;
  @State currentOperation: string = '';

  aboutToAppear() {
    this.calculator.addListener((state) => {
      this.displayValue = state.displayValue;
      this.memoryIndicator = state.memoryValue !== 0;
      this.hasError = state.hasError;
      this.history = [...state.history];
      this.currentOperation = this.getOperationSymbol(state.operation);
    });
  }

  build() {
    Column() {

      Row({ space: 10 }) {
        Text('计算器')
          .fontSize(16)
          .fontColor('#999999')
          .layoutWeight(1)

        if (this.memoryIndicator) {
          Text('M')
            .fontSize(14)
            .fontColor('#FF9500')
            .fontWeight(FontWeight.Bold)
        }
      }
      .padding(15)
      .width('100%')


      Column({ space: 5 }) {
        if (this.history.length > 0) {
          Text(this.history[0])
            .fontSize(18)
            .fontColor('#666666')
            .textAlign(TextAlign.End)
            .width('90%')
            .maxLines(1)
        }

        Text(this.displayValue)
          .fontSize(64)
          .fontColor(this.hasError ? '#FF3B30' : '#000000')
          .textAlign(TextAlign.End)
          .width('90%')
          .maxLines(1)
          .padding({ bottom: 20 })
      }
      .height(150)
      .width('100%')
      .justifyContent(FlexAlign.End)
      .alignItems(HorizontalAlign.Center)


      this.buildButtonGrid()
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F5F5')
  }

  @Builder
  buildButtonGrid() {
    Grid() {
      ForEach(buttonConfigs, (config: ButtonConfig, index: number) => {
        GridItem() {
          Button(config.label)
            .fontSize(config.label.length > 2 ? 16 : 24)
            .fontColor(config.textColor)
            .backgroundColor(config.color)
            .borderRadius(20)
            .width('100%')
            .height('100%')
            .onClick(() => this.handleButtonClick(config))
        }
        .columnStart(this.getColumnStart(index, config))
        .columnEnd(this.getColumnEnd(index, config))
      })
    }
    .columnsTemplate('1fr 1fr 1fr 1fr 1fr')
    .rowsTemplate('1fr 1fr 1fr 1fr 1fr 1fr')
    .columnsGap(10)
    .rowsGap(10)
    .height('70%')
    .width('100%')
    .padding(10)
  }


  private getColumnStart(index: number, config: ButtonConfig): number {
    const row = Math.floor(index / 5);
    const col = index % 5;


    if (row === 5 && config.label === '0') {
      return 1;
    }
    if (row === 5 && config.label === '=') {
      return 4;
    }

    return col + 1;
  }


  private getColumnEnd(index: number, config: ButtonConfig): number {
    const row = Math.floor(index / 5);
    const col = index % 5;

    if (row === 5 && config.label === '0' && config.gridSpan === 2) {
      return 3;
    }
    if (row === 5 && config.label === '=' && config.gridSpan === 2) {
      return 5;
    }

    return col + 1;
  }


  handleButtonClick(config: ButtonConfig): void {
    if (this.hasError && config.label !== 'C') {
      return;
    }

    switch (config.label) {
      case 'C':
        this.calculator.clearAll();
        break;
      case '⌫':
        this.calculator.deleteLast();
        break;
      case '+/-':
        this.calculator.toggleSign();
        break;
      case '%':
        this.calculator.percentage();
        break;
      case '√':
        this.calculator.squareRoot();
        break;
      case 'x²':
        this.calculator.square();
        break;
      case '1/x':
        this.calculator.reciprocal();
        break;
      case '.':
        this.calculator.inputDecimal();
        break;
      case 'MC':
        this.calculator.memoryClear();
        break;
      case 'MR':
        this.calculator.memoryRecall();
        break;
      case 'M+':
        this.calculator.memoryAdd();
        break;
      case 'M-':
        this.calculator.memorySubtract();
        break;
      case '=':
        this.calculator.calculate();
        break;
      default:
      // 数字按钮
        if (config.label >= '0' && config.label <= '9') {
          this.calculator.inputDigit(config.label);
        }
        // 操作符按钮
        else if (['+', '−', '×', '÷'].includes(config.label)) {
          const operation = this.getOperationFromSymbol(config.label);
          if (operation) {
            this.calculator.setOperation(operation);
          }
        }
        break;
    }
  }


  private getOperationFromSymbol(symbol: string): OperationType | null {
    switch (symbol) {
      case '+': return OperationType.ADD;
      case '−': return OperationType.SUBTRACT;
      case '×': return OperationType.MULTIPLY;
      case '÷': return OperationType.DIVIDE;
      default: return null;
    }
  }


  private getOperationSymbol(operation: OperationType): string {
    switch (operation) {
      case OperationType.ADD: return '+';
      case OperationType.SUBTRACT: return '−';
      case OperationType.MULTIPLY: return '×';
      case OperationType.DIVIDE: return '÷';
      default: return '';
    }
  }
}