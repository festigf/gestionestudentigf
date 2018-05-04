import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Studente } from '../../../Types_DBStudenti/Studente';
import { ServiceDbStudentiService } from '../../../Services/service-dbstudenti.service';


@Component({
  selector: 'app-studente-page',
  templateUrl: './studente-page.component.html',
  //styleUrls: ['./studente-page-component.css']
})

export class StudentePageComponent implements OnInit {
  studenti: Studente[];
  editStudente: Studente;
  errmsg: string;
  nuovoID: number;
  scelta: string;
  page = 1;
  nPages = 0;
  limiteEntry = 10;
  constructor(private sd: ServiceDbStudentiService) { }

  ngOnInit() {
    this.getStudenti();
  }

  onEditSave(studente: Studente) {
    this.editStudente = null;
    this.getStudenti();
  }

  onEditCancel() {
    this.editStudente = null;
  }

  getStudenti() {
    this.GetData(this.page, this.limiteEntry);
    /* this.sd.getStudenti()
    .subscribe(res => {
      this.studenti  = res      
    },
    errorCode => this.errmsg = errorCode
    ); */
  }

  OnDel(matricola) {
    this.sd.delStudenti(matricola)
      .subscribe(res => {
        console.log(res);
        if (res.status == 200) {
          this.getStudenti();
        }
      },
        errorCode => this.errmsg = errorCode
      );
  }

  OnEdit(studente: Studente) {
    this.editStudente = studente;
    this.scelta = "modifica"
  }

  OnShow(studente: Studente) {
    this.editStudente = studente;
    this.scelta = "mostra"
  }


  OnInsert() {
    this.getStudenti();
    this.nuovoID = parseInt(this.studenti[this.studenti.length - 1].Matricola.toString()) + parseInt("5");
    this.editStudente = new Studente(this.nuovoID, "", "", "", "", "", "", 1);
    this.scelta = "modifica"
  }

  GetData(indexPage: number, pageSize: number) {
    this.sd.getData(indexPage, pageSize)
      .subscribe(res => {
        this.studenti = res[0];
        console.log(res[2]);
        this.nPages = res[2][0].nPages;
      },
        errorCode => this.errmsg = errorCode
      );
  }

  onClick(page: number) {
    this.page = page;
    console.log("page");
    console.log(page);
    this.GetData(this.page, this.limiteEntry);
  }

  onChangeNumeroRighe(numeroRighe: number) {
    this.limiteEntry = numeroRighe;
    this.getStudenti();
  }
}
