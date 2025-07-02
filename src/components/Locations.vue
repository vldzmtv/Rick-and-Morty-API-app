<script setup>
import {useRouter} from "vue-router";
import axios from "axios";
import {ref, onMounted, watch} from "vue";

let page = ref(1)
const locationsList = ref([])
const totalPages = ref(null)
const router = useRouter()

async function loadData() {
  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/location?page=${page.value}`)
    locationsList.value = response.data.results
    totalPages.value = response.data.info.pages
  } catch (error) {
    console.error(error)
  }
}

function goDetailsLocation(id) {
  router.push({name: 'LocationDetail', params: {id}})
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
  <section class="main-content">
    <h1 class="title-section">Locations</h1>
    <div class="location-all-card">
      <div
          v-for="location in locationsList"
          class="locationCard"
          :key="location.id"
          @click="goDetailsLocation(location.id)"
      >
        <div class="location-info">
          <h2 class="location-name">{{ location.name }}</h2>
          <p><span class="label">Type: </span>{{ location.type }}</p>
          <p><span class="label">Dimension: </span>{{ location.dimension }}</p>
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
.main-content {
  background: #0F3A40;
  min-height: 100vh;
}

.title-section {
  color: #FFFFFF;
  text-align: center;
  padding-top: 10px;
  font-size: 40px;
}

.location-all-card {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.locationCard {
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

.locationCard:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}

.location-name {
  color: #EBFF6E;
}

.location-info {
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
</style>