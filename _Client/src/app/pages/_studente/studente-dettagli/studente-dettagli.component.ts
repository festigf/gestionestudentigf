import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ServiceDbStudentiService } from '../../../../Services/service-dbstudenti.service';
import { StudenteCompleto } from '../../../../Types_DBStudenti/StudenteCompleto';
import { Studente } from '../../../../Types_DBStudenti/Studente';



@Component({
  selector: 'app-studente-dettagli',
  templateUrl: './studente-dettagli.component.html',
  //styleUrls: ['./studente-dettagli-component.css']
})
export class StudenteDettagliComponent implements OnInit {
  @Input() studente1: Studente;
  @Input() x: string;
  @Output() onEditSave = new EventEmitter<Studente>();
  @Output() onEditCancel = new EventEmitter();
  studenteForm: FormGroup;
  studenteCompleto1: StudenteCompleto[];
  errmsg: string;


  constructor(private sd: ServiceDbStudentiService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.x == "modifica") {
      if (this.studente1) {
        this.studenteForm.setValue({
          'Matricola': this.studente1.Matricola,
          'Nome': this.studente1.Nome,
          'Cognome': this.studente1.Cognome,
          'Email': this.studente1.Email,
          'Data_nascita': this.studente1.Data_nascita.split('-')[2] + "-" + this.studente1.Data_nascita.split('-')[1] + "-" + this.studente1.Data_nascita.split('-')[0].replace("th", "").replace("rd", "").replace("nd", "").replace("st", ""),
          'Comune_nascita': this.studente1.Comune_nascita,
          'Telefono': this.studente1.Telefono,
          'Id_laurea': this.studente1.Id_laurea
        })
      }
    }
    else if (this.x == "mostra") {
      this.getStudente(this.studente1.Matricola);
    }

  }

  getStudente(Matricola: number) {
    this.sd.getInformazioniStudente(Matricola)
      .subscribe(res => {
        this.studenteCompleto1 = res
      },
        errorCode => this.errmsg = errorCode
      );

  }


  ngOnInit() {
    this.studenteForm = new FormGroup({
      Matricola: new FormControl({ value: -1 }, Validators.required),
      Nome: new FormControl('', [
        Validators.required,
        Validators.minLength(4)]),
      Cognome: new FormControl('', [
        Validators.required,
        Validators.minLength(4)]),
      Email: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
        Validators.email]),
      Data_nascita: new FormControl('', [
        Validators.required,
        Validators.minLength(8)]),
      Comune_nascita: new FormControl('', [
        Validators.required,
        Validators.minLength(4)]),
      Telefono: new FormControl('', [
        Validators.required,
        Validators.minLength(9),]),
      Id_laurea: new FormControl('', [
        Validators.required,
        Validators.minLength(1)]),
    });
  }


  onSubmit(formValue: Object) {
    console.log(this.studenteForm.value);
    this.sd.modInStudenti(this.studenteForm.value)
      .subscribe(res => {
        if (res.status == 200) {
          console.log("emit");
          this.onEditSave.emit(this.studenteForm.value);
        }
      }
      );
  }

  onCancel() {
    this.onEditCancel.emit();
  }

}
