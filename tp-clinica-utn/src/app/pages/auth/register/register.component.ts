import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  isClienteActive: boolean = false;
  isProfesionalActive: boolean = false;
  isAdministradorActive: boolean = false;

  dataArray: { img: string; mail: string; contrasena: string }[] = [
    {
      img: '../../../assets/avatar-de-hombre.png',
      mail: 'daniel@gmail.com',
      contrasena: '123546',
    },
    {
      img: '../../../assets/avatar.png',
      mail: 'ariel@gmail.com',
      contrasena: '123546',
    },]

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(private router: Router) {
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

  mostrarClienteComponent() {
    this.isClienteActive = true;
    this.isProfesionalActive = false;
    this.isAdministradorActive = false;
  }
  mostrarProfesionalComponent() {
    this.isClienteActive = false;
    this.isProfesionalActive = true;
    this.isAdministradorActive = false;
  }

  mostrarAdministradorComponent() {
    this.isClienteActive = false;
    this.isProfesionalActive = false;
    this.isAdministradorActive = true;
  }

  selecte() {
    console.log('entre')
  }
  goBack() {
    this.router.navigate(['/auth']);
  }

}
