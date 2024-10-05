import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-turnos-fin-graf',
  templateUrl: './turnos-fin-graf.component.html',
  styleUrls: ['./turnos-fin-graf.component.scss']
})
export class TurnosFinGrafComponent implements OnInit {

  public chart: Chart;
  ngOnInit(): void {

const data = {
  //labels: labels,
  labels :["1 h", "2 h", "3 h", "4 h", "5 h", "6 h", "7 h", "8 h"],
  datasets: [{
    axis: 'y',
    label: 'Turnos finalizados en un lapso de tiempo',
    data: [3, 5, 2, 8, 7, 4, 2, 3],
    fill: false,
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};

    this.chart = new Chart("chart", {
      type: 'line' as ChartType,
      data
    })
  }

  constructor(private router: Router){
  }
  goBack(){
    this.router.navigate(['/admin/seccion-paciente']);
  }


}
