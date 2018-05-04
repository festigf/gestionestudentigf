import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { StudentePageComponent } from './Pages/_STUDENTE/studente-page.component';
import { StudenteLinguePageComponent } from './Pages/_STUDENTE/Studente-Lingue/studente-lingue.component';
import { ScuolaPageComponent } from './Pages/_SCUOLA/scuola-page.component';
import { DipartimentoPageComponent } from './Pages/_DIPARTIMENTO/dipartimento-page.component';
import { DocentePageComponent } from './Pages/_DOCENTE/docente-page.component';
import { CorsoPageComponent } from './Pages/_CORSO/corso-page.component';
import { StudenteEsamiPageComponent } from './Pages/_STUDENTE/Studente-Esami/studente-esami.component';


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