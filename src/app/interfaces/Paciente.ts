export interface Paciente {
    id?: string,
    nombre: string,
    apellido: string,
    edad: string,
    dni: string,
    obraSocial: string,
    mail: string,
    password: string,
    imagen: string,
    imagen2: string,
    rol: string,
    historiaClinica?: any;
}