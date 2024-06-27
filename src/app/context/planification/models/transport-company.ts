export class TransportCompany{
    id: number;
    name: string;
    busImageUrl: string;
    logoImageUrl: string;
    description: string;
    
    constructor(
        id: number = 0,
        name: string = '',
        busImageUrl: string = '',
        logoImageUrl: string = '',
        description: string = '',
    ) {
        this.id = id;
        this.name = name;
        this.busImageUrl = busImageUrl;
        this.logoImageUrl = logoImageUrl;
        this.description = description;
    }
    
}