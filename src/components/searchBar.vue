<template>
  <div class="searchBar">
    <fa class="iconSearch" icon="search" v-bind:class="[ focus ? 'redActive' : '' ]"/>
    <input placeholder="Search" type="text" v-model="value" class="searchInput pl-2" @focus="focus = true" @blur="focus = false">
  </div>
</template>

<script>
export default {
  name:"searchBar",
  props: ["changedView"],
  data () {
    return {
      value: "",
      focus: false
    }
  },
  watch: {
    value: function(newStr){
      this.$store.commit("setSearchValue",newStr);
    },
    changedView: function(){
      this.value = "";
    }
  }
}
</script>

<style scoped>
.searchBar{
  border-radius: 5px;
  background-color: white;
  transition: all .3s;
  padding: 0.5em 0.5em;
}
.iconSearch{
  transition: color 0.25s;
}
.searchInput{
  -webkit-appearance: none;
  outline: none;
  width: calc(100% - 28px);
  color: #C00E20;
}
.redActive{
  color: #C00E20;
}
</style>