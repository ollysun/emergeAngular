import { Contact } from './contact.model';

class CustomerAddress {
  public id: number;
  public customerAddressId: number;
  public customerId: number;
  public addressName: string;
  public address: string;
  public faxNumber: string;
  public telephoneNumber: string;
  public email: string;
  public contacts: Contact[];
  constructor(customerid?: number) {
    this.customerId = customerid;
    this.address = null;
    this.addressName = null;
    this.faxNumber = null;
    this.telephoneNumber = null;
    this.email = null;
    this.contacts = [];
  }

}

export {CustomerAddress};
