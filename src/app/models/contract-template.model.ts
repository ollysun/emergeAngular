export enum ContractTypeEnum {
  PREPAID = <any>'PREPAID',
  POSTPAID = <any>'POSTPAID'
}

export class ContractTemplate {
  public name: string;
  public description: string;
  public contractTemplateId: number;
  public creationDate: Date;
  public modificationDate: Date;
  public content: string;
  public contractType: string
  public createdBy: string;

  constructor() {
    this.creationDate = new Date();
    this.modificationDate = new Date();
  }
}
