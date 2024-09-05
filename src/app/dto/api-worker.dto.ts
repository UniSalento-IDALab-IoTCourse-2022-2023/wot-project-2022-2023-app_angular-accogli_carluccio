export interface ApiWorkerDTO {
  id: string,
  name: string,
  surname: string,
  ssn: string,
  email: string,
  dateOfBirth: string,

  // campi riservati solo per operatore alla guida
  generalLicence?: string,
  specificLicences?: string[]


  type?: string // avvalorato solo durante registrazione utente (POST). in get non arriva mai
}
