export class Product {
  public id: number;
  public code: number;
  public description: string;
  public taxId: string;
  public taxDescription: string;
  public taxPercentage: string;

  constructor() {
    this.code = Math.floor(Math.random() * 1000);
  }
}
