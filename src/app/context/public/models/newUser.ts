export class newUser {
    email:string;
    password: string;
    role: string;

    constructor(
      email: string= '', 
      password: string = '', 
      role: string = ''
    ) {
        this.email = email;
        this.password = password;
        this.role = role;
    }
    
}