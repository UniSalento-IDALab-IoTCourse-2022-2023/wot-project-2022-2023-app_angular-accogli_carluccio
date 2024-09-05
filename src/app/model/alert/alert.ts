import {ApiAlertPriorityDTO, ApiAlertTypeDTO} from "../../dto/api-alert.dto";
import {Worker} from "../worker";
import {Machinery} from "../machinery";

export class Alert {

  id?: string
  timestamp?: string
  type?: AlertType // General alert | Fire | Communication | ...
  technology?: string
  priority?: AlertPriority
  worker?: Worker | undefined | null
  machinery?: Machinery | undefined | null

  message?: string

  // avvalorato solo se l'allarme è stato risolto. Nota che è avvalorato solo se il type è "Distance"! Negli altri tipi non esiste questo campo!
  secondsDuration?: number


  constructor(id?: string, timestamp?: string, type?: AlertType, technology?: string, priority?: AlertPriority, worker?: Worker | undefined | null, machinery?: Machinery | undefined | null, secondsDuration?: number, message?: string) {
    this.id = id;
    this.timestamp = timestamp;
    this.type = type;
    this.technology = technology;
    this.priority = priority;
    this.worker = worker;
    this.machinery = machinery;
    this.secondsDuration = secondsDuration
    this.message = message
  }




  /* tenuti per implementare alertcazzi
  duration?: string
  message?: string
  subject?: string
  machinery?: string
  minimumDistanceReached?: string
  safeDistance?: string


  infos: { [key: string]: string }*/

  isTodayAlert (): boolean {
    const date = new Date(this.timestamp!);
    const today = new Date();

    // Controlla se l'anno, il mese e il giorno del timestamp sono uguali a quelli di oggi
    return date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate();
  }
}

export enum AlertType {
  General ="General",
  Distance = "Distance",
  DriverAway = "Driver Away"
}

export enum AlertPriority {
  COMMUNICATION = "Communication",
  WARNING = "Warning",
  DANGER = "Danger"
}
