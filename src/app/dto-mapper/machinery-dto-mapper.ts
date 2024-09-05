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
import {ApiMachineryRegistrationDTO} from "../dto/api-machinery-registration.dto";

export class MachineryDTOMapper {
  public static mapMachineryDTOListToMachineryList(
    machineryDTOList: ApiMachineryDTO[],
    typeDTOList: ApiMachineryTypeDTO[]
  ): Machinery[] {

    return machineryDTOList.map( machineryDTO => {
      // mapping
      return this.mapMachineryDTOToMachinery(machineryDTO, typeDTOList)
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


  private static mapMachinerySpecDTOtoMachinerySpec(spec: ApiMachinerySpecificationsDTO): MachinerySpecifications {
    return {
      dimensions: spec.dimensions,
      mass: spec.mass,
      operatingSpeed: spec.operatingSpeed
    }
  }


  static mapMachineryDTOToMachinery(machineryDTO: ApiMachineryDTO, machineryTypeDTOList: ApiMachineryTypeDTO[]) {
    // mapping
    const typeDTO = machineryTypeDTOList.find(type => machineryDTO.typeName == type.name)
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
    const spec: MachinerySpecifications = this.mapMachinerySpecDTOtoMachinerySpec(machineryDTO.spec)
    const isRemote: boolean = machineryDTO.isRemote ?? false


    return new Machinery(
      machineryDTO.id,
      machineryDTO.name,
      type,
      state,
      beacons,
      plate,
      spec,
      machineryDTO.board_macBLE,
      isRemote
    )
  }

  static mapMachineryToMachineryRegistrationDTO(machinery: Machinery): ApiMachineryRegistrationDTO {

    // mapping
    console.log(machinery)

    const machineryPlate: ApiMachineryPlateDTO = this.mapMachineryPlateToMachineryPlateDTO(machinery.plate)
    const machinerySpec: ApiMachinerySpecificationsDTO = this.mapMachinerySpecToMachinerySpecDTO(machinery.spec)

    return {
      name: machinery.name,
      typeName: machinery.type.name,
      board_macBLE: machinery.board_macBLE,
      isRemote: machinery.isRemote,
      identificationPlate: machineryPlate,
      specs: machinerySpec
    }
  }



  private static mapStateToStateDTO(machineryState: MachineryState): ApiMachineryStateDTO {
    switch (machineryState) {
      case MachineryState.ACTIVE:
        return ApiMachineryStateDTO.ACTIVE;
      case MachineryState.INACTIVE:
        return ApiMachineryStateDTO.INACTIVE;
      case MachineryState.TO_CONFIGURE:
        return ApiMachineryStateDTO.TO_CONFIGURE;
    }
  }
  private static mapBeaconsToBeaconsDTO(machineryBeacons: Beacon[]): ApiBeaconDTO[] {
    return machineryBeacons.map( beacon => {
      return {
        id: beacon.id,
        position: beacon.position,
        macAddress: beacon.macAddress,
        safetyDistance: beacon.safetyDistance
      }
    })
  }
  private static mapMachineryPlateToMachineryPlateDTO(machineryPlate: MachineryPlate): ApiMachineryPlateDTO {
    return {
      yearOfManufacture: machineryPlate.yearOfManufacture,
      manufacturerName: machineryPlate.manufacturerName,
      serialNumber: machineryPlate.serialNumber,
      model: machineryPlate.model
    }
  }


  private static mapMachinerySpecToMachinerySpecDTO(spec: MachinerySpecifications): ApiMachinerySpecificationsDTO {
    return {
      dimensions: spec.dimensions,
      mass: spec.mass,
      operatingSpeed: spec.operatingSpeed
    }
  }

  static mapBeaconToBeaconDTO(beacon: Beacon): ApiBeaconDTO {
    return {
      id: beacon.id,
      macAddress: beacon.macAddress,
      position: beacon.position,
      safetyDistance: beacon.safetyDistance
    }
  }
}
