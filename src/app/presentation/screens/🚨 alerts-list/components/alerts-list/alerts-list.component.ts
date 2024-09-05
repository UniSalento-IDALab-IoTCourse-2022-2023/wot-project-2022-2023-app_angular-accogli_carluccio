import {Component, Input} from '@angular/core';
import {Alert} from "../../../../../model/alert/alert";
import {animate, style, transition, trigger} from "@angular/animations";

export const listAnimation = trigger('listAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.95)' }),
    animate('150ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
  ]),
  transition(':leave', [
    animate('150ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))
  ])
]);

@Component({
  selector: 'app-alerts-list',
  templateUrl: './alerts-list.component.html',
  styleUrl: './alerts-list.component.scss',
  animations: [listAnimation]
})
export class AlertsListComponent {

  @Input() alertList!: Alert[]

}


