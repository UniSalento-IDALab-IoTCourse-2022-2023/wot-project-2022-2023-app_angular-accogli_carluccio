import { Component } from '@angular/core';
import {HostConfigService} from "./services/host-config.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ssgapp';

  constructor(private hostConfigService: HostConfigService) {
    hostConfigService.updateEndpoints()
    console.log("Endpoints aggiornati")
  }
}
