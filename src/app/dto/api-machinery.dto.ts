export interface ApiMachineryDTO {
  id: string,
  name: string,
  typeName: string,
  state: ApiMachineryStateDTO,
  beaconsAssociated: ApiBeaconDTO[],
  plate: ApiMachineryPlateDTO,
  spec: ApiMachinerySpecificationsDTO,
  board_macBLE: string,
  isRemote: boolean
}

export enum ApiMachineryStateDTO {
  ACTIVE = "ACTIVE",
  TO_CONFIGURE = "TO_CONFIGURE",
  INACTIVE = "INACTIVE"
}

export interface ApiBeaconDTO {
  id: string,
  position: string,
  macAddress: string,
  safetyDistance: number
}
export interface ApiMachineryPlateDTO {
  yearOfManufacture: number,
  manufacturerName: string,
  serialNumber: string,
  model: string
}

export interface ApiMachinerySpecificationsDTO {
  operatingSpeed: number,
  mass: number,
  dimensions: string
}
