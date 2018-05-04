import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Docente } from '../../../../Types_DBStudenti/Docente';
import { ServiceDbStudentiService } from '../../../../Services/service-dbstudenti.service';


@Component({
  selector: 'app-Docente-dettagli',
  templateUrl: './Docente-dettagli.component.html',
  //styleUrls: ['./Docente-dettagli-component.css']
})
export class DocenteDettagliComponent implements OnInit {
  @Input() Docente1: Docente;
  @Output() onEditSave = new EventEmitter<Docente>();
  @Output() onEditCancel = new EventEmitter();
  DocenteForm: FormGroup;

  constructor(private sd: ServiceDbStudentiService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.Docente1) {
      this.DocenteForm.setValue({
        'Id': this.Docente1.Id,
        'Nome': this.Docente1.Nome,
        'Cognome': this.Docente1.Cognome,
        'Email': this.Docente1.Email,
      })
    }
  }


  ngOnInit() {
    this.DocenteForm = new FormGroup({
      Id: new FormControl({ value: -1 }, Validators.required),
      Nome: new FormControl('', [
        Validators.required,
        Validators.minLength(4)]),
      Cognome: new FormControl('', [
        Validators.required,
        Validators.minLength(4)]),
      Email: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.email]),
    });
  }

  onSubmit(formValue: Object) {
    console.log(this.DocenteForm.value);
    this.sd.modInDocenti(this.DocenteForm.value)
      .subscribe(res => {
        if (res.status == 200) {
          console.log("emit");
          this.onEditSave.emit(this.DocenteForm.value);
        }
      }
      );
  }

  onCancel() {
    this.onEditCancel.emit();
  }

}
