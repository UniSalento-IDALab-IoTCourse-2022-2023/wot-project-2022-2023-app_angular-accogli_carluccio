import {Component, OnInit} from '@angular/core';
import {SiteManagementService} from "../../../../services/site-management.service";
import {ApiMachineryTypeDTO} from "../../../../dto/api-machinery-type.dto";
import {ApiMachineryDTO, ApiMachineryStateDTO} from "../../../../dto/api-machinery.dto";
import {MachineryDTOMapper} from "../../../../dto-mapper/machinery-dto-mapper";
import {Machinery} from "../../../../model/machinery";
import {MachineryType} from "../../../../model/machinery-type";
import {Worker} from "../../../../model/worker";
import {ApiWorkerDTO} from "../../../../dto/api-worker.dto";
import {WorkerDTOMapper} from "../../../../dto-mapper/worker-dto-mapper";
import {ApiSiteConfigurationDTO} from "../../../../dto/api-site-configuration.dto";
import {MachinerySelection} from "../../../../model/machinery-selection";
import {SiteConfigurationDTOMapper} from "../../../../dto-mapper/site-configuration-dto-mapper";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";

@Component({
  selector: 'app-site-configuration-screen',
  templateUrl: './site-configuration-screen.component.html',
  styleUrl: './site-configuration-screen.component.scss',
  animations: [
    // Per la comparsa
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0,
        //transform: 'translateX(-20px)' // Partenza animata
      })),
      transition(':enter, :leave', [
        animate('0.3s ease-in-out')
      ])
    ]),
    trigger('heightAnimation', [
      state('void', style({
        height: '0',
        opacity: '0'
      })),
      transition('void <=> *', [
        animate('300ms ease-out')
      ])
    ])
  ]
})
export class SiteConfigurationScreenComponent implements OnInit{

  machineryList: Machinery[] = []
  machineryTypeList: MachineryType[] = []
  workerList: Worker[] = []

  // oggetto ottenuto fondendo machineryList, machineryTypeList e workerList
  machinerySelectionList: MachinerySelection[] = []

  lastConfigDate: string = ''

  isTodayConfiguration: boolean = false
  isUpdateSiteConfigurationButtonDisabled: boolean = false



  constructor(
    private siteManagementService: SiteManagementService,
    private router: Router
  ) { }



  async ngOnInit(): Promise<void> {
    if (localStorage.getItem('jwt') == null) {
      // Reindirizza manualmente
      this.router.navigateByUrl('/');
    }

    await this.loadMachineries()
    await this.loadEquipmentOperators()
    await this.loadLastConfiguration()

    console.log(this.machinerySelectionList) // stampo configurazione
  }

  async loadMachineries() {
    try {

      // Avvia entrambe le richieste contemporaneamente usando Promise.all
      const [machineryTypeDTOList, machineryDTOList]: [ApiMachineryTypeDTO[], ApiMachineryDTO[]] = await Promise.all([
        this.siteManagementService.loadMachineryTypes() as any,
        this.siteManagementService.loadMachineries() as any
      ]);
      console.log('Dati caricati con successo:', machineryTypeDTOList, machineryDTOList);

      // from DTO to model (nota che i macchinari da configurare li tolgo, siccome il manager non puo selezionarli per il mapping)
      this.machineryList = MachineryDTOMapper.mapMachineryDTOListToMachineryList(machineryDTOList.filter( machinery => machinery.state != ApiMachineryStateDTO.TO_CONFIGURE), machineryTypeDTOList)
      this.machineryTypeList = MachineryDTOMapper.mapMachineryTypeDTOList(machineryTypeDTOList)

    } catch (error) {
      console.error('Errore durante il caricamento dei dati:', error);
    }
  }
  async loadEquipmentOperators() {
    try {
      // Avvia entrambe le richieste contemporaneamente usando Promise.all
      const [workerDTOList/*, machineryTypeDTOList*/]: [ApiWorkerDTO[]/*, ApiMachineryTypeDTO[]*/] = await Promise.all([
        this.siteManagementService.loadEquipmentOperators() as any,
        //this.siteManagementService.loadMachineryTypesWithSpecificLicence() as any
      ]);
      console.log('Dati caricati con successo:', workerDTOList/*, machineryTypeDTOList*/);

      // from DTO to model
      this.workerList = WorkerDTOMapper.mapWorkerDTOListToWorkerList(workerDTOList)

    } catch (error) {
      console.error('Errore durante il caricamento dei dati:', error);
    }
  }

