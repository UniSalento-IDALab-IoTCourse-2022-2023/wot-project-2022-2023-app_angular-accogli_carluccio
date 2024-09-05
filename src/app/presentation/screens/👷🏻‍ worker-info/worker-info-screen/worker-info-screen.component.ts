import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiWorkerDTO} from "../../../../dto/api-worker.dto";
import {WorkerDTOMapper} from "../../../../dto-mapper/worker-dto-mapper";
import {SiteManagementService} from "../../../../services/site-management.service";
import {Worker, WorkerRole} from "../../../../model/worker";
import {Alert} from "../../../../model/alert/alert";
import {MachineryType} from "../../../../model/machinery-type";
import {Machinery} from "../../../../model/machinery";
import {ApiAlertDTO} from "../../../../dto/api-alert.dto";
import {ApiMachineryTypeDTO} from "../../../../dto/api-machinery-type.dto";
import {ApiMachineryDTO} from "../../../../dto/api-machinery.dto";
import {MachineryDTOMapper} from "../../../../dto-mapper/machinery-dto-mapper";
import {AlertDTOMapper} from "../../../../dto-mapper/alert-dto-mapper";
import {AlarmsService} from "../../../../services/alarms.service";

@Component({
  selector: 'app-worker-info-screen',
  templateUrl: './worker-info-screen.component.html',
  styleUrl: './worker-info-screen.component.scss'
})
export class WorkerInfoScreenComponent implements OnInit{

  workerId: string = ""
  worker?: Worker

  // per mostrare gli alerts relativi a quel worker
  alertList: Alert[] = []
  machineryTypeList: MachineryType[] = [] // potrei farne a meno di questo
  machineryList: Machinery[] = []
  workerList: Worker[] = []


  constructor(
    private route: ActivatedRoute,
    private siteManagementService: SiteManagementService,
    private alarmService: AlarmsService,
    private router: Router) { }


  async ngOnInit(): Promise<void> {
    if (localStorage.getItem('jwt') == null) {
      // Reindirizza manualmente
      this.router.navigateByUrl('/');
    }

    this.workerId = this.route.snapshot.paramMap.get('workerId')!

    await this.loadWorker(this.workerId);
    await this.loadAlerts(this.workerId);

  }


  async loadWorker(workerId: string) {
    try {
      // Avvio la richiesta
      const workerDTO: ApiWorkerDTO = await this.siteManagementService.loadWorker(workerId) as any
      console.log('Dati caricati con successo:', workerDTO);

      // from DTO to model
      this.worker = WorkerDTOMapper.mapWorkerDTOToWorker(workerDTO)

    } catch (error) {
      console.error('Errore durante il caricamento dei dati:', error);
    }
  }

  async loadAlerts(workerId: string) {
    try {
      // Avvia entrambe le richieste contemporaneamente usando Promise.all
      const [
        alertDTOList,
        machineryTypeDTOList,
        machineryDTOList,
        workerDTOList
      ]: [ApiAlertDTO[], ApiMachineryTypeDTO[], ApiMachineryDTO[], ApiWorkerDTO[]] = await Promise.all([
        this.alarmService.loadAlarmsFor(workerId) as any,
        this.siteManagementService.loadMachineryTypes() as any,
        this.siteManagementService.loadMachineries() as any,
        this.siteManagementService.loadWorkers() as any
      ]);
      console.log('Dati caricati con successo:', alertDTOList, machineryTypeDTOList, machineryDTOList, workerDTOList );

      // from DTO to model
      this.machineryTypeList = MachineryDTOMapper.mapMachineryTypeDTOList(machineryTypeDTOList)
      this.machineryList = MachineryDTOMapper.mapMachineryDTOListToMachineryList(machineryDTOList, machineryTypeDTOList)
      this.workerList = WorkerDTOMapper.mapWorkerDTOListToWorkerList(workerDTOList)
      this.alertList = AlertDTOMapper.mapAlertDTOList(alertDTOList, this.machineryList, this.workerList)

    } catch (error) {
      console.error('Errore durante il caricamento dei dati:', error);
    }
  }




  protected readonly WorkerRole = WorkerRole;

  getAlertList() {
    return this.alertList;
  }

  workerRoleIcon() {
    switch (this.worker!.role) {
      case WorkerRole.Driver: return " precision_manufacturing ";
      case WorkerRole.Pedestrian: return " footprint ";
    }
  }
}
