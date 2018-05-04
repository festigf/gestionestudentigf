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
import { StudenteDettagliComponent } from './Pages/_STUDENTE/studente-dettagli/studente-dettagli.component';
import { StudentePageComponent } from './Pages/_STUDENTE/studente-page.component';
import { DocentePageComponent } from './Pages/_DOCENTE/docente-page.component';
import { DipartimentoPageComponent } from './Pages/_DIPARTIMENTO/dipartimento-page.component';
import { DocenteDettagliComponent } from './Pages/_DOCENTE/Docente-dettagli/docente-dettagli.component';
import { DipartimentoDettagliComponent } from './Pages/_DIPARTIMENTO/Dipartimento-Dettagli/dipartimento-dettagli.component';
import { ScuolaPageComponent } from './Pages/_SCUOLA/scuola-page.component';
import { ScuolaDettagliComponent } from './Pages/_SCUOLA/Scuola-Dettagli/scuola-dettagli.component';
import { PaginationComponent } from './Pages/-COMPONENTI/pagination/pagination.component';
import { StudenteLinguePageComponent } from './Pages/_STUDENTE/Studente-Lingue/studente-lingue.component';
import { CorsoPageComponent } from './Pages/_CORSO/corso-page.component';
import { CorsoDettagliComponent } from './Pages/_CORSO/Corso-Dettagli/corso-dettagli.component';
import { StudenteEsamiPageComponent } from './Pages/_STUDENTE/Studente-Esami/studente-esami.component';

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
