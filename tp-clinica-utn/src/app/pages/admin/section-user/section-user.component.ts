import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { Item } from 'src/app/components/layout/layout.component';
import { ListProfPendientesComponent } from 'src/app/components/list-prof-pendientes/list-prof-pendientes.component';
import { LogsComponent } from 'src/app/graficos/logs/logs.component';
import ILogins from 'src/app/interfaces/Logins';
import { Profesional } from 'src/app/interfaces/Profesional';
import { AuthService } from 'src/app/services/auth.service';
import { ClinicaService } from 'src/app/services/clinica.service';
import { format } from 'date-fns';
import { Turno } from 'src/app/interfaces/Turno';
import html2canvas from 'html2canvas';
//import { FormUserComponent } from '../form-user/form-user.component';
import * as moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import jsPDF from 'jspdf';
import { HttpClient } from '@angular/common/http';
//import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { OtroService } from 'src/app/services/otro.service';
import { Paciente } from 'src/app/interfaces/Paciente';


@Component({
  selector: 'app-section-user',
  templateUrl: './section-user.component.html',
  styleUrls: ['./section-user.component.scss'],

})
export class SectionUserComponent implements OnInit {
  profPendientes: Profesional[] = [];
  // isClienteActive: boolean = true;
  // isProfesionalActive: boolean = false;
  // isAdmin: boolean = false; 
  usuarios: any;
  usuarios2: any[] = []; // Suponiendo que tienes un arreglo de usuarios
  pendiente: ListProfPendientesComponent;
  //clinicaFire2: ClinicaService;

  public chart: Chart;
  public chart2: Chart;
  public chart3: Chart;
  public chart4: Chart;
  public logins: ILogins[] = [];
  public turnos: Turno[] = [];

  public logFecha: Date;
  //public logFecha: string;
  public med: any;
  public espec: any;
  public g: number = 0;
  public clin: number = 0;
  public cardio: number = 0;
  public derma: number = 0;
  public gastro: number = 0;
  public pedia: number = 0;
  public trauma: number = 0;
  public nutri: number = 0;

  public fecha1: string;
  public fecha2: string;
  public doc1: number = 0;
  public doc2: number = 0;
  public doc3: number = 0;
  public doc4: number = 0;

  input1: Date;
  input2: Date;
  input3: Date;
  input4: Date;
  input1f: Date;
  input2f: Date;
  miRol: string;
  pacientes: Paciente[] = [];
  miUID: string;
  idTipo: string = 'idPac';
  //public logs: LogsComponent;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @ViewChild('canvasContainer', { static: false }) canvasContainer: ElementRef;


  constructor(private otroService: OtroService, private clinicaFire: ClinicaService, private auth: AuthService,
     private router: Router, private fire: Firestore, private http: HttpClient) {
    this.fire = fire;
    // this.forms = forms;
    // this.clinicaFire.getLogins().subscribe((data)=> {
    // this.logins = data;
    // })


  }


  items: Item[] = [
    {
      title: 'Inicio',
      link: '/',
      active: true,
    },
    {
      title: 'Admin',
      link: '/admin',
      active: true
    }
  ]
  //******************************PDF Canvas 1ro***************************************** */
  ngAfterViewInit() {
    this.drawCanvas();
  }

