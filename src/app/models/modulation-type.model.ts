enum PeriodEnum {
  PEAK,
  OFF_PEAK
};

class ModulationType {
  id: number;
  name: string = PeriodEnum.PEAK.toString();
  constructor(id?: number, name?: string) {
    this.id = id;
    this.name = name;
  }
}

export {ModulationType, PeriodEnum}
