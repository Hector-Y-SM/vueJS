<script setup lang="ts">
  import { useCitas } from './composables/useCitas'
import { useDoctor } from './composables/useDoctores';
  const {
      doctores,
      pacientes,
      createCitas,
      siguientePaciente,
      terminarConsulta
    } = useCitas();

  const {
    reporteCarga,
    doctorMasExp
  } = useDoctor();


    createCitas()

    /*siguientePaciente(1)
    terminarConsulta(1)
    siguientePaciente(1)
    siguientePaciente(2)
    siguientePaciente(3)
    siguientePaciente(4)
    siguientePaciente(5)
    console.log(reporteCarga("Pediatria"));*/
</script>

<template>
  <header>
    <h1>hospital management</h1>
  </header>
  <main>
    <!-- doctor's section-->
    <section>
      <div 
        v-for="doctor, index in doctores"
        class="bg-red-500 p-5 "
        > 
        <h2>{{ doctor.nombre }} -- {{ doctor.experiencia }} años exp</h2>
        <h3>{{ doctor.especialidad }}</h3>
        <h3>{{ doctor.disponibilidad }}</h3>
        <button @click="siguientePaciente(index+1)">siguiente en la lista --- {{ index+1 }}</button>


      </div>
    </section>
  </main>
</template>

