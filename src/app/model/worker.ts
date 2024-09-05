export class Worker {
  id!: string
  name!: string
  surname!: string
  ssn!: string
  email!: string
  dateOfBirth!: string

  role!: WorkerRole

  // campi riservati solo per operatore alla guida
  generalLicence?: string
  specificLicences?: string[]


  constructor(id: string, name: string, surname: string, ssn: string, email: string, dateOfBirth: string, role: WorkerRole, generalLicence?: string, specificLicences?: string[]) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.ssn = ssn;
    this.email = email;
    this.dateOfBirth = dateOfBirth;
    this.role = role;
    this.generalLicence = generalLicence;
    this.specificLicences = specificLicences;
  }

}

export enum WorkerRole {
  Driver = "Driver",
  Pedestrian = "Pedestrian"
}
