import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HostConfigService} from "./host-config.service";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class AlarmsService {

  baseUrlAlarms: string = ''
  baseUrlStatistics: string = ''

  constructor(
    private http: HttpClient,
    private hostConfigService: HostConfigService,
    private httpService: HttpService
  ) {
    this.baseUrlAlarms = hostConfigService.ALARMSMS_Alarms_BASEURL
    this.baseUrlStatistics = hostConfigService.ALARMSMS_Statistics_BASEURL
  }

  loadAlarms() {
    return this.httpService.get(this.baseUrlAlarms).catch(error => {
      console.error('Errore durante il caricamento degli alerts:', error);
      throw error; // Rilancia l'errore per gestirlo nel chiamante
    });
  }
  loadAlarmsFor(workerId: string) {
    return this.httpService.get(this.baseUrlAlarms+'worker/' + workerId).catch(error => {
      console.error('Errore durante il caricamento degli alerts:', error);
      throw error; // Rilancia l'errore per gestirlo nel chiamante
    });
  }

  async loadYearlyStatistics(year: string) {
    return this.httpService.get(this.baseUrlStatistics + year).catch(error => {
      console.error('Errore durante il caricamento delle statistiche:', error);
      throw error; // Rilancia l'errore per gestirlo nel chiamante
    });
  }

  loadMonthlyStatistics(year: string, month: string) {
    return this.httpService.get(this.baseUrlStatistics + year + '/' + month).catch(error => {
      console.error('Errore durante il caricamento delle statistiche:', error);
      throw error; // Rilancia l'errore per gestirlo nel chiamante
    });
  }

  loadWeeklyStatistics(year: string, month: string, day: string) {
    return this.httpService.get(this.baseUrlStatistics + year + '/' + month + '/' + day + '/week').catch(error => {
      console.error('Errore durante il caricamento delle statistiche:', error);
      throw error; // Rilancia l'errore per gestirlo nel chiamante
    });
  }

  loadDailyStatistics(year: string, month: string, day: string) {
    return this.httpService.get(this.baseUrlStatistics + year + '/' + month + '/' + day).catch(error => {
      console.error('Errore durante il caricamento delle statistiche:', error);
      throw error; // Rilancia l'errore per gestirlo nel chiamante
    });
  }


}
