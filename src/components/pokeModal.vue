<template>
  <div class="flex flex-col justify-content items-center absolute modal">
    <img class="img" src="../assets/backImg.png" alt="background image">
    <button class="close absolute right-0 mr-6 mt-5" @click="closeModal()">
      <fa class="closeIcon" icon="times"/>
    </button>
    <div class="sprite-div absolute flex items-center">
      <img class="sprite" :src="poke.sprite" alt="poke sprite">
    </div>
    <div class="flex flex-col justify-center items-center attrs w-10/12 md:w-8/12 lg:w-6/12">
      <p class="attr"><b>Name:</b> {{ poke.name }}</p>
      <p class="attr"><b>Weight:</b> {{ poke.weight }}</p>
      <p class="attr"><b>Height:</b> {{ poke.height }}</p>
      <p class="attr"><b>Types:</b> {{ poke.types }}</p>
    </div>
    <div class="buttons flex flex-row justify-center items-center w-10/12 md:w-8/12 lg:w-6/12">
      <button class="share main-btn my-3 mr-8" @click="copy()">Share to my friends</button>
      <button class="fav">
        <fa class="icon" icon="star" v-bind:class="[ isFavorite ? 'favoriteColor' : '' ]"/>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name:"PokeModal",
  props: ['poke'],
  computed:{
    captalizedName(){
      return this.poke.name.charAt(0).toUpperCase() + this.name.slice(1);
    },
    isFavorite(){
      if(this.poke)
        return this.$store.state.favoriteList.find(poke => poke.name.toLowerCase() == this.poke.name.toLowerCase()) ? true : false;
      else
        return false;
    }
  },
  methods:{
    copy(){
      const el = document.createElement('textarea');
      el.value = JSON.stringify(this.poke);
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    },
    closeModal(){
      this.$emit("closeModal");
    }
  }
}
</script>

<style scoped>
.modal{
  height: 80%;
  background-color: white;
  border-radius: 10px;
}
.img{
  border-radius: 10px 10px 0 0;
  flex: 1;
  min-width: 100%;
  max-height: 40vh;
}
.close{
  width: 32px;
  height: 32px;
  background-color: rgba(255,255,255,0.9);
  border-radius: 50%;
}
.closeIcon{
  color: #79C9F9;
  margin-top: 4px;
  margin-left: 1px;
}
.sprite-div{
  max-height: 40vh;
}
.sprite{
  margin-top:20vh;
  height: 15vh;
}
.attrs{
  flex: 1;
}
.attr{
  width: 100%;
  text-align: left;
  border-bottom: 1px solid #E8E8E8;
  padding-bottom: 7.5px;
  margin-bottom: 7.5px;
}
.buttons{
  flex: 0 0 4em;
}
.share{
  flex: 1;
}
.fav{
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
}
</style>