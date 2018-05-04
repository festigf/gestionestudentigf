import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { Studente } from '../../../../Types_DBStudenti/Studente';
import { ServiceDbStudentiService } from '../../../../Services/service-dbstudenti.service';
import { StudenteCompleto } from '../../../../Types_DBStudenti/StudenteCompleto';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConoscenzaLingue } from '../../../../Types_DBStudenti/ConoscenzaLingue';
  
@Component({
  selector: 'app-LingueStudente-page',
  templateUrl: './studente-lingue.component.html',
})

export class StudenteLinguePageComponent implements OnInit {
    studenteCompleto1: StudenteCompleto[];
    listaLingueStudente : ConoscenzaLingue[];
    listaLingue : any[];
    errmsg: string;
    matricola : string;
    Aggiungi = false;
    LinguaRicercata : string = '';
    LunghezzaListaLingueStudente : number = 0;
  
    constructor(
      private sd: ServiceDbStudentiService,
      private route: ActivatedRoute,
      private location: Location
    ) { }

    ngOnInit() {
      this.matricola = this.route.snapshot.paramMap.get('id');
      this.getLingueStudente();
      this.getStudente();
      this.getListaLingue(this.LinguaRicercata);   
      
    }

    TextBoxChange(Stringa : string)
    {
      this.getListaLingue(Stringa);
    }
  
    getLingueStudente() {
      this.sd.getConoscenzaLingue(Number(this.matricola))
      .subscribe(res => {
        this.listaLingueStudente = res;
        this.LunghezzaListaLingueStudente = this.listaLingueStudente.length;
        },
          errorCode => this.errmsg = errorCode
        );
    }

    getListaLingue(Stringa : string) {
      this.sd.getLingue("%"+Stringa+"%",Number(this.matricola))
      .subscribe(res => {
        this.listaLingue = res;
        this.listaLingue.forEach(element => {
          element.isChecked = false,
          element.Scritto = "5",
          element.Orale = "5"
        });
        },
          errorCode => this.errmsg = errorCode
        );
    }


    getStudente() {
      this.sd.getInformazioniStudente(Number(this.matricola))
        .subscribe(res => {
          this.studenteCompleto1 = res
        },
          errorCode => this.errmsg = errorCode
        );
    }


  AnnullaInsLingue()
  {
    this.Aggiungi = false;
    this.getListaLingue("");
  }

  AggiungiLingue()
  {
    for (let index = 0; index < this.listaLingue.length; index++) {
      if (this.listaLingue[index].isChecked == true)
      {
        console.log("Matricola: "+this.matricola+" Lingua: " + this.listaLingue[index].Id + " Orale " + this.listaLingue[index].Orale + " Scritto " + this.listaLingue[index].Scritto);
        this.sd.InsLingua(Number(this.matricola),Number(this.listaLingue[index].Id),this.listaLingue[index].Orale,this.listaLingue[index].Scritto)
        .subscribe(res => {
          console.log(res);
          if (res.status == 200) {
            this.getListaLingue("");
            this.getLingueStudente();
          }
        });
      }
      }
     
      this.Aggiungi = false;
  }

  OnDel(Matricola : number, Id_lingua : number)
  {
    this.sd.DelLingua(Matricola, Id_lingua)
      .subscribe(res => {
        console.log(res);
        if (res.status == 200) {
          this.getListaLingue("");
          this.getLingueStudente();
        }
      },
        errorCode => this.errmsg = errorCode
      );
  }
    
  }


