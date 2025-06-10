<script setup>
const props = defineProps({
  charactersList: {
    type: Array,
    required: true,
    default: () => [] // Значение по умолчанию - пустой массив
  }
});
defineEmits(['load-more'])

</script>

<template>
  <section class="mainContent">
    <div class="characterAllCard">
      <div v-for="character in charactersList" class="characterCard">
        <img
            :src="character.image"
            :alt="character.name"
        >
        <div class="characterInfo">
          <h2 class="characterName">{{ character.name}}</h2>
          <p>{{ character.status }}</p>
          <p>{{ character.species}}</p>
          <p>{{ character.location.name}}</p>
        </div>
      </div>
    </div>
    <div class="btnContainer">
      <button @click="$emit('load-more')" class="loadBtn">
        Показать ещё
      </button>
    </div>
  </section>

</template>

<style scoped>
.characterAllCard {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1920px;
  align-items: center;
}
.characterCard {
  width: 600px;
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
}
.characterName {
  color: #EBFF6E;
}
.characterInfo {
  flex-direction: row;
  padding: 15px;
}
.mainContent {
  background: #0F3A40;
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


}
</style>