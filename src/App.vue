<template>
  <Header></Header>
  <Character :charactersList="refRick"
             @load-more="loadMore"></Character>

</template>

<style scoped>
</style>
<script setup>
import Header from "@/components/Header.vue";
import Character from "@/components/Character.vue";
import axios from "axios";
import {ref, onMounted} from "vue";

let page = 1;
const refRick  = ref([])
async function loadData (){
  try{
    const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
    return response.data.results
  }
  catch(error){
    console.error(error)
    return []
  }
}
async function loadMore() {
  page++;
  const newCharacters = await loadData();
  refRick.value = [...refRick.value, ...newCharacters];
}
onMounted(async () => {
  refRick.value = await loadData()
})


</script>