export enum BankEnum {
  SOL = <any>'SOL',
  BFA = <any>'BFA',
  BAI = <any>'BAI',
  Millennium = <any>'Millennium',
  BIC = <any>'BIC',
  Atlantico = <any>'Atlantico'
}

export class Upload {
  public id: number;
  public bankName: string;
  public statementFile: any;
  public fileName: string;
  constructor() { }
}
