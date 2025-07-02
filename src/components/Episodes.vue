<script setup>
import {useRouter} from "vue-router"
import axios from "axios"
import {ref, onMounted, watch} from "vue"

const page = ref(1)
const episodesList = ref([])
const totalPages = ref(null)
const router = useRouter()

async function loadData() {
  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/episode?page=${page.value}`)
    episodesList.value = response.data.results
    totalPages.value = response.data.info.pages
  } catch (error) {
    console.error(error)
  }
}

function goDetailsEpisodes(id) {
  router.push({name: 'EpisodeDetail', params: {id}})
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

function formatEpisodeCode(code) {
  const match = code.match(/S(\d+)E(\d+)/i)
  if (!match) {
    return code
  }
  const season = parseInt(match[1], 10)
  const episode = parseInt(match[2], 10)

  return `Season ${season}, Episode ${episode}`
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
    <h1 class="title-section">Episodes</h1>
    <div class="episodes-all-card">
      <div
          v-for="episode in episodesList"
          class="episodeCard"
          :key="episode.id"
          @click="goDetailsEpisodes(episode.id)"
      >
        <div class="episodeInfo">
          <h2 class="episode-name">{{ episode.name }}</h2>
          <p>{{ formatEpisodeCode(episode.episode) }}</p>
          <p><span class="label">Air date: </span> {{ episode.air_date }}</p>
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

.episodes-all-card {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.episodeCard {
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

.episodeCard:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}

.episode-name {
  color: #EBFF6E;
}

.episodeInfo {
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