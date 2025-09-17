import type { Paciente } from "../types";

export const pacientes: Paciente[] = [
  {id: 1, nombre: "Juan Pérez", edad: 45, especialidadRequerida: "Cardiologia", prioridad: "alta", consultado: false},
  {id: 2, nombre: "María García", edad: 8, especialidadRequerida: "Pediatria", prioridad: "media", consultado: false},
  {id: 3, nombre: "Carlos Ruiz", edad: 62, especialidadRequerida: "Neurologia", prioridad: "alta", consultado: false},
  {id: 4, nombre: "Ana López", edad: 35, especialidadRequerida: "Cardiologia", prioridad: "baja", consultado: false},
  {id: 5, nombre: "Pedro Martín", edad: 12, especialidadRequerida: "Pediatria", prioridad: "alta", consultado: false},
];
