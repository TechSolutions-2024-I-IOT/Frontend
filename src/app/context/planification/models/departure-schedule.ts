export class  DepartureSchedule {
  times: string[];
  roundNumber: number;
  unitBusId: number;

  constructor(
    times: string[] = [],
    roundNumber: number = 0,
    unitBusId: number = 0
  ) {
    this.times = times;
    this.roundNumber = roundNumber;
    this.unitBusId = unitBusId;
  }
}
