/*
 Used to show the alert card item. It should be a parsing of Alert interface.
 */
import {AlertPriority, AlertType} from "./alert";

export interface AlertCardInterface {
  id: string
  date: string
  duration?: string
  type: AlertType            // General alert | Fire | Communication | ...
  priority: AlertPriority

  infos: { [key: string]: string } // All the other infos go there (key=label; description=text e.g.: "Alarm duration": "23 min")
}
