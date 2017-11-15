import * as types from './mutation-types'
import { person } from '@/service'

export default {
  namespaced: true,
  state: {
    personList: [],
    person: {id: 0, name: null, age: 0, sex: 0, phone: null, address: null, birthday: null, boxStr: []}
  },
  mutations: {
    [types.GET_ALL_PERSONS] (state, {persons}) {
      state.personList = persons
    },
    [types.GET_PERSON_BY_ID] (state, {person}) {
      state.person = person
    },
    [types.DEL_PERSON_BY_ID] (state, {id}) {
      let index = state.personList.findIndex((obj) => {
        return obj.id === id
      })
      state.personList.splice(index, 1)
    }
  },
  actions: {
    getPersons ({commit}, params) {
      return person.personList(params).then(data => {
        commit(types.GET_ALL_PERSONS, {persons: data})
      })
    },
    getPerson ({commit}, id) {
      if (id) {
        person.personDetail(id).then(data => {
          if (data && data.boxStr) {
            data.boxStr = data.boxStr.split(',')
          } else {
            data.boxStr = []
          }
          commit(types.GET_PERSON_BY_ID, {person: data})
        })
      }
    },
    deletePerson ({commit}, id) {
      person.deletePerson(id).then(() => {
        commit(types.DEL_PERSON_BY_ID, {id})
      })
    }
  }
}
