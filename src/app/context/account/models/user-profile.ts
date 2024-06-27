export class UserProfile {
  id: number;
  firstName:string;
  email: string;
  lastName: string;
  photoUrl: string;
  role: string;

  constructor(
    id: number = 0,
    firstName: string= '', 
    email: string = '',
    lastName: string = '',
    photoUrl: string = '',
    role: string = ''
  ) {
    this.id = id;
    this.firstName = firstName;
    this.email = email;
    this.lastName = lastName;
    this.photoUrl = photoUrl;
    this.role = role;
  }
}
