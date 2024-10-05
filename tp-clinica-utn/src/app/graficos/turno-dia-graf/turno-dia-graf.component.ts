import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Chart, ChartType } from 'chart.js/auto';
import { Turno } from 'src/app/interfaces/Turno';
import { ClinicaService } from 'src/app/services/clinica.service';

@Component({
  selector: 'app-turno-dia-graf',
  templateUrl: './turno-dia-graf.component.html',
  styleUrls: ['./turno-dia-graf.component.scss']
})
export class TurnoDiaGrafComponent implements OnInit {

  public chart: Chart;

   public turnos: Turno[] = [];
  constructor(private router: Router, private fire: Firestore, private db: ClinicaService) {
    this.fire = fire;

    this.db
      .getObservable("turnos")
      .subscribe((log) => {
        this.turnos = [];
        this.turnos = log as Turno[];
        this.createCharts();
        console.log(this.turnos);
      });

  }

  ngOnInit(): void {

    // const data = {
    //   // labels: labels,
    //   labels :["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
    //   datasets: [{
    //     label: 'Cantidad de turnos por dia',
    //     data: [65, 59, 80, 81, 56, 55, 40],
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
    const countsByDate = this.turnos.reduce((acc, log) => {
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
 
  goBack(){
    this.router.navigate(['/admin/seccion-paciente']);
  }

}
