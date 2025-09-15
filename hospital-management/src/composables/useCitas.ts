import { doctores } from "@/data/doctores";
import { pacientes } from "@/data/pacientes";
import type { Cita, Doctor, Paciente } from "@/types";
import { ref } from "vue";

let proximaIdcita = ref(1);

function ordenarPacientes(p: Paciente) {
  if (p.edad >= 60 && p.prioridad == "alta"){
    return 2
  }
  if(p.prioridad == "alta"){
    return 1
  }
  return 0;
}

function asignarDoctores(p: Paciente){
  const esCritico = ordenarPacientes(p) == 2;
  const doctorDisponible = doctores.filter( d =>
    d.disponibilidad != "ausente" && d.especialidad === p.especialidadRequerida
  );

  if(!doctorDisponible){
    console.log('no hay ningyn disponible para esta especialidad');
    return;
  }
  
  let doctorAsignado: Doctor;
  if(esCritico){
    doctorAsignado = doctorDisponible.sort((a, b) => b.experiencia - a.experiencia)[0]
  } else {
    doctorAsignado = doctorDisponible.sort((a, b) => a.citas.length - b.citas.length)[0];
  }

  const nuevaCita:Cita = {
      id:proximaIdcita.value++,
      pacienteId: p.id,
      doctorId:doctorAsignado.id,
      fecha: new Date(),
      hora:`${10 + doctorAsignado.citas.length}:00`,
      estado: "pendiente"
  }

  doctorAsignado.citas.push(nuevaCita);
  console.log(`${p.nombre} se le asigno cita con ${doctorAsignado.nombre}`);
}

function siguientePaciente(idDoctor: number){
  const doctor = doctores.find(d => d.id === idDoctor);
  if(!doctor) return;
  if (doctor.enConsulta) {
    console.log(`${doctor.nombre} ya está atendiendo a ${doctor.enConsulta.nombre}`);
    return;
  }
  
  const proximaCita = doctor.citas.find(i => i.estado == "pendiente")
  if(!proximaCita){
    console.log(`${doctor.nombre} no tiene mas citas pendientes hoy`);
  }
  
  const paciente = pacientes.find(p => p.id == proximaCita?.pacienteId);
  if(paciente){
    doctor.disponibilidad = "ocupado";
    doctor.enConsulta = paciente;
    proximaCita? proximaCita.estado = "en proceso" : "";
  }
}

function terminarConsulta(idDoctor: number){
    const doctor = doctores.find(d => d.id === idDoctor);
    if(!doctor || doctor.enConsulta == null) return "doctor no disponible";

    const citaAcutal = doctor.citas.find(cita => cita.pacienteId === doctor.enConsulta?.id && cita.estado === "en proceso");
    if(citaAcutal){
        citaAcutal.estado = "completada";
    }

    doctor.enConsulta.consultado = true;
    doctor.enConsulta = null;
    doctor.disponibilidad = "disponible";
    console.log(`${doctor.nombre} termino su cita`);
}

const createCitas = () => {
  //primero ordenarPacientes los pacientes por urgencia (alta prioriodad + edad >= 60 seran criticos)
  pacientes.sort((a, b) => {
    return ordenarPacientes(b) - ordenarPacientes(a)
  });

  pacientes.forEach(paciente => {
  if (!paciente.consultado) {
      asignarDoctores(paciente);
    }
  });
}

export function useCitas(){
    return {
        doctores,
        pacientes,
        createCitas,
        asignarDoctores,
        siguientePaciente,
        terminarConsulta
    };
}