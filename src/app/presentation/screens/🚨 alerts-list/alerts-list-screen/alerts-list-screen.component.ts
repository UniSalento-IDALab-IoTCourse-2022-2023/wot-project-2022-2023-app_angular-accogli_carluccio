import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Alert, AlertPriority, AlertType} from "../../../../model/alert/alert";
import {ApiMachineryTypeDTO} from "../../../../dto/api-machinery-type.dto";
import {ApiMachineryDTO} from "../../../../dto/api-machinery.dto";
import {MachineryDTOMapper} from "../../../../dto-mapper/machinery-dto-mapper";
import {SiteManagementService} from "../../../../services/site-management.service";
import {AlarmsService} from "../../../../services/alarms.service";
import {AlertDTOMapper} from "../../../../dto-mapper/alert-dto-mapper";
import {ApiAlertDTO} from "../../../../dto/api-alert.dto";
import {ApiWorkerDTO} from "../../../../dto/api-worker.dto";
import {Machinery} from "../../../../model/machinery";
import {MachineryType} from "../../../../model/machinery-type";
import {WorkerDTOMapper} from "../../../../dto-mapper/worker-dto-mapper";
import {Worker} from "../../../../model/worker";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";
import {RegisterAlertFormComponent} from "../components/register-alert-form/register-alert-form.component";


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
  selector: 'app-alerts-list-screen',
  templateUrl: './alerts-list-screen.component.html',
  styleUrl: './alerts-list-screen.component.scss',
  animations: [listAnimation,
    trigger('formAnimation', [
      state('visible', style({
        opacity: 1,
        height: '*', transform: 'scale(1)'
      })),
      state('hidden', style({
        opacity: 0,
        height: '0px', transform: 'scale(0.95)'
      })),
      transition('visible => hidden', [
        animate('0.2s ease-in-out', style({
          opacity: 0, transform: 'scale(1)'
        })),
        animate('0.2s ease-in-out', style({
          height: '0px', transform: 'scale(0.95)'
        }))
      ]),
      transition('hidden => visible', [
        animate('0.2s ease-in-out', style({
          height: '*', transform: 'scale(0.95)'
        })),
        animate('0.2s ease-in-out', style({
          opacity: 1, transform: 'scale(1)'
        }))
      ])
    ])]
})
export class AlertsListScreenComponent implements OnInit, OnDestroy {
  @ViewChild(RegisterAlertFormComponent) registerAlertFormComponent!: RegisterAlertFormComponent


  alertList: Alert[] = []
  machineryTypeList: MachineryType[] = [] // potrei farne a meno di questo
  machineryList: Machinery[] = []
  workerList: Worker[] = []

  isTodaySelected: boolean = false

  isShowingLaunchGeneralAlertForm: boolean = false


  selectedAlertTypes: AlertType[] = []
  selectedAlertPriorities: AlertPriority[] = []
  searchText: string = ""

  filteredAlertList: Alert[] = []

  private intervalId: any; // Salvo l'ID dell'intervallo per fermarlo quando abbandono la schermata Today

  constructor(
    private alarmService: AlarmsService,
    private siteManagementService: SiteManagementService,
    private router: Router,
    private cdr: ChangeDetectorRef // per fare in modo che rilevi il cambiamento della durata degli alerts di today
  ) { }

  async ngOnInit(): Promise<void> {
    if (localStorage.getItem('jwt') == null) {
      // Reindirizza manualmente
      this.router.navigateByUrl('/');
    }

    await this.loadAlerts();
  }

