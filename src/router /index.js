import {createRouter, createWebHistory} from "vue-router";
import Character from "@/components/Character.vue";
import CharacterDetail from "@/components/CharacterDetail.vue";
import Episodes from "@/components/Episodes.vue";
import EpisodeDetail from "@/components/EpisodeDetail.vue";
import Locations from "@/components/Locations.vue";
import LocationsDetail from "@/components/LocationsDetail.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Character
  },
  {
    path: '/character/:id',
    name: 'CharacterDetail',
    component: CharacterDetail,
    props: true
  },
  {
    path: '/episodes/',
    name: 'Episodes',
    component: Episodes,
  },
  {
    path: '/episodes/:id',
    name: 'EpisodeDetail',
    component: EpisodeDetail,
  },
  {
    path: '/locations/',
    name: 'Locations',
    component: Locations,
  },
  {
    path: '/locations/:id',
    name: 'LocationDetail',
    component: LocationsDetail,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router