import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WorkersListScreenComponent} from "./presentation/screens/\uD83D\uDC77\uD83C\uDFFB\u200D workers-list/workers-list-screen/workers-list-screen.component";
import {AlertsListScreenComponent} from "./presentation/screens/\uD83D\uDEA8 alerts-list/alerts-list-screen/alerts-list-screen.component";
import {MachineriesListScreenComponent} from "./presentation/screens/\uD83D\uDEA7 machineries-list/machineries-list-screen/machineries-list-screen.component";
import {WorkerInfoScreenComponent} from "./presentation/screens/👷🏻‍ worker-info/worker-info-screen/worker-info-screen.component";
import {MachineryInfoScreenComponent} from "./presentation/screens/🚧 machinery-info/machinery-info-screen/machinery-info-screen.component";
import {SiteConfigurationScreenComponent} from "./presentation/screens/🛠️ site-configuration/site-configuration-screen/site-configuration-screen.component";
import {LoginScreenComponent} from "./presentation/screens/🔐 login/login-screen/login-screen.component";

const routes: Routes = [
  { path: 'alerts', component: AlertsListScreenComponent },
  { path: 'workers', component: WorkersListScreenComponent },
  { path: 'machineries', component: MachineriesListScreenComponent },
  { path: 'worker/:workerId', component: WorkerInfoScreenComponent },
  { path: 'machinery/:machineryId', component: MachineryInfoScreenComponent },
  { path: 'site-configuration', component: SiteConfigurationScreenComponent },
  { path: '', component: LoginScreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
