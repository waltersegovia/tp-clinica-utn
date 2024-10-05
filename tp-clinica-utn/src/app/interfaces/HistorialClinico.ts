import { Paciente } from "./Paciente";
import { Profesional } from "./Profesional";

export default interface HistorialClinico {
    id?:string;
    idEsp: string;
    idPac: string;
    especialista: Profesional;
    paciente: Paciente;
    altura: number;
    peso: number;
    temperatura: number;
    presion: string;
    datosDinamicos: DatoDinamico[];
  }
  
  interface DatoDinamico {
    clave: string;
    valor: string | number | boolean; // Puedes ajustar el tipo según tus necesidades
  }



// import { Paciente } from "./Paciente";
// import { Profesional } from "./Profesional";

// export default interface HistorialClinico {
//     id?:string;
//     idEsp: string;
//     idPac: string;
//     especialista: Profesional;
//     paciente: Paciente;
//     altura: number;
//     peso: number;
//     temperatura: number;
//     presion: string;
//     datosDinamicos: DatoDinamico[];
//   }
  
//   interface DatoDinamico {
//     clave: string;
//     valor: string | number | boolean; // Puedes ajustar el tipo según tus necesidades
//   }