  private async loadLastConfiguration() {
    try {
      // Avvia entrambe le richieste contemporaneamente usando Promise.all
      const [siteConfigurationDTO/*, machineryTypeDTOList*/]: [ApiSiteConfigurationDTO/*, ApiMachineryTypeDTO[]*/] = await Promise.all([
        this.siteManagementService.loadLastConfiguration() as any,
        //this.siteManagementService.loadMachineryTypesWithSpecificLicence() as any
      ]);
      console.log('Dati caricati con successo:', siteConfigurationDTO/*, machineryTypeDTOList*/);

      // from DTO to model - inserisco i dati di questa lista come campi di MachinerySelection
      this.machinerySelectionList = SiteConfigurationDTOMapper.mapSiteConfigurationDTOToMachinerySelection(
        siteConfigurationDTO,
        this.machineryList,
        this.machineryTypeList,
        this.workerList
      )
      this.lastConfigDate = siteConfigurationDTO.date

      if (this.isToday(this.lastConfigDate)) {
        this.isTodayConfiguration = true
      } else {
        this.isTodayConfiguration = false
      }

    } catch (error) {
      console.error('Errore durante il caricamento dei dati:', error);
    }
  }
  isToday(dateString: string): boolean {
    const inputDate = new Date(dateString);
    const today = new Date();

    return (
      inputDate.getFullYear() === today.getFullYear() &&
      inputDate.getMonth() === today.getMonth() &&
      inputDate.getDate() === today.getDate()
    );
  }



  async updateSiteConfiguration() {
    // disabilito il pulsante in modo da non lanciare troppe richieste
    this.isUpdateSiteConfigurationButtonDisabled = true
    console.log("aggiorno configurazione:", this.machinerySelectionList)




    // mappo MachinerySelection[] in ApiSiteConfigurationRegistrationDTO
    const siteConfigurationRegistrationDTO = SiteConfigurationDTOMapper.mapMachinerySelectionListToSiteConfigurationRegistrationDTO(this.machinerySelectionList)

    console.log("invio tramite post: ", siteConfigurationRegistrationDTO)

    // registro la configurazione
    try {
      const response = await this.siteManagementService.registerSiteConfiguration(siteConfigurationRegistrationDTO)
      console.log('Configurazione registrata con successo:', response)

      // effettuo la richiesta della nuova configurazione
      await this.loadLastConfiguration()

    } catch (error) {
      console.error('Errore durante la registrazione:', error);
      window.alert("Configuration update failed.");
    }
    // ri-abilito il button per la registrazione della configurazione
    this.isUpdateSiteConfigurationButtonDisabled = false

  }

  removeWorkerFromSelection(workerSelectedId: string, machinerySelectionId: string) {
    // aggiungo worker nella lista dei workers abilitati per quel macchinario
    const machineryIndex = this.machinerySelectionList.findIndex(it => it.id == machinerySelectionId)
    const workerSelected = this.workerList.find(it => it.id == workerSelectedId)!
    this.machinerySelectionList[machineryIndex].availableDrivers.push(workerSelected)

    // rimuovo worker dalla lista dei workers selezionati
    this.machinerySelectionList[machineryIndex].selectedDrivers.splice(this.machinerySelectionList[machineryIndex].selectedDrivers.findIndex( it => it.id == workerSelectedId), 1)

  }

  onWorkerSelected($event: Event) {
    const selectElement = event!.target as HTMLSelectElement;
    const [machinerySelectionId, workerSelectedId] = selectElement.value.split('_');

    // aggiungo worker nella lista dei workers selezionati per quel macchinario
    const machineryIndex = this.machinerySelectionList.findIndex(it => it.id == machinerySelectionId)
    const workerSelected = this.workerList.find(it => it.id == workerSelectedId)!
    this.machinerySelectionList[machineryIndex].selectedDrivers.push(workerSelected)

    // rimuovo worker dalla lista dei workers abilitati
    this.machinerySelectionList[machineryIndex].availableDrivers.splice(this.machinerySelectionList[machineryIndex].availableDrivers.findIndex( it => it.id == workerSelectedId), 1)

    selectElement.value = ''
  }

}
