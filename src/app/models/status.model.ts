enum StatusEnum {
    INACTIVE = <any> 'INACTIVE',
    READY = <any> 'READY',
    ACTIVE = <any> 'ACTIVE',
    DELETED = <any> 'DELETED',
}

class Status {
  public status: StatusEnum;
  public statusDate: string;

  constructor(status?: StatusEnum) {
    this.status = status || StatusEnum.INACTIVE;
    const date = new Date();
    this.statusDate =
      `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  }
}

export { Status, StatusEnum };
