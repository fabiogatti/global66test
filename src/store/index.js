import { createStore } from "vuex";

export default createStore({
  state: {
    searchValue: "",
    favoriteList: [],
    modalName: ""
  },
  mutations: {
    setSearchValue(state,val){
      state.searchValue = val;
    },
    addFavorite(state,val){
      state.favoriteList.push(val);
      state.favoriteList = state.favoriteList.sort(function(poke1, poke2) {
        return poke1.number - poke2.number;
      });
    },
    removeFavorite(state,name){
      state.favoriteList = state.favoriteList.filter(poke => poke.name != name);
    },
    setNewModal(state,name){
      state.modalName = name;
    }
  },
  actions: {},
  modules: {},
});
