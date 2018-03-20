import {SIM} from './sim.model';
import {ConfigData} from './config-data.model';

export class Payphone {
  constructor(
    public sim1: SIM = new SIM(), public sim2: SIM = new SIM(),
    public configData = new ConfigData(), public id?: number,
    public customer_id?: number, public balance?: number, public mac?: string,
    public serialNr?: string, public username?: string,
    public password?: string)
  { }
}
