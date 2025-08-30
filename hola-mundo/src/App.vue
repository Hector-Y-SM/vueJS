<script setup>
  import { isSpreadAssignment } from 'typescript';
import { ref } from 'vue';
  const goals = ref([]);
  const inputGoalValue = ref('');


  const addGoal = () => {
    goals.value.push(inputGoalValue.value);
  }

  const removeGoal = (index) => {
    console.log(index)
    goals.value.splice(index, 1);
  }

</script>

<template>
  <header>
    <h1 class="text-center text-3xl uppercase font-bold bg-green-300 p-6">vue course goal</h1>
  </header>
  <section class="flex flex-col justify-center m-20 p-4 rounded-2xl">
    <h2 class="text-center text-2xl font-medium mb-10">my course</h2>
    <input type="text" 
           v-model="inputGoalValue"
           placeholder="escribeeee" 
           class="p-2 bg-gray-300 w-full" 
    >
    <button @click="addGoal"
            class="w-full p-3 bg-green-500 rounded-b-md">add goals</button>
      <p v-if="goals.length === 0"
         class="text-2xl text-red-400 text-center" 
      > 
        no goals
      </p>
    <ul v-else 
        class="font-bold text-4xl text-center"
    >
      <li v-for="(goal, index) in goals"
      >
        {{ index + 1}} - {{goal}}
        <button 
          @click="removeGoal(index)"
          class="p-3 bg-red-500"
        >borrar</button>
      </li>
    </ul>
  </section>

</template>

