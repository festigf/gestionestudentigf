import { Component,OnInit } from '@angular/core';
import { Studente } from '../Types_DBStudenti/Studente';
import { Dipartimento } from '../Types_DBStudenti/Dipartimento';
import { Docente } from '../Types_DBStudenti/Docente';
import { ServiceDbStudentiService } from '../Services/service-dbstudenti.service';
import { element } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';
  constructor(private sd : ServiceDbStudentiService){}
  scelta : string;
  isCollapsed : boolean;

  ngOnInit(){
   this.scelta = "studenti";
   this.isCollapsed = false;
  }
  CambioScelta(x : string)
  {
      this.scelta = x;
      console.log(this.scelta);
  }
}