  drawCanvas() {
    const canvas = document.getElementById('chart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.fillStyle = '#FF0000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }

  downloadPDF() {
    const data = this.canvasContainer.nativeElement;
    html2canvas(data).then(canvas => {
      const imgWidth = 208;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('canvas.pdf');
    });
  }

  //******************************************************************************** */
  logout() {
    this.auth.logout().then(() => {
      this.router.navigate(['/auth']);
    });
  }


  ngOnInit(): void {
    this.clinicaFire.getProfesionales().subscribe((data) => {
      this.profPendientes = data;
    })
    this.clinicaFire.getUsuarios().subscribe((data) => {
      this.usuarios = data;
    })

    this.clinicaFire
      .getObservable("turnos")
      .subscribe((log) => {
        this.turnos = [];
        this.turnos = log as Turno[];
        this.createCharts();
        console.log("TURNOS" + this.turnos);
      });

    this.clinicaFire
      .getObservable("turnos")
      .subscribe((log) => {
        this.turnos = [];
        this.turnos = log as Turno[];
        this.createCharts2();
        console.log(this.turnos);
      });

    this.clinicaFire
      .getObservable("turnos")
      .subscribe((log) => {
        this.turnos = [];
        this.turnos = log as Turno[];
        //this.createCharts3();
        console.log(this.turnos);
      });

    this.createCharts3();
    this.createCharts4();

    this.otroService.getDocumentSnapshotDeUsuario().subscribe((ds) => {
      this.miRol = ds.data().rol;
      if (this.miRol === 'Administrador') {
        this.clinicaFire.getPaciente().subscribe((dpacientes) => {
          this.pacientes = dpacientes;
        }
        );
      } else {
        this.miUID = ds.id;
        if (this.miRol === 'Profesional') {
          this.idTipo = 'idEsp';
        }
        //obtene todos los pacienete del profesional
        //this.obtenerTurnos(this.idTipo, this.miUID);
      }
    });
  }


  async onAceptarRechazar(id: string, value: string) {
    await this.clinicaFire.updateProfesional(id, value);
  }

  // mostrarClienteComponent() {
  //   this.isClienteActive = true;
  //   this.isProfesionalActive = false;
  //   this.isAdmin = false;
  // }
  // mostrarProfesionalComponent() {
  //   this.isClienteActive = false;
  //   this.isProfesionalActive = true;
  //   this.isAdmin = false;
  // }
  // mostrarAdminComponent() {
  //   this.isAdmin = true;
  //   this.isClienteActive = false;
  //   this.isProfesionalActive = false;
  // }


  @HostListener('window:scroll', ['$event'])

  onScroll(event: Event): void {
    const container = event.target as HTMLElement;

    // Verifica si el usuario ha llegado al final del contenedor
    if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
      // Lógica para cargar más elementos aquí
      // Puedes llamar a un método que cargue más elementos en 'profPendientes'
    }
  }

  aceptarRechazar2(id: string, value: string) {
    this.pendiente.aceptarRechazar(id, value);
  }

  setSelectedItem2(item: Profesional | null) {
    this.pendiente.setSelectedItem(item);
  }

  //*********************************************************** */
  createCharts() {

    // Paso 1: Preparar los datos
    // {log.fecha.toDate() | date:'MM/dd HH:mm'}
    //{ turno.especialista | doctor }
    //timestamp | date:'dd/MM/yyyy'

    const countsByDate = this.turnos.reduce((acc, turno) => {
      if (!acc[turno.especialidad]) {
        acc[turno.especialidad] = 0;
      }
      acc[turno.especialidad]++;
      return acc;


      // if (!acc[turno.especialidad] || acc[turno.especialidad]) {
      //   switch (turno.especialidad) {
      //     case "Clinico":
      //       this.clin++;
      //       break;
      //     case "Cardiología":
      //       this.cardio++;
      //       break;
      //     case "Dermatología":
      //       this.derma++;
      //       break;
      //     case "Gastroenterología":
      //       this.gastro++;
      //       break;
      //     case "Nutricionista":
      //       this.nutri++;
      //       break;
      //     case "Pediatría":
      //       this.pedia++;
      //       break;
      //     case "Traumatología":
      //       this.trauma++;
      //       break

      //     default:
      //       break;
      //   }
      //   //while (this.a<7) {
      //   acc[turno.especialidad] = "Clinico";
      //   acc[turno.especialidad] = "Dermatología";
      //   acc[turno.especialidad] = "Cardiología";
      //   acc[turno.especialidad] = "Gastroenterología";
      //   acc[turno.especialidad] = "Pediatría";
      //   acc[turno.especialidad] = "Nutricionista";
      //   acc[turno.especialidad] = "Traumatología";
      //   //}

      //   this.espec = [this.clin, this.derma, this.cardio, this.gastro, this.pedia, this.nutri, this.trauma];
      // } //else{
      // // this.espec = this.espec[this.clin, this.cardio, this.derma, this.nutri, this.pedia, this.gastro, this.trauma];
      // //const chartData = this.espec;
      // //acc = this.espec;
      // //acc[turno.especialidad]++;
      // //}


      // acc[turno.especialidad]++;
      // //console.log("ACC:" + acc);
      // return acc;

    }, {});

    //this.espec = [this.clin, this.cardio, this.derma, this.nutri, this.pedia, this.gastro, this.trauma];
    //const labels = Utils.months({ count: 7 });
    // const dates = Object.keys(countsByDate);
    // const counts = dates.map(date => countsByDate[date]);
    // console.log("Espec:" + this.espec);

    // if (this.chart) {
    //   this.chart.destroy();
    //   console.log("Chart Destroy!!")
    // }

    // const chartData = {
    //   labels: dates,
    //   datasets: [{
    //     label: 'Turnos por Especialidad',
    //     data: [this.clin, this.derma, this.cardio, this.gastro, this.pedia, this.nutri, this.trauma],
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
    //     borderWidth: 1,
    //     //data: counts,
    //   }],


    // Paso 2: Filtrar y agrupar los datos

    const dates = Object.keys(countsByDate);
    const counts = dates.map(date => countsByDate[date]);
    console.log("datas" + dates);
    console.log("counts" + counts);
    // Paso 3: Crear los datos para el gráfico
    const chartData = {
      labels: dates,
      datasets: [{
        label: 'Especialidad',
        backgroundColor: 'rgba(255, 205, 86, 0.2)',
        borderColor: 'rgb(201, 203, 207)',
        borderWidth: 1,
        data: counts,
      }],
    };
    // Destruir el gráfico anterior si existe
    // if (this.chart) {
    //   this.chart.destroy();
    //   console.log("Chart Destroy!!")
    // }

    // Paso 4: Implementar el gráfico con Chart.js

    this.chart = new Chart("chart", {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              color: 'orangered',
            },
          },

          y: {
            beginAtZero: true,
            ticks: {
              color: 'green',
            },

          },
        },
        plugins: {
          legend: {
            labels: {
              color: 'orangered' // Color de las etiquetas de la leyenda
            }
          }
        }
      },
    });
  }
  //************************************************************ */
  // 2do Graf Turnos por dia
  createCharts2() {
    // Destruir el gráfico anterior si existe
    if (this.chart2) {
      this.chart2.destroy();
      console.log("Chart2 Destroy!!")
        ;
    }

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
        label: 'Día',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: counts,
      }],
    };

    // Paso 4: Implementar el gráfico con Chart.js

    this.chart2 = new Chart("chart2", {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              color: 'orangered',
            },
          },

          y: {
            beginAtZero: true,
            ticks: {
              color: 'green',
            },

          },

        },
        plugins: {
          legend: {
            labels: {
              color: 'orangered' // Color de las etiquetas de la leyenda
            }
          }
        }
      },
    });
  }
  /*****************************3er Graf*********************************** ***/

  createCharts3() {

    // Paso 1: Preparar los datos
    const countsByDate = this.turnos.reduce((acc, log) => {

      this.logFecha = moment(log.fecha, "DD/MM").toDate();
      this.input3 = moment(this.input1, "YYYY/MM/DD").toDate();//Desde
      this.input4 = moment(this.input2, "YYYY/MM/DD").toDate();//Hasta
      //this.logFecha=this.convertStringToDate(log.fecha);
      // console.log("Conversion: " + log.fecha + " a " + this.logFecha);
      // console.log("Conversion I1 a I3: " + this.input1 + " a " + this.input3);
      console.log("logFecha Base: " + this.logFecha);

      if (!acc[log.especialista.apellido] && this.logFecha >= this.input3 && this.logFecha <= this.input4) {
        acc[log.especialista.apellido] = 0;
      }

      acc[log.especialista.apellido]++;
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
        label: 'Médico',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: counts,
      }],

    };

    // Destruir el gráfico anterior si existe
    if (this.chart3) {
      this.chart3.destroy();
      console.log("Chart3 Destroy!!");
    }

    // Paso 4: Implementar el gráfico con Chart.js

    this.chart3 = new Chart("chart3", {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              color: 'orangered',
            },
          },

          y: {
            beginAtZero: true,
            ticks: {
              color: 'green',
            },

          },
        },
        plugins: {
          legend: {
            labels: {
              color: 'orangered' // Color de las etiquetas de la leyenda
            }
          }
        }
      },
    });
  }
  /****************************4to Graf************************************** */

  createCharts4() {

    // Paso 1: Preparar los datos
    const countsByDate = this.turnos.reduce((acc, log) => {

      this.logFecha = moment(log.fecha, "DD/MM").toDate();
      this.input3 = moment(this.input1f, "YYYY/MM/DD").toDate();//Desde
      this.input4 = moment(this.input2f, "YYYY/MM/DD").toDate();//Hasta
      //this.logFecha=this.convertStringToDate(log.fecha);
      // console.log("Conversion: " + log.fecha + " a " + this.logFecha);
      // console.log("Conversion I1 a I3: " + this.input1 + " a " + this.input3);
      console.log("logFecha Base: " + this.logFecha);
      // if (this.logFecha >= this.input3 && this.logFecha <= this.input4) {
      //   console.log("Fecha Base" + this.logFecha + "es >= a" + this.input3+ "y"+ this.logFecha + "<= a"+ this.input4);

      //   acc[log.especialista.apellido]=0;

      // }

      if (!acc[log.especialista.apellido] && (log.estado == "finalizado") && this.logFecha >= this.input3 && this.logFecha <= this.input4) {
        acc[log.especialista.apellido] = 0;
      }

      acc[log.especialista.apellido]++;
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
        label: 'Finalizados',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: counts,
      }],
      //'rgba(255, 99, 132, 0.2)', //'rgba(75, 192, 192, 0.2)'
    };

    // Destruir el gráfico anterior si existe
    if (this.chart4) {
      this.chart4.destroy();
      console.log("Chart4 Destroy!!");
    }

    // Paso 4: Implementar el gráfico con Chart.js

    this.chart4 = new Chart("chart4", {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              color: 'orangered',
            },
          },

          y: {
            beginAtZero: true,
            ticks: {
              color: 'green',
            },

          },
        },
        plugins: {
          legend: {
            labels: {
              color: 'orangered' // Color de las etiquetas de la leyenda
            }
          }
        }
      },
    });
  }

  /************************************************************************** */
  handleButton() {
    console.log("Entrada 1:", this.input1);
    console.log("Entrada 2:", this.input2);

    // this.clinicaFire
    // .getObservable("turnos")
    // .subscribe((log) => {
    //   this.turnos = [];
    //   this.turnos = log as Turno[];
    //   this.createCharts3();
    //   console.log(this.turnos);
    // });
    this.createCharts3();
  }

  handleButton2() {
    console.log("Entrada 1:", this.input1f);
    console.log("Entrada 2:", this.input2f);
    this.createCharts4();
  }

  // Método para convertir una cadena dd/mm a un objeto Date en formato yyyy-mm-dd
  convertStringToDate(dateString: string): string {
    const [day, month] = dateString.split('/').map(Number);
    const year = new Date().getFullYear(); // Asumimos el año actual
    const date = new Date(year, month - 1, day); // Los meses en Date son 0-indexed, por lo que restamos 1
    return this.formatDate(date);
  }

  // Método para formatear un objeto Date a yyyy-mm-dd
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Añadir ceros iniciales si es necesario
    const day = ('0' + date.getDate()).slice(-2); // Añadir ceros iniciales si es necesario
    return `${year}-${month}-${day}`;
  }

  async crearPdf(chart: string, titulo: string) {
    try {
      const element = document.getElementById(chart); // Capture the entire container
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      const subtitulo = 'TU CLINICA ONLINE';
      //subtitulo = subtitulo;
      const pdf = new jsPDF();

      // Get today's date and format it (optional)
      const today = new Date().toLocaleDateString(); // Adjust formatting as needed

      // Add Date of Emission
      pdf.text(`Emisión estadistica: ${today}`, 10, pdf.internal.pageSize.height - 10); // Add to bottom

      // Load the image
      const imageData = await fetch("../../../assets/icon-clinica.png") // Replace with your image URL
        .then(response => response.blob())
        .then(blob => new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror
            = reject;
          reader.readAsDataURL(blob);

        }));

      // Add the image to the PDF
      pdf.addImage(imageData, 'PNG', 10, 10, 20, 20); // Adjust image position and size

      // Titulo 
      const titleElement = document.querySelector(titulo) as HTMLElement;
      const title = titleElement.textContent;

      // Set font type and size
      pdf.setFontSize(16); // Adjust font size as needed
      pdf.setFont("helvetica", "bold"); // Set font type to Helvetica and bold
      // Add Titulo principal
      pdf.text(title, 60, 35); // Adjust title position and font size

      // Get Subtitle Text (if provided)
      const subtitle = subtitulo ? subtitulo : ''; // Set empty string as default
      // Add Subtitle
      pdf.text(subtitle, 70, 20, { fontSize: 12 }); // Adjust subtitle position and font size

      // Add Chart Image
      pdf.addImage(imgData, 'PNG', 50, 40, 100, 60); // Adjust chart position and size

      pdf.save(title);
    } catch (error) {
      console.error('Error al crear el PDF:', error);
    }
  }


  descargarExcel() {

    // Crear un array de datos a partir de la lista de usuarios
    const data: any[] = this.usuarios.map(usuario => ({
      Nombre: usuario.nombre,
      Apellido: usuario.apellido,
      Correo: usuario.mail,
      DNI: usuario.dni,
      //Foto: usuario.imagen,
      Tipo: usuario.rol
    }));

    // Crear una hoja de trabajo a partir de los datos
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    // Crear un libro de trabajo y agregar la hoja
    const workbook: XLSX.WorkBook = { Sheets: { 'Usuarios': worksheet }, SheetNames: ['Usuarios'] };

    // Exportar el libro a un archivo Excel
    XLSX.writeFile(workbook, 'usuarios.xlsx');
  }

  async crearPdfPaciente(id: string) {
    const bodyData = [];
    bodyData.push(['Especialidad', 'Doctor', 'Historial', 'Fecha', 'Hora']);

    this.turnos.forEach((turno) => {
      if (turno.idPac==id) {
        const rowData = [
          turno.especialidad,
          this.miRol === 'Profesional' || this.miRol === 'Administrador'
            ? `${turno.especialista.nombre} ${turno.especialista.apellido}`
            : '',
          turno.historial
            ? `Altura: ${turno.historial.altura} - Peso: ${turno.historial.peso} - Temperatura: ${turno.historial.temperatura} \n Presion: ${turno.historial.presion}
             ${turno.historial.datosDinamicos?.map(dato => `${dato['clave']}: ${dato['valor']}`).join('\n') || ''}` // - Clave: ${turno.historial.clave1} - Valor: ${turno.historial.valor1}
            : 'Sin Historial',
          turno.fecha,
          turno.hora,
        ];

        bodyData.push(rowData);
      }
      

      
    });

    const docDefinition = {
      content: [
        {
          layout: 'noBorders',
          table: {
            widths: ['*', 'auto', '*'],
            body: [
              [
                {
                  image: await this.getBase64ImageFromURL(
                    "../../../assets/icon-clinica.png"
                  ),
                  width: 60, // Ajusta el ancho según tus necesidades
                  alignment: 'left',
                },
                {
                  text: 'Clínica Online', // Nombre de tu clínica
                  style: 'subheader',
                  alignment: 'center',
                },
                {
                  text: `${new Date().toLocaleDateString()}`, // Fecha de emisión
                  alignment: 'right',
                },
              ],
            ],
          },
        },
        { text: '\n' }, // Espacio entre el encabezado y la tabla
        {
          style: 'tableExample',
          table: {
            body: bodyData,
          },
        },
      ],

      styles: {
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
      },
    };

    pdfMake.createPdf(docDefinition).download('historial.pdf');
  }

  getBase64ImageFromURL(url: string) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx!.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }

  getColor(usuario: any): string {
    if (usuario.rol === 'Administrador') {
      return '#e87624';
    } else if (usuario.rol === 'Profesional') {
      return '#c02c20';
    } else {
      return 'blue';
    }
  }
}
