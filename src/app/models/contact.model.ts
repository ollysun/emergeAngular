class Contact {
  public id: number;
  public contactType: string;
  public contactName: string;
  public contactEmail: string;
  public contactPhone: string;
  public contactFax: string;
  public billingAddressId: number;
  public notifyBySms: boolean;
  public notifyByEmail: boolean;
  public sendInvoiceByEmail: boolean;
  public $error: boolean;
  //  public mainContact: boolean;
  constructor() {
    this.notifyBySms = false;
    this.notifyByEmail = false;
    this.sendInvoiceByEmail = true;
    this.$error = false;
    //this.mainContact = true;
  }
}

export { Contact };
