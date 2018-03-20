import { Product } from './product.model';
import { PayphoneService } from './payphone-service.model';

enum StatusEnum {
  READY = <any>'READY',
  ACTIVE = <any>'ACTIVE',
  DELETED = <any>'DELETED'
}

enum ServiceTypeEnum {
  PSP = <any>'PSP',
  TEC = <any>'TEC',
  TELOAGENT = <any>'TELOAGENT',
  TELOOPERATOR = <any>'TELOOPERATOR'
}

class ServicePrepaid {
  public name: string;
  public externalProvisionId: string;
  public status: string;
  public serviceType: string;
  public deletedReason: string;
  public productId: number;
  public id: number;
  public isLegacy: boolean;
  public servicePrepaidId: number;
  public balance: number;
  public payphoneService: PayphoneService;
  constructor() {
    this.balance = 0.0;
    this.isLegacy = false;
  }
}

export { ServiceTypeEnum, ServicePrepaid, StatusEnum }
