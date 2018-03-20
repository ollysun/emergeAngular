import {SIM} from './sim.model';
import {ConfigData} from './config-data.model';
import {Application} from './application.model';
import {Status} from './status.model';
import {Equipment} from './equipment.model';

export class PayphoneDevice {

  public id: number;
  public creation_date: string;
  public modification_date: string;

  public sim1: SIM;
  public sim2: SIM;
  public configData: ConfigData;
  public application: Application;
  public status: Status;
  public equipment: Equipment;

  constructor() {
    this.sim1 = new SIM();
    this.sim2 = new SIM();
    this.configData = new ConfigData();
    this.application = new Application();
    this.status = new Status();
    this.equipment = new Equipment();
  }
}
