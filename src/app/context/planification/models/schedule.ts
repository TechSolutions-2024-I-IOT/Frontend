import { DepartureSchedule } from "./departure-schedule";

export class Schedule {
  id?: number;
  date: string;
  description: string;
  departureSchedules: DepartureSchedule[];
  userId: string;
  isDeleted?: boolean;

  constructor(
    id: number = 0,
    date: string = '',
    description: string = '',
    departureSchedules: DepartureSchedule[] = [],
    userId: string = '',
    isDeleted: boolean = false
  ) {
    this.id = id;
    this.date = date;
    this.description = description;
    this.departureSchedules = departureSchedules.map(ds => new DepartureSchedule(ds.times, ds.roundNumber, ds.unitBusId));
    this.userId = userId;
    this.isDeleted = isDeleted;
  }
}
