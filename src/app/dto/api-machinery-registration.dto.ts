import {ApiMachineryPlateDTO, ApiMachinerySpecificationsDTO} from "./api-machinery.dto";

export interface ApiMachineryRegistrationDTO {
  name: string,
  typeName: string,
  board_macBLE: string,
  isRemote: boolean,
  identificationPlate: ApiMachineryPlateDTO
  specs: ApiMachinerySpecificationsDTO
}
