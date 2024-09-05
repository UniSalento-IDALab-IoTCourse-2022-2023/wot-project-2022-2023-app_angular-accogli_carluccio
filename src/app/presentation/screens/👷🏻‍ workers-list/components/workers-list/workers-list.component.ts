import {Component, Input} from '@angular/core';
import {Worker} from "../../../../../model/worker";

@Component({
  selector: 'app-workers-list',
  templateUrl: './workers-list.component.html',
  styleUrl: './workers-list.component.scss'
})
export class WorkersListComponent {

  @Input() workersList!: Worker[]

}
