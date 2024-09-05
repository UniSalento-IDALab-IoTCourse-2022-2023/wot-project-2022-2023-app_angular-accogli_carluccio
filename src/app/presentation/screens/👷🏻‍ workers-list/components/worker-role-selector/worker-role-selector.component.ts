import {Component, EventEmitter, Input, Output} from '@angular/core';
import {WorkerRole} from "../../../../../model/worker";

@Component({
  selector: 'app-worker-role-selector',
  templateUrl: './worker-role-selector.component.html',
  styleUrl: './worker-role-selector.component.scss'
})
export class WorkerRoleSelectorComponent {
  @Input() disabled = false

  private _workerRole!: WorkerRole
  @Input()
  get workerRole(): WorkerRole {
    return this._workerRole
  }
  set workerRole(value: WorkerRole) {
    this._workerRole = value;
    this.workerRoleChange.emit(this._workerRole);
  }
  @Output() workerRoleChange: EventEmitter<WorkerRole> = new EventEmitter<WorkerRole>();




  protected readonly WorkerRole = WorkerRole;
}
