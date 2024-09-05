import {Component, EventEmitter, Input, Output} from '@angular/core';

interface Option {
  label: string;
  selected: boolean;
}

@Component({
  selector: 'app-worker-driving-licence-selector',
  templateUrl: './worker-driving-licence-selector.component.html',
  styleUrl: './worker-driving-licence-selector.component.scss'
})
export class WorkerDrivingLicenceSelectorComponent {
  options: Option[] = [
    { label: 'A1', selected: false },
    { label: 'B', selected: false },
    { label: 'C', selected: false },
  ];

  private _licencesSelected: string[] = []
  @Input()
  get licencesSelected(): string[] {
    return this._licencesSelected
  }
  set licencesSelected(value: string[]) {
    this._licencesSelected = value;
    this.licencesSelectedChange.emit(this._licencesSelected);
  }
  @Output() licencesSelectedChange: EventEmitter<String[]> = new EventEmitter<String[]>();
  @Input() disabled: boolean = false


  onCheckboxChange(option: Option, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked
    option.selected = isChecked;

    if (isChecked) {
      this.licencesSelected.push(option.label);
    } else {
      const index = this.licencesSelected.indexOf(option.label);
      if (index >= 0) {
        this.licencesSelected.splice(index, 1);
      }
    }
  }

}
