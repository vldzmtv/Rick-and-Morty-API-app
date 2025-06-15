<script setup>

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
          >
        </router-link>
        <nav class="menu">
          <ul class="menuList">
            <li class="menuListItem"><router-link to="/" class="menuListItemLink">Characters</router-link></li>
            <li class="menuListItem"><router-link to="/locations" class="menuListItemLink">Locations</router-link></li>
            <li class="menuListItem"><router-link to="/episodes" class="menuListItemLink">Episodes</router-link></li>
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
</style>