import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBoxComponent } from './presentation/components/search-box/search-box.component';
import { NavigationSectionComponent } from './presentation/components/navigation-section/navigation-section.component';
import { TextTitleComponent } from './presentation/components/text-title/text-title.component';
import { AlertCardComponent } from './presentation/screens/\uD83D\uDEA8 alerts-list/components/alert-card/alert-card.component';
import { AlertsListComponent } from './presentation/screens/\uD83D\uDEA8 alerts-list/components/alerts-list/alerts-list.component';
import { SelectionPeriodSwitchComponent } from './presentation/screens/\uD83D\uDEA8 alerts-list/components/switch/selection-period-switch.component';
import { MachineriesListComponent } from './presentation/screens/\uD83D\uDEA7 machineries-list/components/machineries-list/machineries-list.component';
import { MachineriesListScreenComponent } from './presentation/screens/\uD83D\uDEA7 machineries-list/machineries-list-screen/machineries-list-screen.component';
import { MachineryCardComponent } from './presentation/screens/\uD83D\uDEA7 machineries-list/components/machinery-card/machinery-card.component';
import { RegisterMachineryFormComponent } from './presentation/screens/\uD83D\uDEA7 machineries-list/components/register-machinery-form/register-machinery-form.component';
import {SiteManagementService} from "./services/site-management.service";
import {HttpClientModule} from "@angular/common/http";
import {HostConfigService} from "./services/host-config.service";
import {AlertsListScreenComponent} from "./presentation/screens/\uD83D\uDEA8 alerts-list/alerts-list-screen/alerts-list-screen.component";
import {WorkersListScreenComponent} from "./presentation/screens/👷🏻‍ workers-list/workers-list-screen/workers-list-screen.component";
import {WorkersListComponent} from "./presentation/screens/👷🏻‍ workers-list/components/workers-list/workers-list.component";
import {WorkerCardComponent} from "./presentation/screens/👷🏻‍ workers-list/components/worker-card/worker-card.component";
import {RegisterWorkerFormComponent} from "./presentation/screens/👷🏻‍ workers-list/components/register-worker-form/register-worker-form.component";
import {WorkerRoleSelectorComponent} from "./presentation/screens/👷🏻‍ workers-list/components/worker-role-selector/worker-role-selector.component";
import {WorkerDrivingLicenceSelectorComponent} from "./presentation/screens/\uD83D\uDC77\uD83C\uDFFB\u200D workers-list/components/worker-driving-licence-selector/worker-driving-licence-selector.component";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { WorkerInfoScreenComponent } from './presentation/screens/\uD83D\uDC77\uD83C\uDFFB\u200D worker-info/worker-info-screen/worker-info-screen.component';
import { MachineryInfoScreenComponent } from './presentation/screens/\uD83D\uDEA7 machinery-info/machinery-info-screen/machinery-info-screen.component';
import { BeaconCardComponent } from './presentation/screens/\uD83D\uDEA7 machinery-info/components/beacon-card/beacon-card.component';
import { BeaconFormComponent } from './presentation/screens/\uD83D\uDEA7 machinery-info/components/beacon-form/beacon-form.component';
import { SiteConfigurationScreenComponent } from './presentation/screens/\uD83D\uDEE0\uFE0F site-configuration/site-configuration-screen/site-configuration-screen.component';
import { StatisticsComponent } from './presentation/screens/\uD83D\uDEA8 alerts-list/components/statistics/statistics.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import { LoginScreenComponent } from './presentation/screens/\uD83D\uDD10 login/login-screen/login-screen.component';
import { RegisterAlertFormComponent } from './presentation/screens/\uD83D\uDEA8 alerts-list/components/register-alert-form/register-alert-form.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkersListScreenComponent,
    SearchBoxComponent,
    WorkersListComponent,
    WorkerCardComponent,
    NavigationSectionComponent,
    TextTitleComponent,
    AlertsListComponent,
    AlertCardComponent,
    AlertsListScreenComponent,
    SelectionPeriodSwitchComponent,
    MachineriesListComponent,
    MachineriesListScreenComponent,
    MachineryCardComponent,
    RegisterWorkerFormComponent,
    WorkerRoleSelectorComponent,
    WorkerDrivingLicenceSelectorComponent,
    RegisterMachineryFormComponent,
    WorkerInfoScreenComponent,
    MachineryInfoScreenComponent,
    BeaconCardComponent,
    BeaconFormComponent,
    SiteConfigurationScreenComponent,
    StatisticsComponent,
    LoginScreenComponent,
    RegisterAlertFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxChartsModule

  ],
  providers: [
    HostConfigService,
    SiteManagementService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
