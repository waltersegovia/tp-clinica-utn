import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
//import ILogins from 'src/app/interfaces/Logins';
import { ClinicaService } from 'src/app/services/clinica.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void => *', [
        animate('1000ms ease-in')
      ])
    ])
  ]
})
export class LogsComponent {
  public logins: any;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  
  //public logins: ILogins[] = [];
  // , private auth: AuthService, 
  constructor(private clinicaFire: ClinicaService, private router: Router, private fire: Firestore) {
    this.fire = fire;

    this.clinicaFire.getLogins().subscribe((data)=> {
      this.logins = data;
    })

    // this.clinicaFire
    //   .getObservable("logins")
    //   .subscribe((log) => {
    //     this.logins = [];
    //     this.logins = log as ILogins[];
    //     //this.createCharts();
    //     console.log(this.logins);
    //   });
  }

  @HostListener('window:scroll', ['$event'])

  onScroll(event: Event): void {
    const container = event.target as HTMLElement;

    // Verifica si el usuario ha llegado al final del contenedor
    if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
      // Lógica para cargar más elementos aquí
      // Puedes llamar a un método que cargue más elementos en 'profPendientes'
    }
  }

  goBack() {
    this.router.navigate(['/admin/inicio']);
  }
}
