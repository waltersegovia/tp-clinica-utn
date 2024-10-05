import { Profesional } from "./Profesional";
import { Paciente } from "./Paciente";
import HistorialClinica from "./historialClinica";
export interface Turno {
    id?:string;
    idEsp: string;
    idPac: string;
    especialista: Profesional;
    paciente: Paciente;
    historial?: HistorialClinica;
    fecha: string;
    hora:string;
    especialidad: string;
    estado: string;
    reviewEsp: string;
    reviewPac: string;
    razon?: string;
    apellido?: Profesional;
    
}


// import { Profesional } from "./Profesional";
// import { Paciente } from "./Paciente";
// import HistorialClinica from "./historialClinica";
// export interface Turno {
//     id?:string;
//     idEsp: string;
//     idPac: string;
//     especialista: Profesional;
//     paciente: Paciente;
//     historial?: HistorialClinica;
//     fecha: string;
//     hora:string;
//     especialidad: string;
//     estado: string;
//     reviewEsp: string;
//     reviewPac: string;
//     razon?: string;
//     apellido?: Profesional;
    
// }