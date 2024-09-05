import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HostConfigService {

  HOST = 'localhost'

  LOGINMS_PORT = '8080'
  SITEMANAGEMENTMS_PORT = '8081'
  ALARMSMS_PORT = '8082'

  LOGINMS_BASEURL = ''

  SITEMANAGEMENTMS_BASEURL = ''
  SITEMANAGEMENTMS_MachineriesTypes_BASEURL = ''
  SITEMANAGEMENTMS_Machineries_BASEURL = ''
  SITEMANAGEMENTMS_Workers_BASEURL = ''
  SITEMANAGEMENTMS_SiteConfiguration_BASEURL = ''

  ALARMSMS_Alarms_BASEURL = ''
  ALARMSMS_Statistics_BASEURL = ''




  constructor() {}

  updateEndpoints() {
    this.LOGINMS_BASEURL = 'http://' + this.HOST + ':' + this.LOGINMS_PORT + '/api/authentication/'
    this.SITEMANAGEMENTMS_BASEURL = 'http://' + this.HOST + ':' + this.SITEMANAGEMENTMS_PORT + '/api/'
    this.SITEMANAGEMENTMS_MachineriesTypes_BASEURL = this.SITEMANAGEMENTMS_BASEURL + 'machineries/types/'
    this.SITEMANAGEMENTMS_Machineries_BASEURL = this.SITEMANAGEMENTMS_BASEURL + 'machineries/'
    this.SITEMANAGEMENTMS_Workers_BASEURL = this.SITEMANAGEMENTMS_BASEURL + 'workers/'
    this.SITEMANAGEMENTMS_SiteConfiguration_BASEURL = this.SITEMANAGEMENTMS_BASEURL + 'siteconfiguration/'

    this.ALARMSMS_Alarms_BASEURL = 'http://' + this.HOST + ':' + this.ALARMSMS_PORT + '/api/alerts/'
    this.ALARMSMS_Statistics_BASEURL = 'http://' + this.HOST + ':' + this.ALARMSMS_PORT + '/api/statistics/'


  }

}
