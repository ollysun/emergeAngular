export class CreditButton {

  public label: string;
  public amount: number;

  constructor(suppliedLabel?: string, suppliedAmount?: number){
    this.label = suppliedLabel;
    this.amount = suppliedAmount;
  }
}
