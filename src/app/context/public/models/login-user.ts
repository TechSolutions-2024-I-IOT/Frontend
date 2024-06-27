export class LoginUser {
    userEmail: string;
    userPassword: string;

    constructor(userName: string, password: string) {
        this.userEmail = userName;
        this.userPassword = password;
    }
}