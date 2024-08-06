export interface ApiSiteConfigurationDTO {
  id: string,
  date: string,
  activeMachineries: ApiActiveMachineryDTO[],
}


export interface ApiActiveMachineryDTO {
  machineryID: string,
  machineryName: string,
  machineryTypeID: string,
  machineryType: string,
  machineryLicenceRequired: string,
  infoOperator: ApiInfoOperatorDTO[] // sarebbe meglio chiamarla infoOperators, o meglio ancora operatorsAbilitated o cose cosi

}

export interface ApiInfoOperatorDTO {
  id: string,
  fullName: string
}
