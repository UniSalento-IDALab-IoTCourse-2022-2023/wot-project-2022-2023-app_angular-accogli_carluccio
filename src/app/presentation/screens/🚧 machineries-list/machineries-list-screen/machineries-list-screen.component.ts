import {Component, OnInit, ViewChild} from '@angular/core';
import {Machinery} from "../../../../model/machinery";
import {SiteManagementService} from "../../../../services/site-management.service";
import {ApiMachineryTypeDTO} from "../../../../dto/api-machinery-type.dto";
import {ApiMachineryDTO,} from "../../../../dto/api-machinery.dto";
import {MachineryDTOMapper} from "../../../../dto-mapper/machinery-dto-mapper";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MachineryType} from "../../../../model/machinery-type";
import {Worker} from "../../../../model/worker";
import {WorkerDTOMapper} from "../../../../dto-mapper/worker-dto-mapper";
import {
  RegisterWorkerFormComponent
} from "../../👷🏻‍ workers-list/components/register-worker-form/register-worker-form.component";
import {RegisterMachineryFormComponent} from "../components/register-machinery-form/register-machinery-form.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-machineries-list-screen',
  templateUrl: './machineries-list-screen.component.html',
  styleUrl: './machineries-list-screen.component.scss',
  animations: [trigger('formAnimation', [
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
  ])
  ]
})
export class MachineriesListScreenComponent implements OnInit {
  @ViewChild(RegisterMachineryFormComponent) registerMachineryFormComponent!: RegisterMachineryFormComponent

  machineryList: Machinery[] = []
  machineryTypeList: MachineryType[] = []

  isShowingRegisterMachineryForm = false


  constructor(
    private siteManagementService: SiteManagementService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    if (localStorage.getItem('jwt') == null) {
      // Reindirizza manualmente
      this.router.navigateByUrl('/');
    }

    await this.loadMachineries();
  }



  async loadMachineries() {
    try {

      // Avvia entrambe le richieste contemporaneamente usando Promise.all
      const [machineryTypeDTOList, machineryDTOList]: [ApiMachineryTypeDTO[], ApiMachineryDTO[]] = await Promise.all([
        this.siteManagementService.loadMachineryTypes() as any,
        this.siteManagementService.loadMachineries() as any
      ]);
      console.log('Dati caricati con successo:', machineryTypeDTOList, machineryDTOList);

      // from DTO to model
      this.machineryList = MachineryDTOMapper.mapMachineryDTOListToMachineryList(machineryDTOList, machineryTypeDTOList)
      this.machineryTypeList = MachineryDTOMapper.mapMachineryTypeDTOList(machineryTypeDTOList)

    } catch (error) {
      console.error('Errore durante il caricamento dei dati:', error);
    }
  }


  showRegisterMachineryForm() {
    this.isShowingRegisterMachineryForm = !this.isShowingRegisterMachineryForm
    if (!this.isShowingRegisterMachineryForm) {
      this.resetFormEntries()
    }
  }


  async onFormSubmitted(machinery: Machinery) {
    console.log(machinery)

    // mappo Machinery in ApiWorkerDTO
    const machineryDTO = MachineryDTOMapper.mapMachineryToMachineryRegistrationDTO(machinery)

    // registro il macchinario
    try {
      const response = await this.siteManagementService.registerMachinery(machineryDTO)
      console.log('Macchinario registrato con successo:', response)

      // imposto l'id del macchinario in modo da poterci accedere subito
      machinery.id = (response as any).data.id


      // aggiungo il macchinario nella lista dei macchinari, resetto i campi e chiudo il form
      this.machineryList.push(machinery)
      this.resetFormEntries()
      this.isShowingRegisterMachineryForm = false
    } catch (error) {
      console.error('Errore durante la registrazione:', error);
      window.alert("Machinery registration failed. \n" + error);
    }

  }

  resetFormEntries() {
    this.registerMachineryFormComponent.resetForm()
  }

}
