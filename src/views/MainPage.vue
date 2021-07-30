<template>
  <div class="main-page main-back-color w-full">
    <div class="h-screen w-screen flex justify-center items-center absolute z-50" v-if="loader">
      <svg class="loader" width="106" height="106" viewBox="0 0 106 106" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="53" cy="53" r="51" fill="white" stroke="#333333" stroke-width="4"/>
        <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="106" height="53">
        <rect width="106" height="53" fill="#C4C4C4"/>
        </mask>
        <g mask="url(#mask0)">
        <circle cx="53" cy="53" r="51" fill="#F22539" stroke="#333333" stroke-width="4"/>
        </g>
        <path d="M0.392578 53H105.607" stroke="#333333" stroke-width="4"/>
        <circle cx="53" cy="52.9998" r="20.8074" fill="white"/>
        <circle cx="53" cy="52.9998" r="18.8074" stroke="#333333" stroke-width="4"/>
        <path d="M91.731 36.7077C86.9398 25.3318 77.283 16.5081 65.3667 12.8428" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="53" cy="53.0004" r="10.3852" stroke="#808080" stroke-width="2"/>
      </svg>
    </div>

    <div class="absolute w-screen h-screen z-20" :class="[ overlay ? 'overlay' : '' ]" v-if="overlay">
      <pokeModal v-on:closeModal="overlay = false" :poke="modalPoke" class="w-10/12 md:w-8/12 lg:w-6/12"/>
    </div>
    
    <!-- Main page -->
    <div class="w-screen h-screen flex flex-col overflow-hidden" v-if="!loader || loader && overlay">
      <!-- Search bar component -->
      <div class="bar-div w-screen flex justify-center pt-8">
        <searchBar class="w-10/12 md:w-8/12 lg:w-6/12 mb-6" :changedView="allBtn" />
      </div>

      <!-- You look lost! -->
      <div class="flex flex-col pr-4 items-center" v-if="noResults">
        <h2>Uh-oh!</h2>
        <p class="lost mb-4">You look lost on your Journey!</p>
        <button class="main-btn w-6/12 md:w-4/12 lg:w-3/12 mb-6" @click="redirectToHome()">Go back home</button>
      </div>

      <!-- List of pokemon items -->
      <div class="list-div pb-5 overflow-auto">
        <div class="flex flex-col justify-center items-center main-back-color" v-for="poke in filteredList" :key="poke.url">
          <listItem class="mt-2 w-10/12 md:w-8/12 lg:w-6/12" v-on:removed="refreshFavList()" :name="poke.name" :url="poke.url"/>
        </div>
      </div>
      
      <!-- Page footer -->
      <div class="footer-div bg-white flex flex-row justify-center items-center">
        <button class="w-5/12 md:w-4/12 lg:w-3/12" :class="[ allBtn ? 'main-btn' : 'inactive-btn' ]" @click="allClicked()">
          <fa icon="list-ul"/>
          All
        </button>
        <button class="w-5/12 md:w-4/12 lg:w-3/12 ml-4" :class="[ allBtn ? 'inactive-btn' : 'main-btn' ]" @click="favoritesClicked()">
          <fa icon="star"/>
          Favorites
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import searchBar from '../components/searchBar.vue';
import listItem from '../components/listItem.vue';
import pokeModal from '../components/pokeModal.vue';

export default {
  name: "MainPage",
  components:{
    searchBar,
    listItem,
    pokeModal
  },
  data () {
    return {
      loader: true,
      pokemonList: [],
      filteredList: [],
      searchVal: "",
      allBtn: true,
      overlay: false,
      modalPoke: {},
      noResults: false
    }
  },
  computed:{
    favoriteList(){
      return this.$store.state.favoriteList;
    }
  },
  methods:{
    allClicked(){
      if(this.allBtn)
        return
      this.allBtn = true;
      this.filteredList = this.pokemonList;
    },
    favoritesClicked(){
      if(!this.allBtn)
        return
      this.allBtn = false;
      this.filteredList = this.favoriteList;
    },
    refreshFavList(){
      this.filteredList = this.favoriteList.filter(poke => poke.name.toLowerCase().includes(this.searchVal.toLowerCase()));
    },
    capitalizeStr(value){
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    redirectToHome(){
      this.$router.push({ path: '/' });
    }
  },
  mounted(){
    //Api call
    this.axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => {
        this.pokemonList = response.data.results;
        this.filteredList = this.pokemonList;
        this.loader = false;
    });

    //Watch the changes in the store regarding the string value inside of the input
    this.$store.watch(
      ()=>{
        return this.$store.state.searchValue
      },
      (newValue)=>{
        this.searchVal = newValue;
        if(this.allBtn)
          this.filteredList = this.pokemonList.filter(poke => poke.name.toLowerCase().includes(this.searchVal.toLowerCase()));
        else
          this.filteredList = this.favoriteList.filter(poke => poke.name.toLowerCase().includes(this.searchVal.toLowerCase()));

        if(this.filteredList.length == 0){
          this.noResults = true;
        }
      },
    )

    //Watch the changes in the store regarding the modal
    this.$store.watch(
      ()=>{
        return this.$store.state.modalName
      },
      (newValue)=>{
        this.overlay = true;
        this.loader = true;
        this.axios.get('https://pokeapi.co/api/v2/pokemon/'+newValue)
          .then(response => {
            let types = response.data.types.length == 1 ? this.capitalizeStr(response.data.types[0].type.name) : this.capitalizeStr(response.data.types[0].type.name)+' - '+ this.capitalizeStr(response.data.types[1].type.name);
            this.modalPoke = { 
              name: this.capitalizeStr(newValue), 
              weight: response.data.weight, 
              height: response.data.height, 
              types: types,
              sprite: response.data.sprites.front_default
            };
            this.loader = false;
        });
      },
    )
  }
}
</script>

<style scoped>
.loader{
  animation: loading 0.7s linear infinite;
}
@keyframes loading {
    0%   {transform: rotate(0deg)}
    25%  {transform: rotate(120deg)}
    50%  {transform: rotate(240deg)}
    75%  {transform: rotate(360deg)}
    100% {transform: rotate(360deg)}
}
.bar-div{
  flex: 0 0 0em;
}
.list-div{
  flex: 1;
}
.footer-div{
  flex: 0 0 4em;
  filter: drop-shadow(0px -5px 3px #BFBFBF);
}
.overlay{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  -webkit-backdrop-filter: grayscale(1);
  backdrop-filter: grayscale(1);  
}
h2{
  font-size: 2.5em;
}
.lost{
  
}
</style>