const state = {
  name: ''
}

const getters = {
  name: state => state.name
}

const mutations = {
  SET_ANIME_NAME (state, name) {
    state.name = name
  }
}

export default {
  state,
  getters,
  mutations
}
