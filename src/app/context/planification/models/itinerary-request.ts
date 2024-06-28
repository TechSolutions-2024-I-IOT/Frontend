import {Stop} from "../models/stop";

export interface ItineraryRequest {
  startTime: string;
  endTime: string;
  stops: Stop[];
  userId: number;
}
