import { ref } from "vue";
import { doctores as doctoresData } from "@/data/doctores";
import { pacientes as pacientesData } from "@/data/pacientes";
import type { Cita, Doctor, Paciente } from "@/types";

let proximaIdcita = ref(1);
const doctores = ref<Doctor[]>([...doctoresData]);
const pacientes = ref<Paciente[]>([...pacientesData]);


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
  doctores.value.sort((a,b)=> b.experiencia - a.experiencia);

  const doctorDisponible = doctores.value.filter( d =>
    d.disponibilidad != "ausente" && d.especialidad === p.especialidadRequerida
  );

  if(!doctorDisponible){
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
      hora:`${9 + (doctorAsignado.citas.length + 1)}:00`,
      estado: "pendiente"
  }

  doctorAsignado.citas.push(nuevaCita);
}

function siguientePaciente(idDoctor: number){
  const doctor = doctores.value.find(d => d.id === idDoctor);
  if(!doctor) return;
  if (doctor.enConsulta) {
    return;
  }
  
  const proximaCita = doctor.citas.find(i => i.estado == "pendiente")
  if(!proximaCita){
    return
  }
  
  const paciente = pacientes.value.find(p => p.id == proximaCita?.pacienteId);
  if(paciente){
    doctor.disponibilidad = "ocupado";
    doctor.enConsulta = paciente;
    proximaCita? proximaCita.estado = "en proceso" : "";
  }
}

function terminarConsulta(idDoctor: number){
    const doctor = doctores.value.find(d => d.id === idDoctor);
    if(!doctor || doctor.enConsulta == null) return "doctor no disponible";

    const citaAcutal = doctor.citas.find(cita => cita.pacienteId === doctor.enConsulta?.id && cita.estado === "en proceso");
    if(citaAcutal){
        citaAcutal.estado = "completada";
    }

    doctor.enConsulta.consultado = true;
    doctor.enConsulta = null;
    doctor.disponibilidad = "disponible";
}

const createCitas = () => {
  pacientes.value.sort((a, b) => {
    return ordenarPacientes(b) - ordenarPacientes(a)
  });

  pacientes.value.forEach(paciente => {
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