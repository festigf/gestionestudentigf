import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { ServiceDbStudentiService } from '../../../../Services/service-dbstudenti.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
  
@Component({
  selector: 'app-EsamiStudente-page',
  templateUrl: './studente-esami.component.html',
})

export class StudenteEsamiPageComponent implements OnInit {
    errmsg: string;
    matricolaStud : string;
    nomeStud : string;
    cognomeStud : string;
    listaEsamiStudente : any[];
    listaEsami : any[];
    EsameRicercato : string = "";
    LunghezzaListaEsamiStudente : number = 0;

    constructor(
      private sd: ServiceDbStudentiService,
      private route: ActivatedRoute,
      private location: Location
    ) { }

    ngOnInit() {
      this.matricolaStud = this.route.snapshot.paramMap.get('id');
      this.nomeStud = this.route.snapshot.paramMap.get('nome');
      this.cognomeStud = this.route.snapshot.paramMap.get('cognome');

      this.getEsamiStudente();
      this.getListaEsami(this.EsameRicercato);   
      
    }

    TextBoxChange(Stringa : string)
    {
      this.getListaEsami(Stringa);
    }
  
    getEsamiStudente() {
      this.sd.getEsamiStudente(Number(this.matricolaStud))
      .subscribe(res => {
        this.listaEsamiStudente = res;
        this.LunghezzaListaEsamiStudente = this.listaEsamiStudente.length;
        },
          errorCode => this.errmsg = errorCode
        );
    }

    getListaEsami(Stringa : string) {
      this.sd.getEsami("%"+Stringa+"%",Number(this.matricolaStud))
      .subscribe(res => {
        this.listaEsami = res;
        this.listaEsami.forEach(element => {
          element.isChecked = false,
          element.Voto = 18;
        });
        },
          errorCode => this.errmsg = errorCode
        );
    }


  AggiungiEsami()
  {
    for (let index = 0; index < this.listaEsami.length; index++) {
      if (this.listaEsami[index].isChecked == true)
      {
        console.log("Matricola: "+this.matricolaStud+" Sigla: " + this.listaEsami[index].Sigla + " Voto " + this.listaEsami[index].Voto);
        this.sd.InsEsame(Number(this.matricolaStud),this.listaEsami[index].Sigla,this.listaEsami[index].Voto)
        .subscribe(res => {
          console.log(res);
          if (res.status == 200) {
            this.getEsamiStudente();
            this.getListaEsami("");
          }
        });
      }
      }
  }

  OnDel(Sigla : string)
  {
    this.sd.DelEsame(Number(this.matricolaStud), Sigla)
      .subscribe(res => {
        console.log(res);
        if (res.status == 200) {
          this.getListaEsami("");
          this.getEsamiStudente();
        }
      },
        errorCode => this.errmsg = errorCode
      );
  }

  AnnullaEsami()
  {
    this.getListaEsami("");
  }
    
  }


