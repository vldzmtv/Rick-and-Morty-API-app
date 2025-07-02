<script setup>
import {ref, watch} from 'vue'
import axios from 'axios'
import {useRouter} from 'vue-router'

const isOpen = ref(false)
const searchTerm = ref('')
const searchResults = ref([])
const router = useRouter()

let debounceTimeout = null

watch(searchTerm, (newTerm) => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout)
  }
  if (newTerm.trim() === '') {
    searchResults.value = []
    return
  }

  debounceTimeout = setTimeout(async () => {
    const [charRes, locRes, epRes] = await Promise.allSettled([
      axios.get(`https://rickandmortyapi.com/api/character/?name=${newTerm}`),
      axios.get(`https://rickandmortyapi.com/api/location/?name=${newTerm}`),
      axios.get(`https://rickandmortyapi.com/api/episode/?name=${newTerm}`)
    ])

    const results = []

    if (charRes.status === 'fulfilled') {
      results.push(...charRes.value.data.results.map(item => ({
        type: 'character',
        item
      })))
    }
    if (locRes.status === 'fulfilled') {
      results.push(...locRes.value.data.results.map(item => ({
        type: 'location',
        item
      })))
    }
    if (epRes.status === 'fulfilled') {
      results.push(...epRes.value.data.results.map(item => ({
        type: 'episode',
        item
      })))
    }

    searchResults.value = results
  }, 400)
})

function goToResult(result) {
  if (result.type === 'character') {
    router.push({name: 'CharacterDetail', params: {id: result.item.id}})
  } else if (result.type === 'location') {
    router.push({name: 'LocationDetail', params: {id: result.item.id}})
  } else if (result.type === 'episode') {
    router.push({name: 'EpisodeDetail', params: {id: result.item.id}})
  }
  searchTerm.value = ''
  searchResults.value = []
}
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="headerIn">
        <router-link to="/">
          <img
              src="@/assets/Rick_and_Morty.svg"
              alt=""
              class="logo"
          />
        </router-link>
        <div class="searchBar">
          <input
              type="text"
              v-model="searchTerm"
              placeholder="Search characters"
              class="searchInput"
          />
          <ul
              v-if="searchResults.length"
              class="searchDropdown"
          >
            <li
                v-for="(result, index) in searchResults"
                :key="index"
                @click="goToResult(result)"
            >
              <strong>{{ result.type }}</strong>: {{ result.item.name }}
            </li>
          </ul>
        </div>
        <button
            class="burger"
            @click="isOpen = !isOpen"
        >
          <span :class="{ open: isOpen }"></span>
          <span :class="{ open: isOpen }"></span>
          <span :class="{ open: isOpen }"></span>
        </button>

        <nav :class="['menu', { open: isOpen }]">
          <ul class="menuList">
            <li class="menuListItem">
              <router-link
                  to="/"
                  class="menuListItemLink"
              >Characters
              </router-link>
            </li>
            <li class="menuListItem">
              <router-link
                  to="/locations"
                  class="menuListItemLink"
              >Locations
              </router-link>
            </li>
            <li class="menuListItem">
              <router-link
                  to="/episodes"
                  class="menuListItemLink"
              >Episodes
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>


<style scoped>
.header {
  padding-top: 10px;
  background: #0F3A40;
  border-bottom: 3px solid #EBFF6E;
}

.logo {
  max-width: 200px;
  padding-left: 20px;
  padding-bottom: 10px;
}

a {
  text-decoration: none;
  color: #FFFFFF;

}

.headerIn {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menuList {
  display: flex;
  list-style: none;

}

.menuListItem {
  margin-right: 20px;
}

.menuListItemLink {
  display: inline-block;
  padding: 10px 20px;
  font-size: 20px;
  cursor: pointer;
  transition: color 0.3s, transform 0.3s;
}

.menuListItemLink:hover {
  color: #EBFF6E;
  transform: scale(1.1);
}

.burger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 25px;
  height: 18px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.burger span {
  display: block;
  height: 3px;
  background: white;
  border-radius: 2px;
  transition: 0.3s;
}

.burger span.open:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.burger span.open:nth-child(2) {
  opacity: 0;
}

.burger span.open:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

.searchBar {
  position: relative;
  margin-left: 20px;
  flex-grow: 1;
  max-width: 400px;
}

.searchInput {
  width: 100%;
  padding: 8px 12px;
  border-radius: 6px;
  border: 2px solid #EBFF6E;
  background: #0F3A40;
  color: white;
  font-size: 16px;
}

.searchInput::placeholder {
  color: #ccc;
}

.searchDropdown {
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  background: #0D7C85;
  border: 1px solid #EBFF6E;
  border-radius: 6px;
  list-style: none;
  max-height: 300px;
  overflow-y: auto;
  z-index: 50;
}

.searchDropdown li {
  padding: 8px 12px;
  cursor: pointer;
  color: white;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.searchDropdown li:hover {
  background-color: #EBFF6E;
  color: #0F3A40;
}

@media (max-width: 768px) {
  .searchBar {
    width: 100%;
    margin: 10px 0;
    padding: 0 20px;
  }
}


@media (max-width: 768px) {
  .headerIn img {
    width: 100%;
  }

  .menu {
    display: none;
    position: absolute;
    top: 60px;
    right: 0;
    background-color: #0F3A40;
    width: 100%;
    z-index: 10;
    flex-direction: column;
    align-items: flex-start;
  }

  .menu.open {
    display: flex;
  }

  .menuList {
    flex-direction: column;
    width: 100%;
  }

  .menuListItem {
    width: 100%;
    margin: 0;
  }

  .menuListItemLink {
    display: block;
    width: 100%;
    padding: 15px 20px;
    font-size: 18px;
  }

  .burger {
    display: flex;
    margin-right: 20px;
  }
}
</style>