const STORAGE_KEY = 'sysu_name_js'
const STORAGE_KEY1 = 'sysu_Id_js'
const STORAGE_KEY2 = 'sysu_Count_js'
export default {

  fetchName: function() {

    return window.JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '')

  },

  saveName: function(items) {

    window.localStorage.setItem(STORAGE_KEY, window.JSON.stringify(items))

  },

  fetchId: function() {

    return window.JSON.parse(window.localStorage.getItem(STORAGE_KEY1) || '')

  },

  saveId: function(items) {

    window.localStorage.setItem(STORAGE_KEY1, window.JSON.stringify(items))

  },

  fetchCount: function() {

    return window.JSON.parse(window.localStorage.getItem(STORAGE_KEY2) || '[]')

  },

  saveCount: function(items) {

    window.localStorage.setItem(STORAGE_KEY2, window.JSON.stringify(items))

  }

}