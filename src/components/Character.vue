<script setup>
import {useRouter} from "vue-router";
import axios from "axios";
import { ref, onMounted } from "vue";

let page = ref(1);
const charactersList  = ref([])
const router = useRouter()
const totalPages = ref(null)

async function loadData (){
  try{
    const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page.value}`);
    charactersList.value.push(...response.data.results)

    if (totalPages.value === null) {
      totalPages.value = response.data.info.pages
    }
  }
  catch(error){
    console.error(error)
  }
}

function loadMore() {
  page.value++;
 loadData()
}
function goDetailsCharacter(id) {
  router.push({ name: 'CharacterDetail', params: { id }})
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <section class="mainContent">
    <h1 class="title-section">Character</h1>
    <div class="characterAllCard">
      <div v-for="character in charactersList"
           class="characterCard"
           :key="character.id"
           @click="goDetailsCharacter(character.id)"
      >
        <img
            :src="character.image"
            :alt="character.name"
        >
        <div class="characterInfo" >
          <h2 class="characterName">{{ character.name}}</h2>
          <p><span class="label">Status: </span> {{ character.status }}</p>
          <p><span class="label">Species: </span>{{ character.species}}</p>
          <p><span class="label">Location: </span>{{ character.location.name}}</p>
        </div>
      </div>
    </div>
    <div class="btnContainer"  v-if="page < totalPages">
      <button @click="loadMore" class="loadBtn">
        Show more
      </button>
    </div>
  </section>
</template>

<style scoped>
.title-section {
  color: #FFFFFF;
  text-align: center;
  padding-top: 10px;
  font-size: 40px;
}
.mainContent {
  background: #0F3A40;
  min-height: 100vh;

}
.characterAllCard {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.characterCard {
  width: 700px;
  height: 220px;
  display: flex;
  overflow: hidden;
  border-radius: 5px;
  background: #0D7C85;
  margin: 0.75rem;
  border: 3px solid #EBFF6E;
  color: white;
  font-weight: 500;
  font-size: 20px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.characterCard:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}
.characterName {
  color: #EBFF6E;
}
.characterInfo {
  flex-direction: row;
  padding: 15px;
}

.btnContainer{
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
}
.loadBtn {
  padding: 10px 20px;
  background: none;
  border: 2px solid yellow;
  border-radius: 20px;
  color: #ebff6e;
  font-weight: 700;
  font-size: 32px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.loadBtn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}
.label {
  color: #cccccc;
}
</style>