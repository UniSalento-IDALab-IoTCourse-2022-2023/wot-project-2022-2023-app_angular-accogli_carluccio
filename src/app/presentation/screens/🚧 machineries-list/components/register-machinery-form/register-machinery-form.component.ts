import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MachineryType} from "../../../../../model/machinery-type";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Machinery, MachineryPlate, MachinerySpecifications, MachineryState} from "../../../../../model/machinery";

@Component({
  selector: 'app-register-machinery-form',
  templateUrl: './register-machinery-form.component.html',
  styleUrl: './register-machinery-form.component.scss',
  animations: [
    trigger('toggleHeight', [
      state('collapsed', style({ height: '0px', overflow: 'hidden', opacity: 0 })),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class RegisterMachineryFormComponent {
  @Input() machineryTypeList!: MachineryType[]
  @Input() isFormEnabled!: boolean

  name: string = ""
  dimension: string = ""
  maximumLoad?: number
  operativeSpeed: string = ""
  macAddress: string = ""
  yearOfManufacture?: number
  manufacturerName: string = ""
  serialNumber: string = ""
  model: string = ""

  selectedMachineryType?: MachineryType
  selectedMachineryTypeId: string = ''
  isRemote: boolean = false


  @Output() formSubmitted = new EventEmitter<Machinery>();

  onSubmit() {
    // creo variabile machinery a partire dai campi inseriti dall'utente

    const plate: MachineryPlate = {
      yearOfManufacture: +this.yearOfManufacture!,
      manufacturerName: this.manufacturerName,
      serialNumber: this.serialNumber,
      model: this.model
    }

    const spec: MachinerySpecifications = {
      operatingSpeed: +this.operativeSpeed,
      mass: +this.maximumLoad!,
      dimensions: this.dimension
    }

    const machinery = new Machinery(
      "",
      this.name,
      this.selectedMachineryType!,
      MachineryState.TO_CONFIGURE,
      [],
      plate,
      spec,
      this.macAddress,
      this.isRemote
    )

    this.formSubmitted.emit(machinery);
  }

  onMachineryTypeSelected($event: Event) {
    const selectElement = event!.target as HTMLSelectElement;
    this.selectedMachineryTypeId = selectElement.value;

    console.log("selezionato " + this.selectedMachineryTypeId)

    this.selectedMachineryType = this.machineryTypeList.find(licence =>
      licence.id == this.selectedMachineryTypeId)!

  }


  resetForm() {
    this.name = ""
    this.dimension = ""
    this.maximumLoad = undefined
    this.operativeSpeed = ""
    this.macAddress = ""
    this.yearOfManufacture = undefined
    this.manufacturerName = ""
    this.serialNumber = ""
    this.model = ""

    this.selectedMachineryType = undefined
    this.selectedMachineryTypeId = ''
    this.isRemote = false
  }
}
