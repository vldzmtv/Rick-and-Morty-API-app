<script setup>
import {useRouter} from "vue-router"
import axios from "axios"
import {ref, onMounted, watch} from "vue"

const page = ref(1)
const charactersList = ref([])
const totalPages = ref(null)
const router = useRouter()

async function loadData() {
  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page.value}`)
    charactersList.value = response.data.results
    totalPages.value = response.data.info.pages
  } catch (error) {
    console.error(error)
  }
}

function goDetailsCharacter(id) {
  router.push({name: 'CharacterDetail', params: {id}})
}

function prevPage() {
  if (page.value > 1) {
    page.value--
  }
}

function nextPage() {
  if (page.value < totalPages.value) {
    page.value++
  }
}

watch(page, () => {
  loadData()
})

onMounted(() => {
  loadData()
})
</script>

<template>
  <section class="mainContent">
    <h1 class="title-section">Characters</h1>

    <div class="characterAllCard">
      <div
          v-for="character in charactersList"
          :key="character.id"
          class="characterCard"
          @click="goDetailsCharacter(character.id)"
      >
        <img
            :src="character.image"
            :alt="character.name"
        >
        <div class="characterInfo">
          <h2 class="characterName">{{ character.name }}</h2>
          <p><span class="label">Status: </span>{{ character.status }}</p>
          <p><span class="label">Species: </span>{{ character.species }}</p>
          <p><span class="label">Location: </span>{{ character.location.name }}
          </p>
        </div>
      </div>
    </div>
    <div
        class="paginationArrows"
        v-if="totalPages"
    >
      <button
          @click="prevPage"
          :disabled="page === 1"
      >←
      </button>
      <span>Page {{ page }} of {{ totalPages }}</span>
      <button
          @click="nextPage"
          :disabled="page === totalPages"
      >→
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
  width: 550px;
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

.label {
  color: #cccccc;
}

.paginationArrows {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 20px;
  font-size: 20px;
  color: #ebff6e;
  font-weight: bold;
}

.paginationArrows button {
  background-color: transparent;
  border: 2px solid #EBFF6E;
  color: #EBFF6E;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
  transition: 0.3s;
}

.paginationArrows button:hover:not(:disabled) {
  background-color: #EBFF6E;
  color: #0F3A40;
}

.paginationArrows button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination button {
  background-color: transparent;
  border: 2px solid #EBFF6E;
  color: #EBFF6E;
  padding: 8px 16px;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
}

.pagination button:hover {
  background-color: #EBFF6E;
  color: #0F3A40;
}

@media (max-width: 768px) {
  .characterInfo {
    font-size: 15px;
  }
}
</style>