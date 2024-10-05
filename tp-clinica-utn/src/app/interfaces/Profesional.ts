export interface Profesional {
    id?: string,
    nombre: string,
    apellido: string,
    edad: string,
    dni: string,
    mail: string,
    password: string,
    imagen: string,
    estado: string,
    agenda?: boolean[],
    especialidades?: string[];
    rol: string,
}