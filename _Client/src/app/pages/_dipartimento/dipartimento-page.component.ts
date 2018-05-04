import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ServiceDbStudentiService } from '../../../Services/service-dbstudenti.service';
import { Dipartimento } from '../../../Types_DBStudenti/Dipartimento';



@Component({
  selector: 'app-dipartimento-page',
  templateUrl: './dipartimento-page.component.html',
  //styleUrls: ['./dipartimento-page-component.css']
})

export class DipartimentoPageComponent implements OnInit {
  dipartimenti: Dipartimento[];
  editDipartimento: Dipartimento;
  errmsg: string;
  nuovoID: number;
  limiteEntry = 10;
  constructor(private sd: ServiceDbStudentiService) {
  }

  ngOnInit() {
    this.getDipartimenti();
  }

  onEditSave(dipartimento: Dipartimento) {
    this.editDipartimento = null;
    this.getDipartimenti();
  }

  onEditCancel() {
    this.editDipartimento = null;
  }

  getDipartimenti() {
    this.sd.getDipartimenti()
      .subscribe(res => {
        this.dipartimenti = res
      },
        errorCode => this.errmsg = errorCode
      );
  }

  OnDel(id) {
    this.sd.delDipartimenti(id)
      .subscribe(res => {
        console.log(res);
        if (res.status == 200) {
          this.getDipartimenti();
        }
      },
        errorCode => this.errmsg = errorCode
      );
  }

  OnEdit(dipartimenti: Dipartimento) {
    this.editDipartimento = dipartimenti;
  }

  OnInsert() {
    this.getDipartimenti();
    this.nuovoID = parseInt(this.dipartimenti[this.dipartimenti.length - 1].Id.toString()) + parseInt("1");
    this.editDipartimento = new Dipartimento(this.nuovoID, "", );
  }

  onChangeNumeroRighe(numeroRighe: number) {
    this.limiteEntry = numeroRighe;
  }

}
