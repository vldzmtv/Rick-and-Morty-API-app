<script setup>
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import axios from "axios";

const route = useRoute()
const episode = ref(null)
const characters = ref([])
const router = useRouter()

function formatEpisodeCode(code) {
  const match = code.match(/S(\d+)E(\d+)/i)
  if (!match){
    return code
  }
  const season = parseInt(match[1], 10)
  const episode = parseInt(match[2], 10)

  return `Season ${season}, Episode ${episode}`
}

function goDetailsCharacter(id) {
  router.push({ name: 'CharacterDetail', params: { id }})
}
async function loadData() {
  const id = route.params.id
  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`)
    episode.value = response.data

    const characterUrl = episode.value.characters
    const characterResponse = await Promise.all(characterUrl.map(url => axios.get(url)))
    characters.value = characterResponse.map(res => res.data)
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  loadData()
})

</script>

<template>
  <section class="main-content">
    <div class="episode-more-info">
      <div v-if="episode" class="episode-detail">
        <div class="episode-info">
          <h1>{{ episode.name}}</h1>
          <p>{{ formatEpisodeCode(episode.episode)}}</p>

        </div>
      </div>
    </div>
    <div class="second-content">
      <h1 class="title-characters">Characters:</h1>
      <div class="character-grid">
        <div class="character-card"
            v-for="chItem in characters"
            :key="chItem.id"
            @click="goDetailsCharacter(chItem.id)"
        >
          <img :src="chItem.image" :alt="chItem.name" class="character-image" />
          <p class="character-name">{{ chItem.name }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.main-content {
  background: #0F3A40;
  min-height: 100vh;
}
.episode-more-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1920px;
  align-items: center;
}
.episode-info{
  flex-direction: row;
  padding: 15px;
}
.title-characters {
  color: white;
  padding-bottom: 10px;
}
.second-content {
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin-left: 100px;
  margin-right: 100px;
  padding-bottom: 20px;
}
.episode-detail {
  width: 1000px;
  display: flex;
  overflow: hidden;
  border-radius: 5px;
  color: white;
  font-weight: 500;
  font-size: 40px;
}
.character-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  background: #0D7C85;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #ebff6e;
}

.character-card {
  width: 200px;
  background: #114f56;
  border-radius: 10px;
  text-align: center;
  padding: 10px;
  color: white;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.character-card:hover {
  transform: scale(1.05);
}

.character-image {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 10px;
}
.character-name {
  font-size: 16px;
  font-weight: 500;
}

</style>