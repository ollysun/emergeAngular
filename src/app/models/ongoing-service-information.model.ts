import {Tariff} from './tariff.model';

export class OngoingServiceInformation {

  public originMsisdn: string;
  public destination_msisdn: string;
  public serviceStartTime: string;
  public serviceEstablishedTime: string;
  public serviceDuration: number;
  public tariff: Tariff;

  constructor() {
    this.tariff = new Tariff();
  }
}
