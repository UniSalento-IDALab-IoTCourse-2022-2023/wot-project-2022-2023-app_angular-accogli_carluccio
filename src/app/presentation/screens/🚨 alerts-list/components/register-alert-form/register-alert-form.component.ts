import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Alert, AlertPriority} from "../../../../../model/alert/alert";

@Component({
  selector: 'app-register-alert-form',
  templateUrl: './register-alert-form.component.html',
  styleUrl: './register-alert-form.component.scss'
})
export class RegisterAlertFormComponent {
  @Input() isFormEnabled!: boolean

  message: string = ""
  selectedAlertPriority: AlertPriority = AlertPriority.COMMUNICATION

  alertPriorityKeys = Object.values(AlertPriority)

  @Output() formSubmitted = new EventEmitter<Alert>()


  onSubmit() {

    const alert: Alert = new Alert(
      undefined,
      undefined,
      undefined,
      undefined,
      this.selectedAlertPriority,
      undefined,
      undefined,
      undefined,
      this.message
  )
    this.formSubmitted.emit(alert);
    //this.resetForm()
  }


  onMachineryTypeSelected($event: Event) {
    const selectElement = event!.target as HTMLSelectElement;

    this.selectedAlertPriority = AlertPriority[selectElement.value.toUpperCase() as keyof typeof AlertPriority];
    // this.selectedAlertPriority = AlertPriorityselectElement.value;

    console.log("selezionato " + this.selectedAlertPriority)
  }


  resetForm() {
    this.message = ""
    this.selectedAlertPriority = AlertPriority.COMMUNICATION
  }

  protected readonly AlertPriority = AlertPriority;

  protected readonly Alert = Alert;
}
