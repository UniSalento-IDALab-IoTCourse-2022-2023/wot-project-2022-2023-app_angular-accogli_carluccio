import {Alert} from "./alert/alert";

export interface Vehicle {
  id: String,
  name: String,
  drivingLicence: String,
  dimensions: String,
  maximumLoad: String,
  operativeSpeed: String,
  state: VehicleState,

  beacons: String[],
  alertsFromLastWeek: Alert[]


}

export enum VehicleState {
  Active = "Active",
  ToConfigure = "To configure",
  Inactive = "Inactive"
}
