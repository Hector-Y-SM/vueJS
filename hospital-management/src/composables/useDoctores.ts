import { doctores } from "@/data/doctores";
import type { Doctor } from "@/types";

function doctorMasExp(especialidad: string): Doctor | string{
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

export function useDoctor(){
    return{
        doctorMasExp,
        reporteCarga
    }
}