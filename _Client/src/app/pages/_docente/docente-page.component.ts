import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Docente } from '../../../Types_DBStudenti/Docente';
import { ServiceDbStudentiService } from '../../../Services/service-dbstudenti.service';


@Component({
  selector: 'app-docente-page',
  templateUrl: './docente-page.component.html',
  //styleUrls: ['./docente-page-component.css']
})

export class DocentePageComponent implements OnInit {
  docenti: Docente[];
  editDocente: Docente;
  errmsg: string;
  nuovoID: number;
  limiteEntry = 10;
  constructor(private sd: ServiceDbStudentiService) { }

  ngOnInit() {
    this.getDocenti();
  }

  onEditSave(docente: Docente) {
    this.editDocente = null;
    this.getDocenti();
  }

  onEditCancel() {
    this.editDocente = null;
  }

  getDocenti() {
    this.sd.getDocenti()
      .subscribe(res => {
        this.docenti = res
      },
        errorCode => this.errmsg = errorCode
      );
  }

  OnDel(id) {
    this.sd.delDocenti(id)
      .subscribe(res => {
        console.log(res);
        if (res.status == 200) {
          this.getDocenti();
        }
      },
        errorCode => this.errmsg = errorCode
      );
  }

  OnEdit(docente: Docente) {
    this.editDocente = docente;
  }

  OnInsert() {
    this.getDocenti();
    this.nuovoID = parseInt(this.docenti[this.docenti.length - 1].Id.toString()) + parseInt("1");
    this.editDocente = new Docente(this.nuovoID, "", "", "");
  }

  onChangeNumeroRighe(numeroRighe: number) {
    this.limiteEntry = numeroRighe;
  }

}
