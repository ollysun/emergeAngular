export class Country {
  name: string;
  code: string;
  constructor(name?: string, code?: string) {
    this.name = name || this.name;
    this.code = code || this.code;
  }
}
