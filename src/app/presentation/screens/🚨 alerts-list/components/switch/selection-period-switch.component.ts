import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-selection-period-switch',
  templateUrl: './selection-period-switch.component.html',
  styleUrl: './selection-period-switch.component.scss'
})
export class SelectionPeriodSwitchComponent {

  @Input() isTodaySelected!: boolean



  @Output() isTodaySelectedChange: EventEmitter<boolean> = new EventEmitter<boolean>();


}
