import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-turno-esp-graf',
  templateUrl: './turno-esp-graf.component.html',
  styleUrls: ['./turno-esp-graf.component.scss']
})
export class TurnoEspGrafComponent implements OnInit {

  public chart: Chart;
  ngOnInit(): void {

    const data = {
      labels: [
        'Traumatologia',
        'Gastroenterologo',
        'Dermatotologo',
        'Clinico',
        'Cardiologo'
      ],
      datasets: [{
        label: 'Cantidad de turnos por especialidad',
        data: [6, 4, 5, 3, 4],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
          'rgb(54, 162, 235)'
        ]
      }]
    };

    this.chart = new Chart("chart", {
      type: 'polarArea' as ChartType,
      data
    })
  }
  constructor(private router: Router){
  }
  goBack(){
    this.router.navigate(['/admin/seccion-paciente']);
  }

}





// ************************************************************************************************
 // ngOnInit(): void {

  //   const data = {
  //     labels: [
  //       'Eating',
  //       'Drinking',
  //       'Sleeping',
  //       'Designing',
  //       'Coding',
  //       'Cycling',
  //       'Running'
  //     ],
  //     datasets: [{
  //       label: 'Cantidad de turnos por especialidad',
  //       data: [65, 59, 90, 81, 56, 55, 40],
  //       fill: true,
  //       backgroundColor: 'rgba(255, 99, 132, 0.2)',
  //       borderColor: 'rgb(255, 99, 132)',
  //       pointBackgroundColor: 'rgb(255, 99, 132)',
  //       pointBorderColor: '#fff',
  //       pointHoverBackgroundColor: '#fff',
  //       pointHoverBorderColor: 'rgb(255, 99, 132)'
  //     }, {
  //       label: 'My Second Dataset',
  //       data: [28, 48, 40, 19, 96, 27, 100],
  //       fill: true,
  //       backgroundColor: 'rgba(54, 162, 235, 0.2)',
  //       borderColor: 'rgb(54, 162, 235)',
  //       pointBackgroundColor: 'rgb(54, 162, 235)',
  //       pointBorderColor: '#fff',
  //       pointHoverBackgroundColor: '#fff',
  //       pointHoverBorderColor: 'rgb(54, 162, 235)'
  //     }]
  //   };

  //     this.chart = new Chart("chart", {
  //       type: 'radar' as ChartType,
  //       data
  //     })

  //     // const config = {
  //     //   type: 'radar',
  //     //   data: data,
  //     //   options: {
  //     //     elements: {
  //     //       line: {
  //     //         borderWidth: 3
  //     //       }
  //     //     }
  //     //   },
  //     // };
    

  // }