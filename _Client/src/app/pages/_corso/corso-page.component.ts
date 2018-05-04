import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ServiceDbStudentiService } from '../../../Services/service-dbstudenti.service';
import { Corso } from '../../../Types_DBStudenti/Corso';


@Component({
  selector: 'app-corso-page',
  templateUrl: './corso-page.component.html',
  //styleUrls: ['./Corso-page-component.css']
})

export class CorsoPageComponent implements OnInit {
  Corsi: Corso[];
  editCorso: Corso;
  errmsg: string;
  nuovoID: number;
  limiteEntry = 10;
  constructor(private sd: ServiceDbStudentiService) {

  }

  ngOnInit() {
    this.getCorsi();
  }

  onEditSave(Corso: Corso) {
    this.editCorso = null;
    this.getCorsi();
  }

  onEditCancel() {
    this.editCorso = null;
  }

  getCorsi() {
    this.sd.getCorsi()
      .subscribe(res => {
        this.Corsi = res
      },
        errorCode => this.errmsg = errorCode
      );
  }

  OnDel(sigla:string) {
    this.sd.delCorsi(sigla)
      .subscribe(res => {
        console.log(res);
        if (res.status == 200) {
          this.getCorsi();
        }
      },
        errorCode => this.errmsg = errorCode
      );
  }

  OnEdit(Corsi: Corso) {
    this.editCorso = Corsi;
  }

  OnInsert() {
    this.getCorsi();
    this.editCorso = new Corso("", "", -1, "","","");
  }

  onChangeNumeroRighe(numeroRighe: number) {
    this.limiteEntry = numeroRighe;
    this.getCorsi();
    console.log(this.limiteEntry);
  }

}
