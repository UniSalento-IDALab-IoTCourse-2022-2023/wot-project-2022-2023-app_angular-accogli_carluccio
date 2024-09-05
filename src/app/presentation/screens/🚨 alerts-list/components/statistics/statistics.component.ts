import {Component, OnInit} from '@angular/core';
import {AlarmsService} from "../../../../../services/alarms.service";
import {ApiAlertDTO} from "../../../../../dto/api-alert.dto";
import {ApiMachineryTypeDTO} from "../../../../../dto/api-machinery-type.dto";
import {ApiMachineryDTO} from "../../../../../dto/api-machinery.dto";
import {ApiWorkerDTO} from "../../../../../dto/api-worker.dto";
import {MachineryDTOMapper} from "../../../../../dto-mapper/machinery-dto-mapper";
import {WorkerDTOMapper} from "../../../../../dto-mapper/worker-dto-mapper";
import {AlertDTOMapper} from "../../../../../dto-mapper/alert-dto-mapper";
import {ApiStatisticsDTO} from "../../../../../dto/api-statistics.dto";
import {SiteManagementService} from "../../../../../services/site-management.service";
import {MachineryType} from "../../../../../model/machinery-type";
import {Machinery} from "../../../../../model/machinery";
import {Worker} from "../../../../../model/worker";
import {StatisticsAlerts} from "../../../../../model/statistics-alerts";
import {StatisticsDTOMapper} from "../../../../../dto-mapper/statistics-dto-mapper";
import {Color, ScaleType} from "@swimlane/ngx-charts";
import {TimeHelper} from "../../../../../helpers/time-helper";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent implements OnInit {

  machineryTypeList: MachineryType[] = [] // potrei farne a meno di questo
  machineryList: Machinery[] = []
  workerList: Worker[] = []

  yearlyStatisticsAlerts!: StatisticsAlerts
  monthlyStatisticsAlerts!: StatisticsAlerts
  weeklyStatisticsAlerts!: StatisticsAlerts
  dailyStatisticsAlerts!: StatisticsAlerts

  statisticsAlerts!: StatisticsAlerts // quando preme 'weekly', 'monthly', ecc. questa variabile viene avvalorata con il valore corretto
  tagSelected = 'Y'

  constructor(private alarmsService: AlarmsService, private siteManagementService: SiteManagementService) {}

  async ngOnInit(): Promise<any> {
    await this.loadStatistics()
  }

  async loadStatistics() {
    const today = new Date();

    const year = today.getFullYear().toString();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    console.log(`Year: ${year}, Month: ${month}, Day: ${day}`);

    try {
      // Avvia entrambe le richieste contemporaneamente usando Promise.all
      const [
        machineryTypeDTOList,
        machineryDTOList,
        workerDTOList,

        yearlyStatisticsDTO,
        monthlyStatisticsDTO,
        weeklyStatisticsDTO,
        dailyStatisticsDTO
      ]: [ApiMachineryTypeDTO[], ApiMachineryDTO[], ApiWorkerDTO[], ApiStatisticsDTO?, ApiStatisticsDTO?, ApiStatisticsDTO?, ApiStatisticsDTO?] = await Promise.all([
        this.siteManagementService.loadMachineryTypes() as any,
        this.siteManagementService.loadMachineries() as any,
        this.siteManagementService.loadWorkers() as any,
        this.alarmsService.loadYearlyStatistics(year) as any,
        this.alarmsService.loadMonthlyStatistics(year, month) as any,
        this.alarmsService.loadWeeklyStatistics(year, month,day) as any,
        this.alarmsService.loadDailyStatistics(year, month,day) as any,
      ]);
      console.log('Dati caricati con successo:', machineryTypeDTOList, machineryDTOList, workerDTOList, yearlyStatisticsDTO, monthlyStatisticsDTO, weeklyStatisticsDTO, dailyStatisticsDTO );

      // from DTO to model
      this.machineryTypeList = MachineryDTOMapper.mapMachineryTypeDTOList(machineryTypeDTOList)
      this.machineryList = MachineryDTOMapper.mapMachineryDTOListToMachineryList(machineryDTOList, machineryTypeDTOList)
      this.workerList = WorkerDTOMapper.mapWorkerDTOListToWorkerList(workerDTOList)

      this.yearlyStatisticsAlerts = StatisticsDTOMapper.mapStatisticsDTOToStatisticsAlerts(this.machineryList, this.workerList, yearlyStatisticsDTO)
      this.monthlyStatisticsAlerts = StatisticsDTOMapper.mapStatisticsDTOToStatisticsAlerts(this.machineryList, this.workerList, monthlyStatisticsDTO)
      this.weeklyStatisticsAlerts = StatisticsDTOMapper.mapStatisticsDTOToStatisticsAlerts(this.machineryList, this.workerList, weeklyStatisticsDTO)
      this.dailyStatisticsAlerts = StatisticsDTOMapper.mapStatisticsDTOToStatisticsAlerts(this.machineryList, this.workerList, dailyStatisticsDTO)

      console.log(this.yearlyStatisticsAlerts)

      this.showYearlyStatistics()



    } catch (error) {
      console.error('Errore durante il caricamento dei dati:', error);
    }



  }



  view: [number, number] = [400, 200]; // Dimensione del grafico

  // Configurazione dei colori
  colorScheme: string | Color = 'cool';

  // Dati del grafico
  data: {name: string, value:number}[] = []


  // Gradient option
  gradient: boolean = false;

  // Evento di selezione
  onSelect(event: any): void {
    console.log('Elemento selezionato', event);
  }

  protected readonly TimeHelper = TimeHelper;

  showYearlyStatistics() {
    // faccio parsing per il pie chart
    this.data = this.yearlyStatisticsAlerts.alertsNumberByType.map(
      alert => {
        return {name: alert.alert, value: alert.number}
      }
    )
    this.statisticsAlerts = this.yearlyStatisticsAlerts
    this.tagSelected = 'Y'
  }

  showMonthlyStatistics() {
    // faccio parsing per il pie chart
    this.data = this.monthlyStatisticsAlerts.alertsNumberByType.map(
      alert => {
        return {name: alert.alert, value: alert.number}
      }
    )
    this.statisticsAlerts = this.monthlyStatisticsAlerts
    this.tagSelected = 'M'
  }

  showWeeklyStatistics() {
    // faccio parsing per il pie chart
    this.data = this.weeklyStatisticsAlerts.alertsNumberByType.map(
      alert => {
        return {name: alert.alert, value: alert.number}
      }
    )
    this.statisticsAlerts = this.weeklyStatisticsAlerts
    this.tagSelected = 'W'
  }

  showDailyStatistics() {
    // faccio parsing per il pie chart
    this.data = this.dailyStatisticsAlerts.alertsNumberByType.map(
      alert => {
        return {name: alert.alert, value: alert.number}
      }
    )
    this.statisticsAlerts = this.dailyStatisticsAlerts
    this.tagSelected = 'D'
  }

  isTagSelected(tagName: string): string {
    return tagName == this.tagSelected ? " selected " : ""
  }
}
