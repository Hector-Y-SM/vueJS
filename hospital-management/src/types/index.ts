export interface Paciente {
  id: number,
  nombre: string,
  edad: number,
  especialidadRequerida: string,
  prioridad: "alta" | "media" | "baja",
  consultado: boolean
}

export interface Doctor {
  id: number,
  nombre: string,
  especialidad: string,
  disponibilidad: "disponible" | "ocupado" | "ausente",
  experiencia: number,
  enConsulta: Paciente | null,
  citas: Cita[]
}

export interface Cita {
  id: number,
  pacienteId:number,
  doctorId:number,
  fecha: Date,
  hora: string,
  estado: "confirmada" | "pendiente" | "completada" | "no asistio" | "en proceso"
}