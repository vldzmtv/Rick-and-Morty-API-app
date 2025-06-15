<script setup>
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import axios from "axios";

const route = useRoute()
const locations = ref(null)
const characters = ref([])
const router = useRouter()

function goDetailsCharacter(id) {
  router.push({ name: 'CharacterDetail', params: { id }})
}
async function loadData() {
  const id = route.params.id
  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/location/${id}`)
    locations.value = response.data

    const characterUrl = locations.value.residents
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
    <div class="location-more-info">
      <div v-if="locations" class="location-detail">
        <div class="location-info">
          <h1>{{ locations.name }}</h1>
          <p><span class="label">Type: </span>{{ locations.type }}</p>
          <p><span class="label">Dimension: </span>{{ locations.dimension }}</p>
        </div>
      </div>
    </div>
    <div class="second-content">
      <h1 class="title-residents">Residents:</h1>
      <div class="residents-grid">
        <div class="residents-card"
             v-for="reItem in characters"
             :key="reItem.id"
             @click="goDetailsCharacter(reItem.id)"
        >
          <img :src="reItem.image" :alt="reItem.name" class="character-image" />
          <p class="character-name">{{ reItem.name }}</p>
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
.location-more-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1920px;
  align-items: center;
}
.location-info{
  flex-direction: row;
  padding: 15px;
}
.title-residents {
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
.location-detail {
  display: flex;
  overflow: hidden;
  border-radius: 5px;
  color: white;
  font-weight: 500;
  font-size: 40px;
}
.residents-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  background: #0D7C85;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #ebff6e;
}

.residents-card {
  width: 200px;
  background: #114f56;
  border-radius: 10px;
  text-align: center;
  padding: 10px;
  color: white;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.residents-card:hover {
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
.label {
  color: #cccccc;
}
</style>