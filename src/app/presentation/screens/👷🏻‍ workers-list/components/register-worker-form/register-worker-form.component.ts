import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Worker, WorkerRole} from "../../../../../model/worker";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MachineryType} from "../../../../../model/machinery-type";

@Component({
  selector: 'app-register-worker-form',
  templateUrl: './register-worker-form.component.html',
  styleUrl: './register-worker-form.component.scss',
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
export class RegisterWorkerFormComponent {
  @Input() machineryTypesWithSpecificLicence!: MachineryType[]
  @Input() isFormEnabled!: boolean


  name: string = ""
  surname: string = ""
  ssn: string = ""
  email: string = ""
  birthdate: string = ""
  workerRole: WorkerRole = WorkerRole.Pedestrian

  genericLicencesSelectedList: string[] = []
  specificLicenceSelectedList: MachineryType[] = []

  selectedSpecificLicenceId: string = ''

  protected readonly WorkerRole = WorkerRole;

  @Output() formSubmitted = new EventEmitter<Worker>();

  onSubmit() {
    // siccome in backend il campo è una stringa, allora prendo la patente piú 'forte'
    const genericLicenceBest = this.genericLicencesSelectedList.includes("C") ? 'C' : this.genericLicencesSelectedList.includes("B") ? 'B' : this.genericLicencesSelectedList.includes("A1") ? 'A1' : ''

    // creo variabile worker a partire dai campi inseriti dall'utente
    const worker = new Worker(
      "",
      this.name,
      this.surname,
      this.ssn,
      this.email,
      this.birthdate,
      this.workerRole,
      genericLicenceBest,
      this.specificLicenceSelectedList.map(specificLicence => specificLicence.name))

    this.formSubmitted.emit(worker);
  }

  onSpecificLicenceSelected($event: Event) {
    const selectElement = event!.target as HTMLSelectElement;
    this.selectedSpecificLicenceId = selectElement.value;

    console.log("selezionato " + this.selectedSpecificLicenceId)

    // aggiungo patente in lista
    const specificLicenceSelected = this.machineryTypesWithSpecificLicence.find(licence =>
      licence.id == this.selectedSpecificLicenceId)!
    this.specificLicenceSelectedList.push(specificLicenceSelected)
    // rimuovo patente dalla lista delle patenti disponibili
    this.machineryTypesWithSpecificLicence.splice(this.machineryTypesWithSpecificLicence.findIndex( licence => licence.id == this.selectedSpecificLicenceId), 1)

    selectElement.value = ''
  }

  removeSpecificLicence(specificLicence: MachineryType) {
    this.machineryTypesWithSpecificLicence.push(specificLicence)
    this.specificLicenceSelectedList.splice(this.specificLicenceSelectedList.findIndex( licence => licence.id == specificLicence.id), 1)

  }

  resetForm() {
    console.log('reset form called')

    this.name = ""
    this.surname = ""
    this.ssn = ""
    this.email = ""
    this.birthdate = ""
    this.workerRole = WorkerRole.Pedestrian

    this.genericLicencesSelectedList = []
    this.specificLicenceSelectedList = []

    this.selectedSpecificLicenceId = ''
  }
}
