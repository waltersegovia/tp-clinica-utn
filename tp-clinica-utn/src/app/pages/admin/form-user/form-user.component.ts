import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})

export class FormUserComponent {
  isClienteActive: boolean = true;
  isProfesionalActive: boolean = false;
  isAdmin: boolean = false; 

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(private router: Router) {}
 

  mostrarClienteComponent() {
    this.isClienteActive = true;
    this.isProfesionalActive = false;
    this.isAdmin = false;
  }
  mostrarProfesionalComponent() {
    this.isClienteActive = false;
    this.isProfesionalActive = true;
    this.isAdmin = false;
  }
  mostrarAdminComponent() {
    this.isAdmin = true;
    this.isClienteActive = false;
    this.isProfesionalActive = false;
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
