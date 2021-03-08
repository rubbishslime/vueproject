import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        id: '',
      username: '',
        password: '',
        job: '',
        gender: '',
        phone: '',
        age:' ',
        grade: '',
        corporation: '',
        staus:'',
        select:''
    },

    mutations: {
        // cUsername(state) {
        //     state.username = this.formInline.username
        // }
    }
});

export default store;