import {ApiWorkerDTO} from "../dto/api-worker.dto";
import {Worker, WorkerRole} from "../model/worker";


export class WorkerDTOMapper {
  public static mapWorkerDTOListToWorkerList(
    workerDTOList: ApiWorkerDTO[]
  ): Worker[] {

    console.log(workerDTOList)

    return workerDTOList.map( workerDTO => {
      // mapping
      const role = (workerDTO.generalLicense == null || workerDTO.specificLicences == null) ? WorkerRole.Pedestrian : WorkerRole.Driver
      console.log('dio')
      console.log(workerDTO)
      return new Worker(
        workerDTO.id,
        workerDTO.name,
        workerDTO.surname,
        workerDTO.ssn,
        workerDTO.email,
        workerDTO.dateOfBirth,
        role,
        workerDTO.generalLicense,
        workerDTO.specificLicences
      )
    });
  }

}
