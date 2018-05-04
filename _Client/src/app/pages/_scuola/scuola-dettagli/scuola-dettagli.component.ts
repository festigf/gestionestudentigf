import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Scuola } from '../../../../Types_DBStudenti/Scuola';
import { ServiceDbStudentiService } from '../../../../Services/service-dbstudenti.service';


@Component({
  selector: 'app-scuola-dettagli',
  templateUrl: './scuola-dettagli.component.html',
  //styleUrls: ['./Scuola-dettagli-component.css']
})
export class ScuolaDettagliComponent implements OnInit {
  @Input() Scuola1: Scuola;
  @Output() onEditSave = new EventEmitter<Scuola>();
  @Output() onEditCancel = new EventEmitter();
  ScuolaForm: FormGroup;

  constructor(private sd: ServiceDbStudentiService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.Scuola1) {
      this.ScuolaForm.setValue({
        'Id': this.Scuola1.Id,
        'Nome': this.Scuola1.Nome,
        'Titolo': this.Scuola1.Titolo,
        'Citta': this.Scuola1.Citta,
      })
    }
  }


  ngOnInit() {
    this.ScuolaForm = new FormGroup({
      Id: new FormControl({ value: -1 }, Validators.required),
      Nome: new FormControl('', [
        Validators.required,
        Validators.minLength(4)]),
      Citta: new FormControl('', [
        Validators.required,
        Validators.minLength(4)]),
      Titolo: new FormControl('', [
        Validators.required,
        Validators.minLength(4)]),
    });
  }

  onSubmit(formValue: Object) {
    console.log(this.ScuolaForm.value);
    this.sd.modInScuola(this.ScuolaForm.value)
      .subscribe(res => {
        if (res.status == 200) {
          console.log("emit");
          this.onEditSave.emit(this.ScuolaForm.value);
        }
      }
      );
  }

  onCancel() {
    this.onEditCancel.emit();
  }

}
