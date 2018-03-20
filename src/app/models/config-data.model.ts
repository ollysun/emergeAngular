import {CreditButton} from './credit-button.model';

export class ConfigData {

  public defaultLanguage: string;
  public keepAliveInterval: number;
  public sendErrorsToOCS: number;
  public preferredMSISDN: string;
  public silenceMode: boolean;
  public creditButtons: CreditButton[];

  constructor() {
    this.creditButtons = [];
  }
}
