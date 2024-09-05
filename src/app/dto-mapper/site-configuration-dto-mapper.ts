import {MachineryType} from "../model/machinery-type";
import {Worker} from "../model/worker";
import {ApiSiteConfigurationDTO} from "../dto/api-site-configuration.dto";
import {Machinery} from "../model/machinery";
import {MachinerySelection} from "../model/machinery-selection";
import {
  ApiActiveMachineryRegistrationDTO, ApiInfoOperatorRegistrationDTO,
  ApiSiteConfigurationRegistrationDTO
} from "../dto/api-site-configuration-registration.dto";


export class SiteConfigurationDTOMapper {
  public static mapSiteConfigurationDTOToMachinerySelection(
    siteConfigurationDTO: ApiSiteConfigurationDTO,
    machineryList: Machinery[],
    machineryTypeList: MachineryType[],
    workerList: Worker[]
  ): MachinerySelection[] {


    // mappo i macchinari attivi dell'ultima configurazione
    const activeMachineries: MachinerySelection[] = siteConfigurationDTO.activeMachineries.map(
      activeMachineryDTO => {


        const machinery = machineryList.find(it => it.id == activeMachineryDTO.machineryID)!


        // selected drivers
        const selectedDriversSet = new Set(activeMachineryDTO.infoOperator.map(it => it.id)) // usata per avvalorare selectedDrivers
        const selectedDrivers: Worker[] = workerList.filter(
          worker => {
            return selectedDriversSet.has(worker.id)
          }
        )

        // available drivers (lista degli operatori abilitati a guidare, e che non sono presenti in selectedDrivers)
        const availableDriversUnfiltered = this.getEligibleDrivers(machinery, workerList)
        const availableDrivers = availableDriversUnfiltered.filter(
          worker => {
            return !selectedDriversSet.has(worker.id)
          }
        )

        return new MachinerySelection(machinery, selectedDrivers, availableDrivers)

      }

    )


    // mappo i macchinari non attivi dell'ultima configurazione
    const activeMachineriesSet = new Set(activeMachineries.map(it => it.id))
    const inactiveMachineries: MachinerySelection[] = machineryList.filter(
      machinery => {
        return !activeMachineriesSet.has(machinery.id)
      }
    ).map(
      machinery => {

        // vedo quali sono gli operatori abilitati a guidare questo macchinario
        const availableDrivers = this.getEligibleDrivers(machinery, workerList)

        return new MachinerySelection(machinery, [], availableDrivers)
      }
    )


    // unisco macchinari attivi con inattivi e restituisco
    return [...activeMachineries, ...inactiveMachineries]
  }

  private static isEligibleDriver(worker: Worker, machinery: Machinery): boolean {
    // logica di filtraggio

    if (machinery.type.requiredSpecificLicence) {
      // restituisco true se ha quella licenza specifica
      if (worker.specificLicences == null) return false
      return worker.specificLicences.find(licence => licence == machinery.type.name) !== undefined
    }

    // restituisco true se ha patente pari o superiore alla patente generica richiesta
    if (worker.generalLicence == undefined) return false
    switch (machinery.type.generalLicence) {
      case 'A1': return (worker.generalLicence == "A1" || worker.generalLicence == "B" || worker.generalLicence == "C")
      case 'B': return (worker.generalLicence == "B" || worker.generalLicence == "C")
      case 'C': return worker.generalLicence == "C"
      default: return false
    }
  }

  private static getEligibleDrivers(machinery: Machinery, workerList: Worker[]): Worker[] {

    return workerList.filter(
      worker => {
        return this.isEligibleDriver(worker, machinery)
      }
    )
  }

  static mapMachinerySelectionListToSiteConfigurationRegistrationDTO(machinerySelectionList: MachinerySelection[]): ApiSiteConfigurationRegistrationDTO {

    const date = this.getTodayDate()
    const activeMachineryRegistrationDTOList: ApiActiveMachineryRegistrationDTO[] = machinerySelectionList.filter(
      machinerySelection => {
        return machinerySelection.selectedDrivers.length != 0
      }
    ).map(
      machinerySelection => {
        const selectedDriverListDTO: ApiInfoOperatorRegistrationDTO[] = machinerySelection.selectedDrivers.map(
          selectedDriver => { return {id: selectedDriver.id} }
        )

        const machineryRegistrationDTO = {
          machineryID: machinerySelection.id,
          infoOperator: selectedDriverListDTO
        }

        return machineryRegistrationDTO
      }
    )

    return {
      date: date,
      activeMachineries: activeMachineryRegistrationDTOList
    }

  }
  private static getTodayDate(): string {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // I mesi partono da 0
    const day = String(today.getDate()).padStart(2, '0');        // I giorni partono da 1

    return `${year}-${month}-${day}`;
  }
}
