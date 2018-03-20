export class Tariff {

  public id: number;
  public name: string;
  public modulationTypeId: number;
  public profileId: number;
  public groupId: number;
  //public zoneId: number;
  public setupCost: number;
  public initialCost: number;
  public recurrentCost: number;
  public initialDuration: string;
  public recurrentDuration: string;

  constructor() { }
}
