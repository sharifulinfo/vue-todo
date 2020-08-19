import Vue from 'vue';
import Vuex from 'vuex';
import todos from './modules/todos';

//load vuex
Vue.use(Vuex);

//cre vuex
export default new Vuex.Store({
    modules : {
        todos 
    }
});