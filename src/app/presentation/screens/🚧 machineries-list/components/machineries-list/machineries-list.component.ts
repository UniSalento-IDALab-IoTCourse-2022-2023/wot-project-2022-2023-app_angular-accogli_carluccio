import {Component, Input} from '@angular/core';
import {Machinery} from "../../../../../model/machinery";

@Component({
  selector: 'app-machineries-list',
  templateUrl: './machineries-list.component.html',
  styleUrl: './machineries-list.component.scss'
})
export class MachineriesListComponent {
  @Input() machineriesList!: Machinery[]

}
