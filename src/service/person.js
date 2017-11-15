import fetch from '@/config/fetch'

export default {
  personList (params) {
    return fetch('/sort', {params})
  },
  personDetail (id) {
    return fetch('/find', {
      params: {id: id}
    })
  },
  save (data) {
    return fetch('/savePerson', {
      method: 'post',
      data
    })
  },
  deletePerson (id) {
    return fetch('/delete', {
      method: 'delete',
      data: {id}
    })
  }
}
