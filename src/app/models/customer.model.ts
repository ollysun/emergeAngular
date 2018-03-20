import { Contact } from './contact.model';
import { CustomerAddress } from './customer-address.model';
import { ContractPrepaid } from './contract-prepaid.model';

enum StatusEnum {
  INACTIVE = <any>'INACTIVE',
  DISABLED = <any>'DISABLED',
  ACTIVE = <any>'ACTIVE',
  FROZEN = <any>'FROZEN',
  CANCELLED = <any>'CANCELLED',
  NEW = <any>'NEW'
}

class Customer {
  public id: number;
  public status: StatusEnum;
  public name: string;
  public fiscalNumber: string;
  public taxExemptionCertificates: string;
  public country: string;
  public website: string;
  public privateNotes: string;
  public publicNotes: string;
  public customerAddresses: CustomerAddress[];
  public tags: string;
  public creationDate: string;
  public email: string;
  public phoneNUmber: string;
  public contractPrepaids: ContractPrepaid[];
  constructor() {
    this.country = null;
    this.status = StatusEnum.INACTIVE;
    this.customerAddresses = [];
    this.contractPrepaids = [];
  }
}

export { StatusEnum, Customer };