  async loadAlerts() {
    try {
      // Avvia entrambe le richieste contemporaneamente usando Promise.all
      const [
        alertDTOList,
        machineryTypeDTOList,
        machineryDTOList,
        workerDTOList
      ]: [ApiAlertDTO[], ApiMachineryTypeDTO[], ApiMachineryDTO[], ApiWorkerDTO[]] = await Promise.all([
        this.alarmService.loadAlarms() as any,
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

      this.filterAlertList()
    } catch (error) {
      console.error('Errore durante il caricamento dei dati:', error);
    }
  }

  filterAlertList() {
     console.log('filtro')
    this.filteredAlertList = this.alertList.filter(alert => { // Filtro sulla base di oggi o di sempre
      if (this.isTodaySelected) return alert.isTodayAlert()
      return true
    }).filter(alert => { // filtro sulla base del tipo di allarme
      if (this.selectedAlertTypes.length == 0) return true
      return this.selectedAlertTypes.includes(alert.type!)
    }).filter(alert => { // filtro sulla base della priorità di allarme
      if (this.selectedAlertPriorities.length == 0) return true
      return this.selectedAlertPriorities.includes(alert.priority!)
    }).filter( alert => { // filtro sulla base del testo inserito nella barra di ricerca
      if (this.searchText == '') return true
      if (
        (alert.worker?.name.toLowerCase().includes(this.searchText.toLowerCase())) ||
        (alert.worker?.surname.toLowerCase().includes(this.searchText.toLowerCase())) ||
        (alert.machinery?.name.toLowerCase().includes(this.searchText.toLowerCase())) ||
        (alert.machinery?.type.name.toLowerCase().includes(this.searchText.toLowerCase())) ||
        (alert.machinery?.plate.model.toLowerCase().includes(this.searchText.toLowerCase())) ||
        (alert.message?.toLowerCase().includes(this.searchText.toLowerCase()))
      )
        return true
      return false
    })

  }

  showLaunchGeneralAlertForm() {
    this.isShowingLaunchGeneralAlertForm = !this.isShowingLaunchGeneralAlertForm
    if (!this.isShowingLaunchGeneralAlertForm) {
      this.resetFormEntries()
    }
  }

  async onFormSubmitted(alert: Alert) {
    console.log(alert)

    // mappo Alert in ApiAlertDTO
    const alertDTO = AlertDTOMapper.mapAlertToAlertDTO(alert)

    // registro l'alert
    try {
      await this.siteManagementService.registerAlert(alertDTO)
      console.log('Alert registrato con successo.')

      // resetto i campi e chiudo il form
      this.resetFormEntries()
      this.isShowingLaunchGeneralAlertForm = false

      // aggiorno lista alerts
      await this.loadAlerts()

    } catch (error) {
      console.error('Errore durante la registrazione:', error);
      window.alert("Alert registration failed. \n" + error);
    }
  }

  private resetFormEntries() {
    this.registerAlertFormComponent.resetForm()
  }

  onTimeSwitchChange(isTodaySelected: boolean) {

    this.isShowingLaunchGeneralAlertForm = false
    if (this.intervalId) {
      clearInterval(this.intervalId); // Ferma scansione Today
    }

    if (!this.isTodaySelected && isTodaySelected) { // Per abilitare scansione allarmi anche in altre pagine dell'applicazione, basta rimuovere la clearInterval e spostare questo codice di listen per gli alerts in una zona per la quale sono sicuro che verrà eseguita sicuramente (dato che per come sta implementato adesso, la scansione periodica avviene solo quando premo su Today, e non appena apro la pagina)
      this.intervalId = setInterval(async () => {
        try {
          await this.listenTodayAlerts();
        } catch (error) {
          console.error('Errore durante il caricamento dei dati:', error);
        }
      }, 5000); // 5000 ms = 5 secondi
      this.isTodaySelected = isTodaySelected
    }
    if (this.isTodaySelected && !isTodaySelected) {
      this.isTodaySelected = isTodaySelected
      this.filterAlertList()
    }
  }
  async listenTodayAlerts() {
    try {
      // Avvia entrambe le richieste contemporaneamente usando Promise.all
      const alertDTOList: ApiAlertDTO[] = await this.alarmService.loadAlarms() as any

      console.log('Dati caricati con successo:', alertDTOList);

      // from DTO to model
      const alertList = AlertDTOMapper.mapAlertDTOList(alertDTOList, this.machineryList, this.workerList)

      for (const alert of alertList.filter( alert => alert.isTodayAlert())) {

        if (this.alertList.find(it => it.id == alert.id) == undefined) {
          console.log("inserisco alert in lista")
          this.alertList.unshift(alert)
        }
      }

      var alertToAdd!: Alert
      const indexToRemove = this.alertList.findIndex(alert => {
        const _alert = alertList.find(it => it.id == alert.id)!
        if (_alert.secondsDuration != alert.secondsDuration) {
          alertToAdd = _alert
          return true
        }
        return false
      })
      if (indexToRemove > -1) {
        this.alertList.splice(indexToRemove, 1)
        this.alertList.unshift(alertToAdd)
      }



      // se l'alert è gia in lista, controllo che la durata sia sempre la stessa, altrimenti la aggiorno (per rapidità ho fatto un obrobrio dal punto di vista computazionale, ma va bene lo stesso)



      alertList.forEach( alert => {
        console.log(this.alertList.find(it => it.id == alert.id)!.secondsDuration, alert.secondsDuration)
        const _alert = this.alertList.find(it => it.id == alert.id)
        _alert!.secondsDuration = alert.secondsDuration
        //alert = alertList.find(it => it.id == alert.id)! // funziona, ma la view non si aggiorna
      })


      this.filterAlertList()

    } catch (error) {
      console.error('Errore durante il caricamento dei dati:', error);
    }
  }

  protected readonly AlertType = AlertType;

  toggleFilterByAlertType(alertType?: AlertType) {
    switch (alertType) {
      case AlertType.General: this.selectedAlertTypes = [AlertType.General]; break
      case AlertType.Distance: this.selectedAlertTypes = [AlertType.Distance]; break
      case AlertType.DriverAway: this.selectedAlertTypes = [AlertType.DriverAway]; break
      default: this.selectedAlertTypes = []
    }
    this.filterAlertList()
  }

  toggleFilterByAlertPriority(alertPriority?: AlertPriority) {
    switch (alertPriority) {
      case AlertPriority.COMMUNICATION: this.selectedAlertPriorities = [AlertPriority.COMMUNICATION]; break
      case AlertPriority.WARNING: this.selectedAlertPriorities = [AlertPriority.WARNING]; break
      case AlertPriority.DANGER: this.selectedAlertPriorities = [AlertPriority.DANGER]; break
      default: this.selectedAlertPriorities = []
    }
    this.filterAlertList()
  }



  protected readonly AlertPriority = AlertPriority;

  handleSearch(text: string) {
    this.searchText = text
    this.filterAlertList()
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Ferma scansione Today
    }
  }
}
