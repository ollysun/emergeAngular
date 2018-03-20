import { SIM } from './sim.model';
import { ConfigData } from './config-data.model';
import { Status } from './status.model';
import { Credentials } from './credentials.model';

export class PayphoneService {

  public id: number;
  public payphoneDeviceId: number;
  public sim1: SIM;
  public sim2: SIM;
  public customerId: number;
  public contractId: number;
  public profileId: number;
  public balance: number;
  public status: Status;
  public creationDate: string;
  public modificationDate: string;
  public credentials: Credentials;
  public configData: ConfigData;
  public $error: boolean;

  constructor() {
    this.sim1 = new SIM();
    this.sim2 = new SIM();
    this.status = new Status();
    this.$error = false;
    this.credentials = new Credentials();
    this.configData = new ConfigData();
  }
}
