import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HostConfigService} from "./host-config.service";
import {HttpService} from "./http.service";
import {ApiSiteConfigurationRegistrationDTO} from "../dto/api-site-configuration-registration.dto";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrlAuthenticationService: string = ''

  constructor(
    private http: HttpClient,
    private hostConfigService: HostConfigService,
    private httpService: HttpService
  ) {
    this.baseUrlAuthenticationService = hostConfigService.LOGINMS_BASEURL
  }


  async login(username: string, password: string) {
    return this.httpService.postWithoutAuthentication(this.baseUrlAuthenticationService + 'authenticate', {username: username, password: password}).catch(error => {
      console.error('Errore durante il login:', error);
      throw error; // Rilancia l'errore per gestirlo nel chiamante
    });
  }
}
