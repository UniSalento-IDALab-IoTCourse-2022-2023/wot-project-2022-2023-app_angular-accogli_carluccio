import {ApiAlertDTO, ApiAlertPriorityDTO, ApiAlertTypeDTO} from "../dto/api-alert.dto";
import {Alert, AlertPriority, AlertType} from "../model/alert/alert";
import {Worker} from "../model/worker";
import {Machinery} from "../model/machinery";

export class AlertDTOMapper {
  public static mapAlertDTOList(
    alertDTOList: ApiAlertDTO[],
    machineryList: Machinery[],
    workerList: Worker[]
  ): Alert[] {

    return alertDTOList.map( alertDTO => {

      var machinery: Machinery | undefined | null = null
      var worker: Worker | undefined | null = null

      if (alertDTO.machineryID != null)
        machinery = machineryList.find(machinery => machinery.id == alertDTO.machineryID)

      if (alertDTO.workerID != null)
        worker = workerList.find(worker => worker.id == alertDTO.workerID)



      return new Alert(
        alertDTO.id,
        alertDTO.timestamp,
        this.mapAlertTypeDTOtoAlertType(alertDTO.type),
        alertDTO.technologyID,
        this.mapAlertPriorityDTOtoAlertPriority(alertDTO.priority),
        worker,
        machinery,
        alertDTO.secondsDuration
      )
    }
    )
  }

  private static mapAlertTypeDTOtoAlertType(alertTypeDTO: ApiAlertTypeDTO): AlertType {
    switch (alertTypeDTO) {
      case ApiAlertTypeDTO.GENERAL:
        return AlertType.General;
      case ApiAlertTypeDTO.DRIVER_AWAY:
        return AlertType.DriverAway;
      case ApiAlertTypeDTO.DISTANCE:
        return AlertType.Distance;
    }
  }

  private static mapAlertPriorityDTOtoAlertPriority(alertPriorityDTO: ApiAlertPriorityDTO): AlertPriority {
    switch (alertPriorityDTO) {
      case ApiAlertPriorityDTO.DANGER:
        return AlertPriority.DANGER;
      case ApiAlertPriorityDTO.WARNING:
        return AlertPriority.WARNING;
      case ApiAlertPriorityDTO.COMMUNICATION:
        return AlertPriority.COMMUNICATION;
    }
  }
}
