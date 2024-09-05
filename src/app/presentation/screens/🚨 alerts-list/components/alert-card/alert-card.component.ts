import {Component, Input, OnInit} from '@angular/core';
import {AlertCardParsingService} from "../../../../../services/alert-card-parsing.service";
import {Alert, AlertPriority, AlertType} from "../../../../../model/alert/alert";
import {AlertCardInterface} from "../../../../../model/alert/alertCardInterface";

@Component({
  selector: 'app-alert-card',
  templateUrl: './alert-card.component.html',
  styleUrl: './alert-card.component.scss'
})
export class AlertCardComponent implements OnInit{

  @Input() alert!: Alert //= {date: "12/05/2024", id: "123", infos: {}, priority: alertPriority.ts.High, time: "22.20", type: alertType.ts.GeneralAlert, duration: "23 min", subject: "Antonio Trocatelli", machinery: "Autopompa a coriandoli"}
  alertCardInterface!: AlertCardInterface

  constructor(private alertCardParsingService: AlertCardParsingService) {
    //this.alert = {date: "12/05/2024", id: "123", infos: {}, priority: alertPriority.ts.High, time: "22.20", type: alertType.ts.GeneralAlert, duration: "23 min", subject: "Antonio Trocatelli", machinery: "Autopompa a coriandoli"}

  }


  protected readonly Object = Object;

  ngOnInit(): void {

    this.alertCardInterface = this.alertCardParsingService.parseToAlertCardInterface(this.alert)
  }


  protected priorityClass(): String {
    switch (this.alert.priority!) {
      case AlertPriority.COMMUNICATION: return " low-priority ";
      case AlertPriority.WARNING: return " medium-priority ";
      case AlertPriority.DANGER: return " high-priority ";
    }
  }
  protected priority(): String {
    return ("#" + this.alert.priority).toUpperCase()
  }


  // MARK - Card animation
  tiltAngleX = 0;
  tiltAngleY = 0;

  onMouseMove(event: MouseEvent) {
    const { clientX, clientY, target } = event;
    const { left, top, width, height } = (target as HTMLElement).getBoundingClientRect();

    const offsetX = -(clientX - left - width / 2) / 3; // Calcola la distanza orizzontale del cursore dal centro dell'elemento
    const offsetY = -(clientY - top - height / 2) / 3; // Calcola la distanza verticale del cursore dal centro dell'elemento

    this.tiltAngleX = offsetY / 10; // Adatta l'angolo di inclinazione lungo l'asse X in base alla posizione verticale del cursore
    this.tiltAngleY = -offsetX / 10; // Adatta l'angolo di inclinazione lungo l'asse Y in base alla posizione orizzontale del cursore
  }

  onMouseLeave() {
    this.tiltAngleX = 0; // Reimposta l'angolo di inclinazione lungo l'asse X quando il mouse esce dall'elemento
    this.tiltAngleY = 0; // Reimposta l'angolo di inclinazione lungo l'asse Y quando il mouse esce dall'elemento
  }

  transformStyle() {
    return `perspective(1000px) rotateX(${this.tiltAngleX}deg) rotateY(${this.tiltAngleY}deg)`;
  }

  protected readonly AlertType = AlertType;
}

