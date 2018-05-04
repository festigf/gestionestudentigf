import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Dipartimento } from '../../../../Types_DBStudenti/Dipartimento';
import { ServiceDbStudentiService } from '../../../../Services/service-dbstudenti.service';


@Component({
  selector: 'app-Dipartimento-dettagli',
  templateUrl: './Dipartimento-dettagli.component.html',
  //styleUrls: ['./Dipartimento-dettagli-component.css']
})
export class DipartimentoDettagliComponent implements OnInit {
  @Input() Dipartimento1: Dipartimento;
  @Output() onEditSave = new EventEmitter<Dipartimento>();
  @Output() onEditCancel = new EventEmitter();
  DipartimentoForm: FormGroup;

  constructor(private sd: ServiceDbStudentiService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.Dipartimento1) {
      this.DipartimentoForm.setValue({
        'Id': this.Dipartimento1.Id,
        'Nome': this.Dipartimento1.Nome,
      })
    }
  }


  ngOnInit() {
    this.DipartimentoForm = new FormGroup({
      Id: new FormControl({ value: -1 }, Validators.required),
      Nome: new FormControl('', [
        Validators.required,
        Validators.minLength(4)]),
    });
  }

  onSubmit(formValue: Object) {
    console.log(this.DipartimentoForm.value);
    this.sd.modInDipartimenti(this.DipartimentoForm.value)
      .subscribe(res => {
        if (res.status == 200) {
          console.log("emit");
          this.onEditSave.emit(this.DipartimentoForm.value);
        }
      }
      );
  }

  onCancel() {
    this.onEditCancel.emit();
  }

}
