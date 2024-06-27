export class Driver {
  id: number;
  photoUrl: string;
  firstName: string;
  lastName: string;
  dni: string;
  driverLicenseNumber: string;
  phoneNumber: string;
  email: string;
  user: number;
  isDeleted: boolean;

  constructor(
    id: number = 0,
    firstName: string = '',
    lastName: string = '',
    dni: string = '',
    driverLicenseNumber: string = '',
    photoUrl: string = '',
    phoneNumber: string = '',
    email: string = '',
    user: number =0,
    isDeleted: boolean = false,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.driverLicenseNumber = driverLicenseNumber;
    this.dni = dni;
    this.photoUrl = photoUrl;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.user = user;
    this.isDeleted = isDeleted;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  static fromJson(json: any): Driver {
    return new Driver(
      json.id,
      json.firstName,
      json.lastName,
      json.driverLicenseNumber,
      json.dni,
      json.photoUrl,
      json.phoneNumber,
      json.email,
      json.user,
      json.isDeleted,
    );
  }
}
