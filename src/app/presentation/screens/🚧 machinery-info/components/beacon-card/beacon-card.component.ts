import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Beacon} from "../../../../../model/machinery";

@Component({
  selector: 'app-beacon-card',
  templateUrl: './beacon-card.component.html',
  styleUrl: './beacon-card.component.scss'
})
export class BeaconCardComponent {
  @Input() beacon!: Beacon
  @Output() beaconRemoved = new EventEmitter<Beacon>();

  removeBeacon() {
    console.log('removing beacon')
    this.beaconRemoved.emit(this.beacon);
  }


}
