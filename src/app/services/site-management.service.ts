import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HostConfigService} from "./host-config.service";
import {HttpService} from "./http.service";
import {Worker} from "../model/worker";
import {ApiWorkerDTO} from "../dto/api-worker.dto";
import {ApiBeaconDTO, ApiMachineryDTO} from "../dto/api-machinery.dto";
import {ApiMachineryRegistrationDTO} from "../dto/api-machinery-registration.dto";
import {ApiSiteConfigurationRegistrationDTO} from "../dto/api-site-configuration-registration.dto";
import {ApiAlertDTO} from "../dto/api-alert.dto";

@Injectable({
  providedIn: 'root'
})
export class SiteManagementService {

  //path: string = '/assets/data/smartbins.json';
  baseUrlMachineriesTypes: string = ''
  baseUrlMachineries: string = ''
  baseUrlWorkers: string = ''
  baseUrlSiteConfiguration: string = ''



  constructor(
    private http: HttpClient,
    private hostConfigService: HostConfigService,
    private httpService: HttpService
  ) {
    this.baseUrlMachineriesTypes = hostConfigService.SITEMANAGEMENTMS_MachineriesTypes_BASEURL
    this.baseUrlMachineries = hostConfigService.SITEMANAGEMENTMS_Machineries_BASEURL
    this.baseUrlWorkers = hostConfigService.SITEMANAGEMENTMS_Workers_BASEURL
    this.baseUrlSiteConfiguration = hostConfigService.SITEMANAGEMENTMS_SiteConfiguration_BASEURL
  }


  loadMachineryTypes() {
    return this.httpService.get(this.baseUrlMachineries + 'types/').catch(error => {
      console.error('Errore durante il caricamento dei tipi di macchinari:', error);
      throw error; // Rilancia l'errore per gestirlo nel chiamante
    });
  }

  loadMachineries() {
    return this.httpService.get(this.baseUrlMachineries).catch(error => {
      console.error('Errore durante il caricamento dei macchinari:', error);
      throw error; // Rilancia l'errore per gestirlo nel chiamante
    });

  }

  loadWorkers() {
    return this.httpService.get(this.baseUrlWorkers).catch(error => {
      console.error('Errore durante il caricamento dei lavoratori:', error);
      throw error; // Rilancia l'errore per gestirlo nel chiamante
    });

  }
  loadEquipmentOperators() {
    return this.httpService.get(this.baseUrlWorkers + '?type=EQUIPMENT_OPERATOR').catch(error => {
      console.error('Errore durante il caricamento dei guidatori di macchinari:', error);
      throw error; // Rilancia l'errore per gestirlo nel chiamante
    });

  }


  loadWorker(workerId: string) {
    return this.httpService.get(this.baseUrlWorkers + workerId).catch(error => {
      console.error('Errore durante il caricamento del worker:', error);
      throw error; // Rilancia l'errore per gestirlo nel chiamante
    });

  }

  loadMachinery(machineryId: string) {
    return this.httpService.get(this.baseUrlMachineries + machineryId).catch(error => {
      console.error('Errore durante il caricamento del macchinario:', error);
      throw error; // Rilancia l'errore per gestirlo nel chiamante
    });
  }

  loadMachineryTypesWithSpecificLicence() {
    return this.httpService.get(this.baseUrlMachineries + 'types?specificLicence=true').catch(error => {
      console.error('Errore durante il caricamento dei tipi di macchinari:', error);
      throw error; // Rilancia l'errore per gestirlo nel chiamante
    });
  }

  registerWorker(worker: ApiWorkerDTO) {
    return this.httpService.post(this.baseUrlWorkers, worker).catch(error => {
      console.error('Errore durante la registrazione del lavoratore:', error);
      throw error; // Rilancia l'errore per gestirlo nel chiamante
    });
  }

  async registerMachinery(machinery: ApiMachineryRegistrationDTO) {
    return this.httpService.post(this.baseUrlMachineries, machinery).catch(error => {
      console.error('Errore durante la registrazione del macchinario:', error);
      throw error; // Rilancia l'errore per gestirlo nel chiamante
    });
  }

  async registerBeacon(beaconDTO: ApiBeaconDTO, machineryId: string) {
    return this.httpService.patch(this.baseUrlMachineries + machineryId + '/beacons', beaconDTO).catch(error => {
      console.error('Errore durante la registrazione del macchinario:', error);
      throw error; // Rilancia l'errore per gestirlo nel chiamante
    });
  }

  async removeBeacon(beaconId: string, machineryId: string) {
    return this.httpService.delete(this.baseUrlMachineries + machineryId + '/beacons/' + beaconId).catch(error => {
      console.error('Errore durante la rimozione del beacon:', error);
      throw error; // Rilancia l'errore per gestirlo nel chiamante
    });
  }

  async loadLastConfiguration() {
    return this.httpService.get(this.baseUrlSiteConfiguration + 'last').catch(error => {
      console.error('Errore durante il caricamento dell\'ultima configurazione di macchinari:', error);
      throw error; // Rilancia l'errore per gestirlo nel chiamante
    });
  }

  async registerSiteConfiguration(siteConfiguration: ApiSiteConfigurationRegistrationDTO) {
    return this.httpService.post(this.baseUrlSiteConfiguration, siteConfiguration).catch(error => {
      console.error('Errore durante la registrazione della configurazione:', error);
      throw error; // Rilancia l'errore per gestirlo nel chiamante
    });
  }

  async registerAlert(alertDTO: ApiAlertDTO) {
    console.log(alertDTO)

    return this.httpService.post(this.baseUrlMachineries + 'general_alarm', alertDTO).catch(error => {
      console.error('Errore durante la registrazione dell\'alert:', error);
      throw error; // Rilancia l'errore per gestirlo nel chiamante
    });
  }
}
