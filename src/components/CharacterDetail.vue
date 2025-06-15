<script setup>
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import axios from "axios";


const route = useRoute()
const character = ref(null)
const episode = ref([])
const router = useRouter()

function formatEpisodeCode(code){
  const match = code.match(/S(\d+)E(\d+)/i)
  if (!match){
    return code
  }
  const season = parseInt(match[1], 10)
  const episode = parseInt(match[2], 10)

  return `Season ${season}, Episode ${episode}`
}

function goDetailsEpisodes(id) {
  router.push({ name: 'EpisodeDetail', params: { id }})
}

function getIdFromUrl(url) {
  const parts = url.split('/')
  return parts[parts.length - 1]
}
function goDetailsOrigin(url) {
  const id = getIdFromUrl(url)
  router.push({ name: 'LocationDetail', params: { id } })
}



async function loadData() {
  const id = route.params.id
  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`)
    character.value = response.data

    const episodeUrls = character.value.episode
    const episodeResponse = await Promise.all(episodeUrls.map(url => axios.get(url)))
    episode.value = episodeResponse.map(res => res.data)
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <section class="main-content">
    <div class="character-more-info">
      <div v-if="character" class="character-detail">
        <img
            :src="character.image"
            :alt="character.name"
            class="character-img"
        >
        <div class="character-info" >
          <h1 class="characterName">{{ character.name}}</h1>
          <p><span class="label">Status: </span>{{ character.status }}</p>
          <p><span class="label">Species: </span>{{ character.species}}</p>
          <p><span class="label">Type: </span>{{ character.type}}</p>
          <p><span class="label">Gender: </span>{{ character.gender}}</p>
          <p @click="goDetailsOrigin(character.origin.url)" class="goTo"><span class="label">Origin: </span>{{ character.origin.name}}</p>
          <p @click="goDetailsOrigin(character.location.url)" class="goTo"><span class="label">Location: </span>{{ character.location.name}}</p>
        </div>
      </div>
    </div>
    <div class="second-content">
      <h1 class="title-episodes">Episodes:</h1>
      <div class="episode-scroll">
        <ul>
          <li v-for="epItem in episode"
              :key="epItem.id"
              class="episode-line"
              @click="goDetailsEpisodes(epItem.id)">
            {{ formatEpisodeCode(epItem.episode) }} - {{ epItem.name }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>

.main-content {
  background: #0F3A40;
  min-height: 100vh;
}
.character-more-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1920px;
  align-items: center;
}
.character-info {
  flex-direction: row;
  padding: 15px;
}
.character-detail{
  width: 1000px;
  height: 300px;
  display: flex;
  overflow: hidden;
  border-radius: 5px;
  margin: 0.75rem;
  color: white;
  font-weight: 500;
  font-size: 25px;
}
.character-img {
  max-width: 500px;
  width: 300px;
  border-radius: 20px;
  border: 2px solid #ebff6e;
}
.episode-scroll {
  max-height: 300px;
  overflow-y: auto;
  background: #0D7C85;
  padding: 20px;
  color: #fff;
  border-radius: 10px;
  border: 2px solid #ebff6e;
}

.episode-scroll ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.episode-scroll li {
  padding: 4px 0;
  font-size: 25px;
  border-bottom: 1px solid #ebff6e44;
}
.label {
  color: #cccccc;
}
.second-content {
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin-left: 100px;
  margin-right: 100px;
}
.title-episodes {
  color: white;
  padding-bottom: 10px;
}
.episode-line {
  transition: color 0.3s ease;
  cursor: pointer;
}
.episode-line:hover {
  color: #ebff6e;
}
.goTo {
  cursor: pointer;
  transition: color 0.3s ease;
}
.goTo:hover {
  color: #ebff6e;
}
</style>