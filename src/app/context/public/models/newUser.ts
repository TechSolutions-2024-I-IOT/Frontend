export class newUser {
    firstName: string;
    lastName: string;
    email:string;
    password: string;
    role: string;

    constructor(
      firstName: string = '',
      lastName: string = '',
      email: string= '', 
      password: string = '', 
      role: string = ''
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
    }
    
}