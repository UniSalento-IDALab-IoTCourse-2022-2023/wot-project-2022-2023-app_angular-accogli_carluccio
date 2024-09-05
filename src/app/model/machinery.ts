import {Alert} from "./alert/alert";
import {MachineryType} from "./machinery-type";

/*
export interface Machinery {
  id: String,
  name: String,
  drivingLicence: String,
  dimensions: String,
  maximumLoad: String,
  operativeSpeed: String,
  state: MachineryState,

  beacons: String[],
  alertsFromLastWeek: Alert[]
}*/


export enum MachineryState {
  ACTIVE = "Active",
  TO_CONFIGURE = "To Configure",
  INACTIVE = "Inactive"
}


export class Machinery {
  id: string
  name: string
  type: MachineryType
  state: MachineryState
  beaconsAssociated: Beacon[]
  plate: MachineryPlate
  spec: MachinerySpecifications
  board_macBLE: string
  isRemote: boolean


  constructor(id: string, name: string, type: MachineryType, state: MachineryState, beaconsAssociated: Beacon[], plate: MachineryPlate, spec: MachinerySpecifications, board_macBLE: string, isRemote: boolean) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.state = state;
    this.beaconsAssociated = beaconsAssociated;
    this.plate = plate;
    this.spec = spec;
    this.board_macBLE = board_macBLE;
    this.isRemote = isRemote;
  }

  getRequiredLicence() {
    return this.type.generalLicence
  }
}

export interface Beacon {
  id: string,
  position: string,
  macAddress: string,
  safetyDistance: number
}
export interface MachineryPlate {
  yearOfManufacture: number,
  manufacturerName: string,
  serialNumber: string,
  model: string
}

export interface MachinerySpecifications {
  operatingSpeed: number,
  mass: number,
  dimensions: string
}
