import type { Doctor } from "../types";

export const doctores: Doctor[] = [
  {id: 1, nombre: "Dr. Pérez", especialidad: "Cardiologia", disponibilidad: "disponible", experiencia: 15, enConsulta: null, citas: []},
  {id: 2, nombre: "Dra. González", especialidad: "Pediatria", disponibilidad: "disponible", experiencia: 8, enConsulta: null, citas: []},
  {id: 3, nombre: "Dr. Martínez", especialidad: "Cardiologia", disponibilidad: "ausente", experiencia: 20, enConsulta: null, citas: []},
  {id: 4, nombre: "Dra. López", especialidad: "Neurologia", disponibilidad: "disponible", experiencia: 12, enConsulta: null, citas: []},
  {id: 5, nombre: "Dr. Ruiz", especialidad: "Pediatria", disponibilidad: "disponible", experiencia: 6, enConsulta: null, citas: []} 
];
