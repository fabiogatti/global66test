<template>
  <div class="listItem flex flex-row justify-center items-center">
    <p class="number" v-on:click="openModal()">#{{ number }}</p>
    <p class="name pl-2" v-on:click="openModal()">{{ capitalizedName }}</p>
    <button class="favorite" @click="toggleFavorite()">
      <fa class="icon" icon="star" v-bind:class="[ isFavorite ? 'favoriteColor' : '' ]"/>
    </button>
    
  </div>
</template>

<script>
export default {
  name:"ListItem",
  props: ['name', 'url'],
  data(){
    return{
      isFavorite: false
    }
  },
  computed:{
    number(){
      let arr = this.url.split("/");
      return arr[arr.length-2];
    },
    capitalizedName(){
      return this.name.charAt(0).toUpperCase() + this.name.slice(1);
    }
  },
  methods:{
    openModal(){
      this.$store.commit('setNewModal',this.name);
    },
    toggleFavorite(){
      if(this.isFavorite){
        this.$store.commit('removeFavorite',this.name);
        this.$emit('removed');
        this.isFavorite = false;
      }
      else{
        this.$store.commit('addFavorite',{ name:this.name, url:this.url, number:this.number });
        this.isFavorite = true;
      }
    }
  },
  mounted(){
    this.isFavorite = this.$store.state.favoriteList.find(poke => poke.name == this.name) ? true : false;
  }
}
</script>

<style scoped>
.listItem{
  background-color: white;
  border-radius: 5px;
  transition: all .3s;
}
.number{
  padding-left: 0.75em;
  padding-top: 0.75em;
  padding-bottom: 0.75em;
  color:#BFBFBF;
  flex: 0 0 1em;
  cursor: pointer;
}
.name{
  padding-top: 0.75em;
  padding-bottom: 0.75em;
  font-weight: bold;
  flex: 1;
  text-align: left;
  cursor: pointer;
}
.favorite{
  margin-right: 0.35em;
  flex: 0 0 2em;
  border-radius: 50%;
  background-color: #E8E8E8;
  width: 2em;
  height: 2em;
}
.icon{
  color:#BFBFBF;
  transition: color 0.25s ease;
  font-size: 1.1em;
}
.favoriteColor{
  color: #ECA539;
  animation: favoriteAnim 0.4s;
}
@keyframes favoriteAnim {
    0%   {scale:1}
    50%  {scale:1.4;}
    100% {scale:1}
}
</style>