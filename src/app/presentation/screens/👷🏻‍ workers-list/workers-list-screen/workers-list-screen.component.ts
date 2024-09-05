import {Component, OnInit, ViewChild} from '@angular/core';
import {Worker, WorkerRole} from "../../../../model/worker";
import {SiteManagementService} from "../../../../services/site-management.service";
import {ApiMachineryTypeDTO} from "../../../../dto/api-machinery-type.dto";
import {ApiMachineryDTO} from "../../../../dto/api-machinery.dto";
import {MachineryDTOMapper} from "../../../../dto-mapper/machinery-dto-mapper";
import {ApiWorkerDTO} from "../../../../dto/api-worker.dto";
import {WorkerDTOMapper} from "../../../../dto-mapper/worker-dto-mapper";
import {MachineryType} from "../../../../model/machinery-type";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {RegisterWorkerFormComponent} from "../components/register-worker-form/register-worker-form.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-workers-list-screen',
  templateUrl: './workers-list-screen.component.html',
  styleUrl: './workers-list-screen.component.scss',
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
export class WorkersListScreenComponent implements OnInit{
  @ViewChild(RegisterWorkerFormComponent) registerWorkerFormComponent!: RegisterWorkerFormComponent

  workerList: Worker[] = []
  machineryTypesWithSpecificLicence: MachineryType[] = []

  isShowingRegisterWorkerForm = false

  constructor(
    private siteManagementService: SiteManagementService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    if (localStorage.getItem('jwt') == null) {
      // Reindirizza manualmente
      this.router.navigateByUrl('/');
    }

    await this.loadWorkers();
  }

  async loadWorkers() {
    try {
      // Avvia entrambe le richieste contemporaneamente usando Promise.all
      const [workerDTOList, machineryTypeDTOList]: [ApiWorkerDTO[], ApiMachineryTypeDTO[]] = await Promise.all([
        this.siteManagementService.loadWorkers() as any,
        this.siteManagementService.loadMachineryTypesWithSpecificLicence() as any
      ]);
      console.log('Dati caricati con successo:', workerDTOList, machineryTypeDTOList);

      // from DTO to model
      this.workerList = WorkerDTOMapper.mapWorkerDTOListToWorkerList(workerDTOList).sort((a, b) => {
        a.surname = a.surname//.toLowerCase()
        a.name = a.name//.toLowerCase()
        b.surname = b.surname//.toLowerCase()
        b.name = b.name//.toLowerCase()

        if (a.surname < b.surname) {
          return -1;
        } else if (a.surname > b.surname) {
          return 1;
        } else {
          // cognome is the same, compare nome
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          } else {
            return 0;
          }
        }
      });
      this.machineryTypesWithSpecificLicence = MachineryDTOMapper.mapMachineryTypeDTOList(machineryTypeDTOList)

    } catch (error) {
      console.error('Errore durante il caricamento dei dati:', error);
    }
  }

  showRegisterWorkerForm() {
    this.isShowingRegisterWorkerForm = !this.isShowingRegisterWorkerForm
    if (!this.isShowingRegisterWorkerForm) {
      this.resetFormEntries()
    }
  }


  async onFormSubmitted(worker: Worker) {
    console.log(worker)

    // mappo Worker in ApiWorkerDTO
    const workerDTO = WorkerDTOMapper.mapWorkerToWorkerDTO(worker)

    // registro il worker
    try {
      const response = await this.siteManagementService.registerWorker(workerDTO)
      console.log('Lavoratore registrato con successo:', response)

      // imposto l'id del worker in modo da poterci accedere subito
      worker.id = (response as any).data.id

      // aggiungo il worker nella lista dei workers, resetto i campi e chiudo il form
      this.workerList.push(worker)
      this.resetFormEntries()
      this.isShowingRegisterWorkerForm = false
    } catch (error) {
      console.error('Errore durante la registrazione:', error);
      window.alert("Worker registration failed.");
    }

  }

  resetFormEntries() {
    this.registerWorkerFormComponent.resetForm()
  }

  protected readonly event = event;
}
