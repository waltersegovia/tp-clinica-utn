import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { Router } from '@angular/router';
import { addDoc, collection } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { DataBaseService } from 'src/app/services/data-base.service';
import { ClinicaService } from 'src/app/services/clinica.service';
import ILogins from 'src/app/interfaces/Logins';


@Component({
  selector: 'app-log-grafico',
  templateUrl: './log-grafico.component.html',
  styleUrls: ['./log-grafico.component.scss']
})
export class LogGraficoComponent implements OnInit {

  //const fecha= new Date();
  //private fire: Firestore;
  public chart: Chart;
  public logins: ILogins[] = [];
  constructor(private router: Router, private fire: Firestore, private db: ClinicaService) {
    this.fire = fire;

    this.db
      .getObservable("logins")
      .subscribe((log) => {
        this.logins = [];
        this.logins = log as ILogins[];
        this.createCharts();
        console.log(this.logins);
      });

  }

  ngOnInit(): void {



    // const data = {
    //   // labels: labels,
    //   labels :["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
    //   datasets: [{
    //     label: 'Log de Ingresos al Sistema',

    //     //data: [65, 59, 80, 81, 56, 55, 40],
    //     data: [0, 0, 0, 0, 0, 0, 0],
    //     backgroundColor: [
    //       'rgba(255, 99, 132, 0.2)',
    //       'rgba(255, 159, 64, 0.2)',
    //       'rgba(255, 205, 86, 0.2)',
    //       'rgba(75, 192, 192, 0.2)',
    //       'rgba(54, 162, 235, 0.2)',
    //       'rgba(153, 102, 255, 0.2)',
    //       'rgba(201, 203, 207, 0.2)'
    //     ],
    //     borderColor: [
    //       'rgb(255, 99, 132)',
    //       'rgb(255, 159, 64)',
    //       'rgb(255, 205, 86)',
    //       'rgb(75, 192, 192)',
    //       'rgb(54, 162, 235)',
    //       'rgb(153, 102, 255)',
    //       'rgb(201, 203, 207)'
    //     ],
    //     borderWidth: 1
    //   }]
    // };

    // this.chart = new Chart("chart", {
    //   type: 'bar' as ChartType,
    //   data
    // })


  }

  createCharts() {


    // Paso 1: Preparar los datos
    const countsByDate = this.logins.reduce((acc, log) => {
      if (!acc[log.fecha]) {
        acc[log.fecha] = 0;
      }
      acc[log.fecha]++;
      return acc;
    }, {});

    // Paso 2: Filtrar y agrupar los datos
    const dates = Object.keys(countsByDate);
    const counts = dates.map(date => countsByDate[date]);
    console.log("datas" + dates);
    console.log("counts" + counts);
    // Paso 3: Crear los datos para el gráfico
    const chartData = {
      labels: dates,
      datasets: [{
        label: 'Registros por día',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: counts,
      }],
    };

    // Paso 4: Implementar el gráfico con Chart.js

    const myChart = new Chart("chart", {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  goBack() {
    this.router.navigate(['/admin/seccion-paciente']);
  }

  /****************************************************************************************************** */
  //login(){
  //const email=this.log.value.email;
  // const fecha= new Date();
  // //const password=this.log.value.password;
  // //this.loading = true;
  // console.log(fecha);

  // let data = collection(this.fire, 'logins');

  // addDoc(data, {fecha});

  // console.log(data);

  //   this.authLogin.loginUser(email,password)
  //    .then(()=>(
  //     this.router.navigate(["/home"])
  //    ))

  //   this.authLogin.loginUser(email,password).then((user)=>{
  //     const fechaIngreso = new Date().toLocaleString() || '';
  //     const loguser: LogUser = {
  //       usuario: email,
  //       fechaIngreso: fechaIngreso,
  //     };
  //     this.logService.logRegisterUser(loguser);
  //     this.router.navigate(['/home']);
  //   })
  //    .catch((error) => {
  //     this.loading = false; //console.error(this.loading, error);
  //     this.toastr.error(this.fireError.codeError(error.code), 'Error');
  //    }); 
  //  console.log(email,password);

  //}
}


//*************************************Para borrar********************************************* */


