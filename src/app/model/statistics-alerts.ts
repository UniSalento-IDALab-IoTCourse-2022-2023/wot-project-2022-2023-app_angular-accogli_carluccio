import {AlertType} from "./alert/alert";
import {Machinery} from "./machinery";
import {Worker} from "./worker";

export class StatisticsAlerts {
  totalAlerts: number
  averageDurationDistanceAlarms: number

  alertsNumberByType: {alert: AlertType, number: number}[]

  top3WorkersByAlarms: {worker: Worker, number: number}[]
  top3MachineriesByAlarms: {machinery: Machinery, number: number}[]


  constructor(totalAlerts: number, averageDurationDistanceAlarms: number, alertsNumberByType: {alert: AlertType, number: number}[], top3WorkersByAlarms: {worker: Worker, number: number}[], top3MachineriesByAlarms: {machinery: Machinery, number: number}[]) {
    this.totalAlerts = totalAlerts;
    this.averageDurationDistanceAlarms = averageDurationDistanceAlarms;
    this.alertsNumberByType = alertsNumberByType;
    this.top3WorkersByAlarms = top3WorkersByAlarms;
    this.top3MachineriesByAlarms = top3MachineriesByAlarms;
  }

}
