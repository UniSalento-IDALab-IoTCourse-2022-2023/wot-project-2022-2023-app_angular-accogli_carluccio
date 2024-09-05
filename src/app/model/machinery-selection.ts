import {Machinery} from "./machinery";
import {Worker} from "./worker";


export class MachinerySelection extends Machinery {

  selectedDrivers: Worker[]
  availableDrivers: Worker[]


  constructor(machinery: Machinery, selectedDrivers: Worker[], availableDrivers: Worker[]) {
    super(machinery.id, machinery.name, machinery.type, machinery.state, machinery.beaconsAssociated, machinery.plate, machinery.spec, machinery.board_macBLE, machinery.isRemote);
    this.selectedDrivers = selectedDrivers;
    this.availableDrivers = availableDrivers;
  }


}
