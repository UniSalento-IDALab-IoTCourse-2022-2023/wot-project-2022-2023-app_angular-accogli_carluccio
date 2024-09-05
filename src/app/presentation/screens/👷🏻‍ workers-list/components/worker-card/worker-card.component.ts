import {Component, Input} from '@angular/core';
import {Worker, WorkerRole} from "../../../../../model/worker";
import {MachineryState} from "../../../../../model/machinery";


@Component({
  selector: 'app-worker-card',
  templateUrl: './worker-card.component.html',
  styleUrl: './worker-card.component.scss'
})
export class WorkerCardComponent {

  @Input() worker!: Worker

  workerClass(): string {
    switch (this.worker.role) {
      case WorkerRole.Driver: return " role-driver ";
      case WorkerRole.Pedestrian: return " role-pedestrian ";
    }
  }

  protected readonly WorkerRole = WorkerRole;

  workerRoleIcon() {
    switch (this.worker.role) {
      case WorkerRole.Driver: return " precision_manufacturing  ";
      case WorkerRole.Pedestrian: return " footprint ";
    }
  }
}
