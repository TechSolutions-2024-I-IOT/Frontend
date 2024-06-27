import { Driver } from './driver';
import { Bus } from './bus';
export class BusUnit {
  id: number;
  driver: Driver;
  bus: Bus;
  user: number;
  isDeleted: boolean;

  constructor(
    id: number = 0,
    driver: Driver = new Driver(),
    bus: Bus = new Bus(),
    user: number = 0,
    isDeleted: boolean = false,
  ) {
    this.id = id;
    this.driver = driver;
    this.bus = bus;
    this.user = user;
    this.isDeleted = isDeleted;
  }
}
