export class StatisticsAlerts {
  name: string
  type: MachineryType
  state: MachineryState
  beaconsAssociated: Beacon[]
  plate: MachineryPlate
  spec: MachinerySpecifications
  board_macBLE: string
  isRemote: boolean


  constructor(id: string, name: string, type: MachineryType, state: MachineryState, beaconsAssociated: Beacon[], plate: MachineryPlate, spec: MachinerySpecifications, board_macBLE: string, isRemote: boolean) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.state = state;
    this.beaconsAssociated = beaconsAssociated;
    this.plate = plate;
    this.spec = spec;
    this.board_macBLE = board_macBLE;
    this.isRemote = isRemote;
  }

  getRequiredLicence() {
    return this.type.generalLicence
  }
}
