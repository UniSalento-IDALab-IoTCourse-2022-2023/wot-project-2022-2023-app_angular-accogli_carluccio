export interface ApiSiteConfigurationRegistrationDTO {
  date: string,
  activeMachineries: ApiActiveMachineryRegistrationDTO[]
}


export interface ApiActiveMachineryRegistrationDTO {
  machineryID: string,
  infoOperator: ApiInfoOperatorRegistrationDTO[] // sarebbe meglio chiamarla infoOperators, o meglio ancora operatorsAbilitated o cose cosi
}

export interface ApiInfoOperatorRegistrationDTO {
  id: string
}
