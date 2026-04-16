import { ButtonConfig } from '../model/CalculatorTypes';

@Component
export struct CalculatorButton {
  @Prop config: ButtonConfig;
  @Prop disabled: boolean = false;


  @Prop onButtonClick?: (config: ButtonConfig) => void;

  build() {
    Button(this.config.label, { type: ButtonType.Normal })
      .backgroundColor(this.config.color)
      .borderRadius(20)
      .fontSize(this.getFontSize())
      .fontColor(this.config.textColor)
      .fontWeight(FontWeight.Medium)
      .width('100%')
      .height('100%')
      .opacity(this.disabled ? 0.5 : 1)
      .onClick(() => {
        if (!this.disabled && this.onButtonClick) {
          this.onButtonClick(this.config);
        }
      })
      .stateEffect(true)
  }

  private getFontSize(): number {
    return this.config.label.length > 2 ? 16 : 24;
  }
}