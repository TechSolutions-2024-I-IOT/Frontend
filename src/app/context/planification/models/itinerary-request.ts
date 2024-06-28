import {Stop} from "../../../../../../../Desktop/Frontend/src/app/context/planification/models/stop";

export interface ItineraryRequest {
  startTime: string;
  endTime: string;
  stops: Stop[];
  user: number;
}
