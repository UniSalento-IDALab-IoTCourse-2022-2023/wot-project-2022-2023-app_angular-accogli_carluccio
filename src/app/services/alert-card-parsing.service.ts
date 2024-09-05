import {Injectable} from '@angular/core';
import {Alert, AlertType} from "../model/alert/alert";
import {AlertCardInterface} from "../model/alert/alertCardInterface";
import {TimeHelper} from "../helpers/time-helper";

@Injectable({
  providedIn: 'root'
})
export class AlertCardParsingService {

  constructor() { }

  parseToAlertCardInterface(alert: Alert): AlertCardInterface {

    const secondsDuration: string | undefined =
      alert.type != AlertType.Distance ? undefined :
        alert.secondsDuration == undefined ? "Ongoing" :
          TimeHelper.formatSeconds(alert.secondsDuration)

    const alertCardInterface: AlertCardInterface = {
      id: alert.id!,
      date: TimeHelper.formatTimestamp(alert.timestamp!),
      duration: secondsDuration,
      type: alert.type!,
      priority: alert.priority!,

      infos: {},
    }

    const infos: { [key: string]: string } = {}//alert.infos // nel caso ci siano info aggiuntive presenti in Alert



    // Null se non bisogna nemmeno mostrarlo
    // Undefined se esiste ma non si è riuscito ad associare
    if (alert.worker !== undefined && alert.worker !== null) {
      infos["Subject"] = alert.worker.name + " " + alert.worker.surname
    } else if (alert.worker !== null) {
      infos["Subject"] = "Unknown"
    }

    if (alert.machinery !== undefined && alert.machinery !== null) {
      infos["Machinery"] = alert.machinery.name
    } else if (alert.machinery !== null) {
      infos["Machinery"] = "Unknown"
    }

    if (alert.type == AlertType.General) {
      infos["Message"] = alert.message!
    }

    /*
    if(alert.message != null) {
      infos["Message"] = alert.message
    }
    if(alert.subject != null) {
      infos["Subject"] = alert.subject
    }
    if(alert.machinery != null) {
      infos["Machinery"] = alert.machinery
    }
    if(alert.minimumDistanceReached != null) {
      infos["Minimum distance reached"] = alert.minimumDistanceReached
    }
    if(alert.safeDistance != null) {
      infos["Distance"] = alert.safeDistance
    }*/


    alertCardInterface.infos = infos

    return alertCardInterface

  }

}
