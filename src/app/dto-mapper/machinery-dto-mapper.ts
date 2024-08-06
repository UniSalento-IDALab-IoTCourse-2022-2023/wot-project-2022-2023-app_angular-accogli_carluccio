import {
  ApiBeaconDTO,
  ApiMachineryDTO,
  ApiMachineryPlateDTO,
  ApiMachinerySpecificationsDTO,
  ApiMachineryStateDTO
} from "../dto/api-machinery.dto";
import {ApiMachineryTypeDTO} from "../dto/api-machinery-type.dto";
import {Beacon, Machinery, MachineryPlate, MachinerySpecifications, MachineryState} from "../model/machinery";
import {MachineryType} from "../model/machinery-type";

export class MachineryDTOMapper {
  public static mapMachineryDTOListToMachineryList(
    machineryDTOList: ApiMachineryDTO[],
    typeDTOList: ApiMachineryTypeDTO[]
  ): Machinery[] {

    return machineryDTOList.map( machineryDTO => {
      // mapping
      const typeDTO = typeDTOList.find(type => machineryDTO.typeName == type.name)
      if (typeDTO == undefined) {
        throw "machinery type undefined"
      }

      const type: MachineryType = {
        id: typeDTO.id,
        name: typeDTO.name,
        description: typeDTO.description,
        generalLicence: typeDTO.generalLicence,
        requiredSpecificLicence: typeDTO.requiredSpecificLicence
      }
      const state: MachineryState = this.mapStateDTOtoState(machineryDTO.state)
      const beacons: Beacon[] = this.mapBeaconsDTOtoBeacons(machineryDTO.beaconsAssociated)
      const plate: MachineryPlate = this.mapMachineryPlateDTOtoMachineryPlate(machineryDTO.plate)
      const spec: MachinerySpecifications = this.mapMachinerySpecDTOToMachinerySpec(machineryDTO.spec)


      return new Machinery(
        machineryDTO.id,
        machineryDTO.name,
        type,
        state,
        beacons,
        plate,
        spec,
        machineryDTO.board_macBLE,
        machineryDTO.isRemote)
    });
  }

  static mapMachineryTypeDTOList(machineryTypeDTOList: ApiMachineryTypeDTO[]): MachineryType[] {

    return machineryTypeDTOList.map( machineryTypeDTO => {
      // mapping
      return {
        id: machineryTypeDTO.id,
        name: machineryTypeDTO.name,
        description: machineryTypeDTO.description,
        generalLicence: machineryTypeDTO.generalLicence,
        requiredSpecificLicence: machineryTypeDTO.requiredSpecificLicence
      }
    })
  }

  private static mapStateDTOtoState(machineryStateDTO: ApiMachineryStateDTO) {
    switch (machineryStateDTO) {
      case ApiMachineryStateDTO.ACTIVE:
        return MachineryState.ACTIVE;
      case ApiMachineryStateDTO.INACTIVE:
        return MachineryState.INACTIVE;
      case ApiMachineryStateDTO.TO_CONFIGURE:
        return MachineryState.TO_CONFIGURE;
    }
  }
  private static mapBeaconsDTOtoBeacons(machineryBeaconsDTO: ApiBeaconDTO[]): Beacon[] {
    return machineryBeaconsDTO.map( beaconDTO => {
      return {
        id: beaconDTO.id,
        position: beaconDTO.position,
        macAddress: beaconDTO.macAddress,
        safetyDistance: beaconDTO.safetyDistance
      }
    })
  }
  private static mapMachineryPlateDTOtoMachineryPlate(machineryPlateDTO: ApiMachineryPlateDTO): MachineryPlate {
    return {
      yearOfManufacture: machineryPlateDTO.yearOfManufacture,
      manufacturerName: machineryPlateDTO.manufacturerName,
      serialNumber: machineryPlateDTO.serialNumber,
      model: machineryPlateDTO.model
    }
  }


  private static mapMachinerySpecDTOToMachinerySpec(spec: ApiMachinerySpecificationsDTO): MachinerySpecifications {
    return {
      dimensions: spec.dimensions,
      mass: spec.mass,
      operatingSpeed: spec.operatingSpeed
    }
  }


}
