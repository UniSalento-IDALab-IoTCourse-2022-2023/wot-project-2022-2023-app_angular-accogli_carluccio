export interface ApiAlertDTO {
  id?: string,
  timestamp?: string,
  type?: ApiAlertTypeDTO,
  technologyID?: string,
  priority?: ApiAlertPriorityDTO,
  workerID?: string,
  machineryID?: string,
  description?: string

  // avvalorato solo se l'allarme è stato risolto
  secondsDuration?: number
}

export enum ApiAlertTypeDTO {
  GENERAL = "GENERAL",
  DISTANCE = "DISTANCE",
  DRIVER_AWAY = "DRIVER_AWAY"
}

export enum ApiAlertPriorityDTO {
  COMMUNICATION = "COMMUNICATION",
  WARNING = "WARNING",
  DANGER = "DANGER"
}
