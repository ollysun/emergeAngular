export class ContractPrepaid {
  public contractId: number;
  public startDate: Date;
  public statusDate: Date;
  public endDate: Date;
  public automaticRenewal: any;
  public customerId: number;
  public serviceType: string;
  public status: string;
  public servicePrepaid: number;
  public content: string;
  constructor() {
    this.automaticRenewal = false;
  }
}
