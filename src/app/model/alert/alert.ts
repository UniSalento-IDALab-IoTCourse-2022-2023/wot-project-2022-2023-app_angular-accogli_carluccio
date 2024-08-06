export interface Alert {
  id: string
  date: string
  time: string
  type: AlertType            // General alert | Fire | Communication | ...
  priority: AlertPriority

  duration?: string
  message?: string
  subject?: string
  machine?: string
  minimumDistanceReached?: string
  safeDistance?: string



  infos: { [key: string]: string }
}
enum AlertPriority { High="High", Medium="Medium", Low="Low"}
enum AlertType { GeneralAlert="General Alert", Distance = "Distance", WorkerAway = "Worker Away" }


/*
 Used to show the alert card item. It should be a parsing of Alert interface.
 */
export interface AlertCardInterface {
  id: string
  date: string
  time: string
  type: AlertType            // General alert | Fire | Communication | ...
  priority: AlertPriority

  infos: { [key: string]: string } // All the other infos go there (key=label; description=text e.g.: "Alarm duration": "23 min")
}
