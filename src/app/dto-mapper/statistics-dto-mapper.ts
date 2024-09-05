import {Machinery} from "../model/machinery";
import {ApiStatisticsDTO} from "../dto/api-statistics.dto";
import {StatisticsAlerts} from "../model/statistics-alerts";
import {Worker} from "../model/worker";
import {AlertType} from "../model/alert/alert";
import {ApiAlertTypeDTO} from "../dto/api-alert.dto";
import {AlertDTOMapper} from "./alert-dto-mapper";

export class StatisticsDTOMapper {

  public static mapStatisticsDTOToStatisticsAlerts(
    machineryList: Machinery[],
    workerList: Worker[],
    statisticsDTO?: ApiStatisticsDTO
  ): StatisticsAlerts {

    if (statisticsDTO == null) { // se non ci sono statistiche per quel periodo
      // alertsNumberByType
      const alertsNumberByType = Object.values(ApiAlertTypeDTO).map(
        alertTypeDTO => {
          return {
            alert: AlertDTOMapper.mapAlertTypeDTOtoAlertType(alertTypeDTO),
            number: 0
          }
        }
      )

      return new StatisticsAlerts(
        0,
        0,
        alertsNumberByType,
        [],
        []
      )
    }

    // alertsNumberByType
    const alertsNumberByType = Object.values(ApiAlertTypeDTO).map(
      alertTypeDTO => {

        // logica per estrarre il numero da statisticsDTO.numberOfAlertsByType
        // controllo se questo alertType sta in statisticsDTO.numberOfAlertsByType
        if (alertTypeDTO in statisticsDTO.numberOfAlertsByType) {
          return {
            alert: AlertDTOMapper.mapAlertTypeDTOtoAlertType(alertTypeDTO),
            number: statisticsDTO.numberOfAlertsByType[alertTypeDTO]
          }
        }

        return {
          alert: AlertDTOMapper.mapAlertTypeDTOtoAlertType(alertTypeDTO),
          number: 0
        }
      }
    )


    // top3WorkersByAlarms
    const top3WorkersByAlarms = workerList.filter(
      worker => {
        if (statisticsDTO.top3WorkersByAlarms == null) return false
        return worker.id in statisticsDTO.top3WorkersByAlarms
      }
    ).map(
      worker => {
        return {
          worker: worker,
          number: statisticsDTO.top3WorkersByAlarms[worker.id]
        }
      }
    )

    // top3MachineriesByAlarms
    const top3MachineriesByAlarms = machineryList.filter(
      machinery => {
        if (statisticsDTO.top3MachineriesByAlarms == null) return false
        return machinery.id in statisticsDTO.top3MachineriesByAlarms
      }
    ).map(
      machinery => {
        return {
          machinery: machinery,
          number: statisticsDTO.top3MachineriesByAlarms[machinery.id]
        }
      }
    )

    return new StatisticsAlerts(
      statisticsDTO.totalAlerts,
      statisticsDTO.averageDurationDistanceAlarms,
      alertsNumberByType,
      top3WorkersByAlarms,
      top3MachineriesByAlarms
    )
  }



}
