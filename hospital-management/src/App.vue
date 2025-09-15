<script setup lang="ts">
  import { ref } from 'vue';

    interface Paciente {
      id: number,
      nombre: string,
      edad: number,
      especialidadRequerida: string,
      prioridad: "alta" | "media" | "baja",
      consultado: boolean
    }

    interface Doctor {
      id: number,
      nombre: string,
      especialidad: string,
      disponibilidad: "disponible" | "ocupado" | "ausente",
      experiencia: number,
      enConsulta: Paciente | null,
      citas: Cita[]
    }

    interface Cita {
      id: number,
      pacienteId:number,
      doctorId:number,
      fecha: Date,
      hora: string,
      estado: "confirmada" | "pendiente" | "completada" | "no asistio" | "en proceso"
    }

    const doctores: Doctor[] = [
      {id: 1, nombre: "Dr. Pérez", especialidad: "Cardiologia", disponibilidad: "disponible", experiencia: 15, enConsulta: null, citas: []},
      {id: 2, nombre: "Dra. González", especialidad: "Pediatria", disponibilidad: "disponible", experiencia: 8, enConsulta: null, citas: []},
      {id: 3, nombre: "Dr. Martínez", especialidad: "Cardiologia", disponibilidad: "ausente", experiencia: 20, enConsulta: null, citas: []},
      {id: 4, nombre: "Dra. López", especialidad: "Neurologia", disponibilidad: "disponible", experiencia: 12, enConsulta: null, citas: []},
      {id: 5, nombre: "Dr. Ruiz", especialidad: "Pediatria", disponibilidad: "disponible", experiencia: 6, enConsulta: null, citas: []} 
    ];

    const pacientes: Paciente[] = [
      {id: 1, nombre: "Juan Pérez", edad: 45, especialidadRequerida: "Cardiologia", prioridad: "alta", consultado: false},
      {id: 2, nombre: "María García", edad: 8, especialidadRequerida: "Pediatria", prioridad: "media", consultado: false},
      {id: 3, nombre: "Carlos Ruiz", edad: 62, especialidadRequerida: "Neurologia", prioridad: "alta", consultado: false},
      {id: 4, nombre: "Ana López", edad: 35, especialidadRequerida: "Cardiologia", prioridad: "baja", consultado: false},
      {id: 5, nombre: "Pedro Martín", edad: 12, especialidadRequerida: "Pediatria", prioridad: "alta", consultado: false}
    ];


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

    function doctorMasExp(especialidad: string){
      const especialidadDoctores = doctores.filter(doctor => doctor.especialidad === especialidad);

      if(especialidadDoctores.length == 0){
        return 'no se encontro ningun doctor con esta especialidad'
      }

      const mayorExp = especialidadDoctores.reduce((doctorMax, doctorActual) => 
        doctorActual.experiencia > doctorMax.experiencia ? doctorActual : doctorMax
      );

      return mayorExp;
    }

    function reporteCarga(especialidad: string){
      const especialidadDoctores = doctores.filter(doctor => doctor.especialidad === especialidad);

      if(especialidadDoctores.length == 0){
        return 'no se encontro ningun doctor con esta especialidad'
      }

      const totalCitas = especialidadDoctores.reduce((sum, doctor) => sum + doctor.citas.length, 0);
      return {
        numeroCitas: totalCitas,
        citas: especialidadDoctores
      }
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
        proximaCita? proximaCita.estado = "en proceso" : ""
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
      doctor.disponibilidad = "disponible"
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
  
  
    createCitas()
    siguientePaciente(1)
    terminarConsulta(1)
    siguientePaciente(1)
    siguientePaciente(2)
    siguientePaciente(3)
    siguientePaciente(4)
    siguientePaciente(5)
    console.log(reporteCarga("Pediatria"));
    console.log(doctores);
    console.log(pacientes);
</script>

<template>
  <h1 class="text-3xl">You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
</template>

<style scoped></style>
