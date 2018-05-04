import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ServiceDbStudentiService } from '../../../Services/service-dbstudenti.service';
import { Scuola } from '../../../Types_DBStudenti/Scuola';


@Component({
  selector: 'app-scuola-page',
  templateUrl: './scuola-page.component.html',
  //styleUrls: ['./scuola-page-component.css']
})

export class ScuolaPageComponent implements OnInit {
  Scuole: Scuola[];
  editScuola: Scuola;
  errmsg: string;
  nuovoID: number;
  limiteEntry = 10;
  constructor(private sd: ServiceDbStudentiService) {

  }

  ngOnInit() {
    this.getScuole();
  }

  onEditSave(Scuola: Scuola) {
    this.editScuola = null;
    this.getScuole();
  }

  onEditCancel() {
    this.editScuola = null;
  }

  getScuole() {
    this.sd.getScuola()
      .subscribe(res => {
        this.Scuole = res
      },
        errorCode => this.errmsg = errorCode
      );
  }

  OnDel(id) {
    this.sd.delScuole(id)
      .subscribe(res => {
        console.log(res);
        if (res.status == 200) {
          this.getScuole();
        }
      },
        errorCode => this.errmsg = errorCode
      );
  }

  OnEdit(Scuole: Scuola) {
    this.editScuola = Scuole;
  }

  OnInsert() {
    this.getScuole();
    this.nuovoID = parseInt(this.Scuole[this.Scuole.length - 1].Id.toString()) + parseInt("1");
    this.editScuola = new Scuola(this.nuovoID, "", "", "");
  }

  onChangeNumeroRighe(numeroRighe: number) {
    this.limiteEntry = numeroRighe;
    this.getScuole();
    console.log(this.limiteEntry);
  }

}
