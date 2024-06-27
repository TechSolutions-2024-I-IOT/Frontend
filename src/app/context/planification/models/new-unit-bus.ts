export class NewUnitBus {
    userId: number;
    driverId: number;
    busId: number;
    isDeleted: boolean;

    constructor(
        userId: number = 0,
        driverId: number = 0,
        busId: number = 0,
        isDeleted: boolean = false,
    ) {
        this.userId = userId;
        this.driverId = driverId;
        this.busId = busId;
        this.isDeleted = isDeleted;
    }
}