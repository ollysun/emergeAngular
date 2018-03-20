import { ProductPostpaid } from './postpaid.model'

export class ContractPostpaid {
  public contractId: number;
  public startDate: Date;
  public endDate: Date;
  public automaticRenewal: boolean;
  public customerId: string;
  public content: string;
  public contractSubtype: string;
  public status: string;
  public allowJointBilling: boolean;
  public billingPeriod: string;
  public billingDay: number;
  public services: ProductPostpaid;
  public creationDate: Date;
  public modificationDate: Date;
  public statusDate: Date;
  public productPostpaidId: number;

  constructor() {
    this.services = new ProductPostpaid();
    this.startDate = new Date();
    this.endDate = new Date();
    this.creationDate = new Date();
    this.modificationDate = new Date();
    this.statusDate = new Date();
  }
}
