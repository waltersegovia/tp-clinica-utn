import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// 6Ld-oBgpAAAAAIqtf5385weDlA9hsPopf7BDqZQ0
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environments';
import { ComponentsModule } from './components/components.module'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { HttpClientModule } from '@angular/common/http';
import { LogsComponent } from './graficos/logs/logs.component';
//import { LogsPipe } from './pipes/logs.pipe';
import { FormsModule } from '@angular/forms';
import { PacientesProfesionalComponent } from './pages/pacientes-profesional/pacientes-profesional.component';
//import { ModalTurnoComponent } from './components/modal-turno/modal-turno.component';
import { EspecPacientePipe } from './pipes/espec-paciente.pipe';
import { EstadisticaComponent } from './graficos/estadistica/estadistica.component';
import { CardComponentDirective } from './directivas/card-component.directive';
//import { ResaltarFilaDirective } from './directivas/resaltar-fila.directive';
//import { OnlyNumberDirective } from './directivas/only-number.directive';
//import { AdministradorPipe } from './pipes/administrador.pipe';


//import { LogGraficoComponent } from './graficos/log-grafico/log-grafico.component';



@NgModule({
  declarations: [AppComponent, LogsComponent, PacientesProfesionalComponent, EspecPacientePipe, EstadisticaComponent, CardComponentDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    ComponentsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RecaptchaV3Module,
    HttpClientModule,
    FormsModule
  ],
  providers: [
  //  { provide: RECAPTCHA_V3_SITE_KEY, useValue: '6Lf6VvspAAAAADIYnrTWMZUhO6M76YGxvMf4YMso' }, 
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
