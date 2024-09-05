import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SiteManagementService} from "../../../../services/site-management.service";
import {AlarmsService} from "../../../../services/alarms.service";
import {ApiMachineryDTO} from "../../../../dto/api-machinery.dto";
import {ApiMachineryTypeDTO} from "../../../../dto/api-machinery-type.dto";
import {MachineryDTOMapper} from "../../../../dto-mapper/machinery-dto-mapper";
import {Beacon, Machinery, MachineryState} from "../../../../model/machinery";
import {BeaconFormComponent} from "../components/beacon-form/beacon-form.component";
import {animate, style, transition, trigger} from "@angular/animations";

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
  selector: 'app-machinery-info-screen',
  templateUrl: './machinery-info-screen.component.html',
  styleUrl: './machinery-info-screen.component.scss',
  animations: [listAnimation]
})
export class MachineryInfoScreenComponent implements OnInit{
  @ViewChild(BeaconFormComponent) registerBeaconFormComponent!: BeaconFormComponent


  machineryId: string = ""
  machinery?: Machinery

  isShowingRegisterBeaconForm = false


  constructor(
    private route: ActivatedRoute,
    private siteManagementService: SiteManagementService,
    private alarmService: AlarmsService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<any> {
    if (localStorage.getItem('jwt') == null) {
      // Reindirizza manualmente
      this.router.navigateByUrl('/');
    }

    this.machineryId = this.route.snapshot.paramMap.get('machineryId')!

    await this.loadMachinery(this.machineryId);
  }

  async loadMachinery(machineryId: string) {
    try {
      // Avvia entrambe le richieste contemporaneamente usando Promise.all
      const [machineryTypeDTOList, machineryDTO]: [ApiMachineryTypeDTO[], ApiMachineryDTO] = await Promise.all([
        this.siteManagementService.loadMachineryTypes() as any,
        this.siteManagementService.loadMachinery(machineryId) as any
      ]);
      console.log('Dati caricati con successo:', machineryTypeDTOList, machineryDTO);

      // from DTO to model
      this.machinery = MachineryDTOMapper.mapMachineryDTOToMachinery(machineryDTO, machineryTypeDTOList)

    } catch (error) {
      console.error('Errore durante il caricamento dei dati:', error);
    }

  }

  protected machineryStatusClass(): String {
    switch (this.machinery!.state) {
      case MachineryState.ACTIVE: return " state-active ";
      case MachineryState.INACTIVE: return " state-inactive ";
      case MachineryState.TO_CONFIGURE: return " state-to-configure ";
    }
  }

  async onFormSubmitted(beacon: Beacon) {
    console.log(beacon)

    // mappo Beacon in ApiBeaconDTO
    const beaconDTO = MachineryDTOMapper.mapBeaconToBeaconDTO(beacon)

    // registro il beacon
    try {
      const response = await this.siteManagementService.registerBeacon(beaconDTO, this.machinery!.id)
      console.log('Beacon registrato con successo:', response)

      // imposto l'id del beacon in modo da poterci accedere subito
      beacon.id = "BEACON-" + +(this.machinery!.beaconsAssociated.length+1) + "-" + beacon.position.replace(/ /g, '_').toLowerCase()


      // aggiungo il beacon nella lista dei beacons, resetto i campi e chiudo il form
      this.machinery!.beaconsAssociated.push(beacon)
      this.resetFormEntries()
      this.isShowingRegisterBeaconForm = false
    } catch (error) {
      console.error('Errore durante la registrazione:', error);
      window.alert("Beacon registration failed. \n" + error);
    }
  }

  resetFormEntries() {
    this.registerBeaconFormComponent.hideForm()
  }

  async onBeaconRemoved(beacon: Beacon) {
    console.log(beacon)


    // rimuovo il beacon
    try {
      const response = await this.siteManagementService.removeBeacon(beacon.id, this.machinery!.id)
      console.log('Beacon rimosso con successo:', response)

      // rimuovo il beacon dalla lista dei beacons
      const index = this.machinery!.beaconsAssociated.findIndex(it => it.id === beacon.id);
      this.machinery!.beaconsAssociated.splice(index, 1)
    } catch (error) {
      console.error('Errore durante la rimozione:', error);
    }

  }
}
