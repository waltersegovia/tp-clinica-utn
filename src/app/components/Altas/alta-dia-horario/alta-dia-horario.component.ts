import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';


@Component({
  selector: 'app-alta-dia-horario',
  templateUrl: './alta-dia-horario.component.html',
  styleUrls: ['./alta-dia-horario.component.scss']
})


export class AltaDiaHorarioComponent  implements OnInit{
  daysOfWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  calendar: any[][] = [];
  selectedDate: Date;
  @Output() diasSeleccionadosChange = new EventEmitter<string[]>();

  isVisible = true;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
 

  constructor() {}
  
  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  ngOnInit(): void {
    this.generateCalendar(new Date());
  }

  @HostListener('window:scroll', ['$event'])
  //@HostListener('document:scroll', ['$event'])
 onScroll(event: Event): void {
    const container = event.target as HTMLElement;

    // Verifica si el usuario ha llegado al final del contenedor
    if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
      // Lógica para cargar más elementos aquí
      // Puedes llamar a un método que cargue más elementos en 'profPendientes'
    }
  }



  generateCalendar(date: Date) {
    // Lógica para generar el calendario
    // ...
  }

  selectDate(date: Date) {
    this.selectedDate = date;
    // Aquí puedes guardar la fecha seleccionada en tu aplicación
    console.log('Fecha seleccionada:', date);
  }

  
}