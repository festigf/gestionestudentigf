import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ServiceDbStudentiService } from '../Services/service-dbstudenti.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';

// COMPONENTI:
import { StudenteDettagliComponent } from './pages/_studente/studente-dettagli/studente-dettagli.component';
import { StudentePageComponent } from './pages/_studente/studente-page.component';
import { DocentePageComponent } from './pages/_docente/docente-page.component';
import { DipartimentoPageComponent } from './pages/_dipartimento/dipartimento-page.component';
import { DocenteDettagliComponent } from './pages/_docente/docente-dettagli/docente-dettagli.component';
import { DipartimentoDettagliComponent } from './pages/_dipartimento/dipartimento-dettagli/dipartimento-dettagli.component';
import { ScuolaPageComponent } from './pages/_scuola/scuola-page.component';
import { ScuolaDettagliComponent } from './pages/_scuola/scuola-dettagli/scuola-dettagli.component';
import { PaginationComponent } from './pages/-componenti/pagination/pagination.component';
import { StudenteLinguePageComponent } from './pages/_studente/studente-lingue/studente-lingue.component';
import { CorsoPageComponent } from './pages/_corso/corso-page.component';
import { CorsoDettagliComponent } from './pages/_corso/corso-dettagli/corso-dettagli.component';
import { StudenteEsamiPageComponent } from './pages/_studente/studente-esami/studente-esami.component';

@NgModule({
  declarations: [
    AppComponent,
    StudenteDettagliComponent,
    StudentePageComponent,
    DocentePageComponent,
    DipartimentoPageComponent,
    DocenteDettagliComponent,
    DipartimentoDettagliComponent,
    ScuolaPageComponent,
    ScuolaDettagliComponent,
    PaginationComponent,
    StudenteLinguePageComponent,
    CorsoPageComponent,
    CorsoDettagliComponent,
    StudenteEsamiPageComponent
  ],
  imports: [
    BrowserModule, HttpModule,ReactiveFormsModule, HttpClientModule, NgxPaginationModule, NgbCollapseModule,
    AppRoutingModule, FormsModule

  ],
  providers: [ServiceDbStudentiService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
