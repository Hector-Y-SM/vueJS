<script setup lang="ts">
  import { ref } from 'vue';
  import { useCitas } from './composables/useCitas'
  import { useDoctor } from './composables/useDoctores';
  import type { Doctor } from './types';

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

  const reporteVisible = ref<string | null>(null);
  const reporteDatos = ref<any>(null);
  function abrirReporte(especialidad: string) {
    const result = reporteCarga(especialidad);
    if (Array.isArray(result)) {
      reporteDatos.value = result[0];
      reporteVisible.value = especialidad;
    } else {
      reporteDatos.value = null;
      reporteVisible.value = null;
      alert(result);
    }
  };

  createCitas();
</script>

<template>
  <header class="bg-amber-100 py-4 shadow-md">
    <h1 class="text-center text-2xl font-bold text-stone-700">
      Hospital Management
    </h1>
  </header>

  <main class="p-6">
    <section class="space-y-6">
      <!-- Un doctor con su fila de pacientes -->
      <div
        v-for="doctor in doctores"
        :key="doctor.id"
        class="flex items-start gap-6 relative"
      >
        <!-- Card doctor -->
        <div
          class="bg-emerald-50 border border-emerald-200 rounded-xl p-5 shadow-sm flex flex-col gap-2 w-64 relative"
        >
          <!-- Botón de reporte -->
          <button
            @click="abrirReporte(doctor.especialidad)"
            class="absolute top-2 right-2 text-emerald-700 hover:text-emerald-900"
          >
            🛈
          </button>

          <h2 class="text-lg font-semibold text-emerald-900">
            {{ doctor.nombre }}
          </h2>
          <p class="text-sm text-stone-600">{{ doctor.experiencia }} años exp</p>
          <h3 class="text-stone-700 font-medium">{{ doctor.especialidad }}</h3>

          <h3
            class="text-sm px-2 py-1 rounded-md w-fit"
            :class="{
              'bg-emerald-200 text-emerald-900':
                doctor.disponibilidad === 'disponible',
              'bg-orange-200 text-orange-900':
                doctor.disponibilidad === 'ocupado',
              'bg-stone-200 text-stone-700':
                doctor.disponibilidad === 'ausente'
            }"
          >
            {{ doctor.disponibilidad }}
            {{
              doctor.disponibilidad == "ocupado"
                ? `hasta: ${
                    doctor.citas.filter(cita => cita.estado === "en proceso")[0]
                      ?.hora || "N/A"
                  }`
                : ""
            }}
          </h3>

          <button
            v-if="doctor.disponibilidad === 'disponible'"
            @click="siguientePaciente(doctor.id)"
            class="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium py-2 px-4 rounded-lg shadow transition"
          >
            Siguiente en la lista
          </button>

          <button
            v-if="doctor.enConsulta"
            @click="terminarConsulta(doctor.id)"
            class="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2 px-4 rounded-lg shadow transition"
          >
            Terminar consulta
          </button>

          <h3
            v-if="typeof doctorMasExp(doctor.especialidad) === 'object' && (doctorMasExp(doctor.especialidad) as Doctor)?.id === doctor.id"
            class="text-sm text-amber-700 font-semibold"
          >
            Mayor experiencia en {{ doctor.especialidad }}
          </h3>
        </div>

        <!-- Pacientes asignados al doctor -->
        <div class="flex gap-4 flex-wrap items-center min-h-[100px]">
          <template
            v-if="doctor.citas.some(c => c.estado !== 'completada')"
          >
            <div
              v-for="cita in doctor.citas.filter(c => c.estado !== 'completada')"
              :key="cita.id"
              class="bg-white border border-stone-200 rounded-lg p-3 shadow-sm w-52"
            >
              <p class="font-medium text-stone-800">
                {{ pacientes.find(p => p.id === cita.pacienteId)?.nombre }}
              </p>
              <p class="text-sm text-stone-600">
                Edad: {{ pacientes.find(p => p.id === cita.pacienteId)?.edad }}
              </p>
              <p class="text-sm text-stone-700">
                Requiere:
                <span class="font-medium">
                  {{
                    pacientes.find(p => p.id === cita.pacienteId)
                      ?.especialidadRequerida
                  }}
                </span>
              </p>
              <p class="text-sm text-stone-700">
                Prioridad:
                <span class="font-medium">
                  {{ pacientes.find(p => p.id === cita.pacienteId)?.prioridad }}
                </span>
              </p>

              <p
                class="text-xs mt-1 px-2 py-1 rounded w-fit"
                :class="{
                  'bg-stone-200 text-stone-700': cita.estado === 'pendiente',
                  'bg-orange-200 text-orange-900': cita.estado === 'en proceso'
                }"
              >
                {{ cita.estado }}
              </p>
            </div>
          </template>
          <p v-else class="text-stone-500 italic text-sm">
            No tiene más citas hoy
          </p>
        </div>
      </div>
    </section>

    <!-- Panel flotante del reporte -->
    <div
      v-if="reporteVisible"
      class="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-xl shadow-lg p-6 w-[400px] relative">
        <button
          @click="reporteVisible = null"
          class="absolute top-2 right-2 text-stone-500 hover:text-stone-700"
        >
          ✖
        </button>
      
        <h2 class="text-lg font-semibold text-stone-800 mb-4">
          Reporte de carga: {{ reporteVisible }}
        </h2>
      
        <div v-if="reporteDatos">
          <p class="mb-2">
            <strong>Total de citas:</strong>
            {{ reporteDatos.numeroCitas }}
          </p>
        
          <div v-for="doc in reporteDatos.citas" :key="doc.id" class="mb-4">
            <h3 class="font-medium text-emerald-700">
              {{ doc.nombre }} ({{ doc.especialidad }})
            </h3>
            <ul class="text-sm list-disc pl-4 text-stone-700">
              <li v-for="cita in doc.citas" :key="cita.id">
                Paciente: {{ pacientes.find(p => p.id === cita.pacienteId)?.nombre }}
                - Estado: {{ cita.estado }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>