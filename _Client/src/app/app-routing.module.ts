import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { StudentePageComponent } from './pages/_studente/studente-page.component';
import { StudenteLinguePageComponent } from './pages/_studente/studente-lingue/studente-lingue.component';
import { ScuolaPageComponent } from './pages/_scuola/scuola-page.component';
import { DipartimentoPageComponent } from './pages/_dipartimento/dipartimento-page.component';
import { DocentePageComponent } from './pages/_docente/docente-page.component';
import { CorsoPageComponent } from './pages/_corso/corso-page.component';
import { StudenteEsamiPageComponent } from './pages/_studente/studente-esami/studente-esami.component';


const appRoutes: Routes = [
    { path: 'Studenti', component: StudentePageComponent },
    { path: 'Studenti/Lingue/:id', component: StudenteLinguePageComponent },
    { path: 'Studenti/Esami/:id/:nome/:cognome', component: StudenteEsamiPageComponent },
    { path: 'Scuole', component: ScuolaPageComponent },
    { path: 'Corsi', component:  CorsoPageComponent},
    { path: 'Dipartimenti', component: DipartimentoPageComponent },
    { path: 'Docenti', component: DocentePageComponent },
    { path: 'Error404', component: StudentePageComponent },
    { path: '',   redirectTo: '/Studenti',pathMatch: 'full' },
    { path: '**', redirectTo: '/Error404' }
    //
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      //{ enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}