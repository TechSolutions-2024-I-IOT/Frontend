export class JwtDTO {
    user_id: number;
    access_token: string;
    refresh_token: string;

    constructor(user_id: number, access_token: string, refresh_token: string){
        this.user_id = user_id;
        this.access_token = access_token;
        this.refresh_token = refresh_token;
    }
}