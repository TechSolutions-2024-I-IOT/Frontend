import {Departure} from "./departure";

export interface DepartureScheduleDisplay {
  id: number;
  departure_date: string;
  bus_unit_id: number;
  shift_start: string;
  driver: string;
  bus: string;
  departures: Departure[];
}
