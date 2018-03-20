import { Prefix } from './prefix.model';

export class Zone {

  public id: number;
  public name: string;
  public description: string;
  public groupId: number;
  public prefixes: Prefix[];

  constructor() {

  }
}
