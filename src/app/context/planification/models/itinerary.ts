import {Stop} from "../models/stop";

export class ItineraryResource {
    id: number;
    startTime: string;
    endTime: string;
    stops: Stop[];
    userId: number;

    constructor(id:number,startTime: string, endTime: string, stops: Stop[], userId: number) {
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.stops = stops;
        this.userId = userId;
    }

}