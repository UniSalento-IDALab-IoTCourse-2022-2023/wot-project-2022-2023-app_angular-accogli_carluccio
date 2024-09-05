import {Component, Input} from '@angular/core';
import {Machinery, MachineryState} from "../../../../../model/machinery";

@Component({
  selector: 'app-machinery-card',
  templateUrl: './machinery-card.component.html',
  styleUrl: './machinery-card.component.scss'
})
export class MachineryCardComponent {
  @Input() machinery!: Machinery


  protected machineryStatusClass(): String {
    switch (this.machinery.state) {
      case MachineryState.ACTIVE: return " state-active ";
      case MachineryState.INACTIVE: return " state-inactive ";
      case MachineryState.TO_CONFIGURE: return " state-to-configure ";
    }
  }
}
