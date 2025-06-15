<script setup>
import { useRouter } from "vue-router";
import axios from "axios";
import { ref, onMounted} from "vue";

let page = ref(1)
const episodesList = ref([])
const totalPages = ref(null)

const router = useRouter()

async function loadData() {
  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/episode?page=${page.value}`)
    episodesList.value.push(...response.data.results)

    if (totalPages.value === null) {
      totalPages.value = response.data.info.pages
    }
  }
  catch (error) {
    console.error(error)
  }
}
function loadMore() {
  page.value++;
  loadData()
}

function goDetailsEpisodes(id) {
  router.push({ name: 'EpisodeDetail', params: { id }})
}

function formatEpisodeCode(code){
  const match = code.match(/S(\d+)E(\d+)/i)
  if (!match){
    return code
  }
  const season = parseInt(match[1], 10)
  const episode = parseInt(match[2], 10)

  return `Season ${season}, Episode ${episode}`
}
onMounted(() => {
  loadData()
})

</script>

<template>
  <section class="main-content">
    <h1 class="title-section">Episodes</h1>
    <div class="episodes-all-card">
      <div v-for="episode in episodesList"
           class="episodeCard"
           :key="episode.id"
           @click="goDetailsEpisodes(episode.id)"
      >
        <div class="episodeInfo">
          <h2 class="episode-name">{{ episode.name}}</h2>
          <p>{{ formatEpisodeCode(episode.episode)}}</p>
          <p><span class="label">Air date: </span> {{ episode.air_date}}</p>
        </div>
      </div>
    </div>
    <div class="btn-container" v-if="page < totalPages">
      <button @click="loadMore" class="loadBtn">
        Show more
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
.btn-container {
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