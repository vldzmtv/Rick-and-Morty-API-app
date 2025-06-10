<script setup>

</script>

<template>
  <header class="header">
    <div class="container">
      <div class="headerIn">
        <img
            src="@/assets/Rick_and_Morty.svg"
            alt=""
            class="logo"
        >
        <nav class="menu">
          <ul class="menuList">
            <li class="menuListItem"><a href="" class="menuListItemLink">Персонажи</a></li>
            <li class="menuListItem"><a href="" class="menuListItemLink">Локации</a></li>
            <li class="menuListItem"><a href="" class="menuListItemLink">Эпизоды</a></li>
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
  padding: 10px 20px;
  font-size: 20px;
  cursor: pointer;
}
</style>