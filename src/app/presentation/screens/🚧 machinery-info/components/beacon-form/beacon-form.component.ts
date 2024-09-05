import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  Beacon,
  Machinery,
  MachineryPlate,
  MachinerySpecifications,
  MachineryState
} from "../../../../../model/machinery";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {WorkerRole} from "../../../../../model/worker";

@Component({
  selector: 'app-beacon-form',
  templateUrl: './beacon-form.component.html',
  styleUrl: './beacon-form.component.scss',

})
export class BeaconFormComponent {
  @Input() isFormEnabled: boolean = false

  macAddress: string = ''
  safetyDistance: string = ''
  position: string = ''

  @Output() formSubmitted = new EventEmitter<Beacon>();



  onSubmit() {
    // creo variabile beacon a partire dai campi inseriti dall'utente
    const beacon: Beacon = {
      id: "",
      position: this.position,
      macAddress: this.macAddress.toUpperCase(),
      safetyDistance: +this.safetyDistance,
    }


    this.formSubmitted.emit(beacon);
  }


  resetForm() {
    this.macAddress = ""
    this.safetyDistance = ""
    this.position = ""
  }







  showForm() {
    this.isFormEnabled = true
  }
  hideForm() {
    console.log('hiding form')
    this.isFormEnabled = false
    this.resetForm()
  }
  getContainerClass(): string {
    return this.isFormEnabled ? ' form-container ' : ' card-container '
  }

  protected readonly WorkerRole = WorkerRole;
}
