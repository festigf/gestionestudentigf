import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Corso } from '../../../../Types_DBStudenti/Corso';
import { ServiceDbStudentiService } from '../../../../Services/service-dbstudenti.service';


@Component({
  selector: 'app-Corso-dettagli',
  templateUrl: './Corso-dettagli.component.html',
  //styleUrls: ['./Corso-dettagli-component.css']
})
export class CorsoDettagliComponent implements OnInit {
  @Input() Corso1 : Corso;
  @Output() onEditSave = new EventEmitter<Corso>();
  @Output() onEditCancel = new EventEmitter();
  CorsoForm: FormGroup;
  errmsg : string;
  Docenti : any[];

  constructor(private sd: ServiceDbStudentiService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.Corso1) {
      this.CorsoForm.setValue({
        'Sigla': this.Corso1.Sigla,
        'Titolo': this.Corso1.Titolo,
        //'Docente': this.Corso1.Nome,
        'Id_docente' : this.Corso1.Id_docente,
        'Cfu': this.Corso1.Cfu,
        'Ssd': this.Corso1.Ssd
      })
    }
  }

  getDocenti()
  {
    this.sd.getDocentiParz()
      .subscribe(res => {
        this.Docenti = res
        console.log(this.Docenti);
      },
        errorCode => this.errmsg = errorCode
      );
  }

  ngOnInit() {
    this.getDocenti();
    this.CorsoForm = new FormGroup({
    Sigla: new FormControl({ value: -1 }, Validators.required),  
    Id_docente: new FormControl('', [
        Validators.required,
        Validators.minLength(1)]),
    Titolo: new FormControl('', [
        Validators.required,
        Validators.minLength(4)]),
        Cfu: new FormControl('', [
            Validators.required,
            Validators.minLength(1)]),
        Ssd: new FormControl('', [
            Validators.required,
            Validators.minLength(1)]),
    });
  }

  onSubmit(formValue: Object) {
    console.log(this.CorsoForm.value);
    this.sd.modInCorso(this.CorsoForm.value)
      .subscribe(res => {
        if (res.status == 200) {
          console.log("emit");
          this.onEditSave.emit(this.CorsoForm.value);
        }
      }
      );
  }

  onCancel() {
    this.onEditCancel.emit();
  }

}
