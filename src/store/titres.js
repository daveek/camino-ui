import Vue from 'vue'
import { titres } from '../api'

export const state = {
  list: null,
  domaines: null,
  types: null,
  statuts: null,
  substances: null,
  noms: null
}

export const actions = {
  async get({ state, dispatch, commit }, fetchPolicy) {
    const args = {
      typeIds: state.types && state.types.filter(e => e.checked).map(e => e.id),
      domaineIds:
        state.domaines && state.domaines.filter(e => e.checked).map(e => e.id),
      statutIds:
        state.statuts && state.statuts.filter(e => e.checked).map(e => e.id),
      substances: state.substances,
      noms: state.noms
    }

    const a = Object.keys(args).reduce(
      (res, key) =>
        args[key] ? Object.assign(res, { [key]: args[key] }) : res,
      {}
    )

    try {
      const res = await titres(a, fetchPolicy)
      if (res) {
        commit('set', res.map(t => t))
      } else {
        console.log('pas de titres…')
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
    }
  },

  filterInput({ state, dispatch, commit }, { name, value }) {
    const values = value ? value.split(/[ ,]+/) : null
    commit('filterInput', { name, values })
    dispatch('get')
  },

  filterToggle({ state, dispatch, commit }, { name, value, property }) {
    state[name]
      .filter(e => e[property].toString() === value)
      .forEach(f => commit('filterToggle', f))
    dispatch('get')
  }
}

export const getters = {}

export const mutations = {
  set(state, titres) {
    Vue.set(state, 'list', titres)
  },

  metasSet(state, { name, values }) {
    // ici on pourrait faire mieux, en
    // - n'ajoutant que les valeurs qui n'existent pas déjà
    // - et ainsi conserver leur état checked
    Vue.set(state, name, values.map(v => Object.assign({ checked: true }, v)))
  },

  filterToggle(state, f) {
    Vue.set(f, 'checked', !f.checked)
  },

  filterInput(state, { name, values }) {
    Vue.set(state, name, values)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
