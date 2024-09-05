import {ApiWorkerDTO} from "../dto/api-worker.dto";
import {Worker, WorkerRole} from "../model/worker";


export class WorkerDTOMapper {
  public static mapWorkerDTOListToWorkerList(
    workerDTOList: ApiWorkerDTO[]
  ): Worker[] {

    console.log(workerDTOList)

    return workerDTOList.map( workerDTO => {
      return this.mapWorkerDTOToWorker(workerDTO)
    })
  }
  public static mapWorkerDTOToWorker(
    workerDTO: ApiWorkerDTO
  ): Worker {

      // mapping
      const role = (workerDTO.generalLicence == null || workerDTO.specificLicences == null) ? WorkerRole.Pedestrian : WorkerRole.Driver

      return new Worker(
        workerDTO.id,
        workerDTO.name,
        workerDTO.surname,
        workerDTO.ssn,
        workerDTO.email,
        workerDTO.dateOfBirth,
        role,
        workerDTO.generalLicence,
        workerDTO.specificLicences
      )
  }

  public static mapWorkerToWorkerDTO(
    worker: Worker
  ): ApiWorkerDTO {

    // mapping
    console.log(worker)

    return {
      id: worker.id,
      name: worker.name,
      surname: worker.surname,
      ssn: worker.ssn,
      email: worker.email,
      dateOfBirth: worker.dateOfBirth,

      type: worker.role == WorkerRole.Driver ? "EQUIPMENT_OPERATOR" : "GROUND_WORKER",

      generalLicence: worker.role == WorkerRole.Driver ? worker.generalLicence : undefined,
      specificLicences: worker.role == WorkerRole.Driver ? worker.specificLicences : undefined
    }
  }

}
