
export interface ApiStatisticsDTO {
  totalAlerts: number,
  numberOfAlertsByType: { [key: string]: number },//[ApiAlertTypeDTO, number],
  averageDurationDistanceAlarms: number,

  top3WorkersByAlarms: { [key: string]: number },
  top3MachineriesByAlarms: { [key: string]: number }
}

