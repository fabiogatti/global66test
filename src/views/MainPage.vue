<template>
  <div>

  </div>
</template>

<script>
export default {
  name: "MainPage",
  data () {
    return {
      pokemonJson: null
    }
  },
  mounted(){
    this.axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => {
        (this.pokemonJson = response); 
        console.log(this.pokemonJson);
      });
  }
}
</script>

<style scoped>

</style>