import axios from 'axios'

const state = {
    todos : []
};
const getters = {
    allTodos: (state) => state.todos
};
const actions = {
    async getTodos({ commit }){
        const response = await axios.get('https://jsonplaceholder.cypress.io/todos/');
        commit('setTodos',response.data)
    },
    async newTodo({commit},title){
        const response = await axios.post('https://jsonplaceholder.cypress.io/todos/',{
            title,completed:false
        });
        commit('addTodo',response.data);
    },
    async deleteTodo({commit},id){
        await axios.delete(`https://jsonplaceholder.cypress.io/todos/${id}`);
        commit('removeTodo',id);
    },
    async filterTodos({commit},e){
        const number = parseInt(e.target.options[e.target.options.selectedIndex].innerText);
        const response = await axios.get(`https://jsonplaceholder.cypress.io/todos/?_limit=${number}`);
        commit('filterTodo',response.data);
    },

    async updateTodo({commit},data){
        const response = await axios.put(`https://jsonplaceholder.cypress.io/todos/${data.id}`,data);
        commit('upTodo',response.data)
    }
};
const mutations = {
    setTodos : (state,todos) => (state.todos = todos),
    addTodo : function (state,newTodo){
        return state.todos.unshift(newTodo);
    },
    removeTodo : function (state,id){
        return state.todos = state.todos.filter(function(todo){
            return todo.id !== id
        });
    },
    filterTodo:function(state,todos){
        return state.todos = todos
    },
    upTodo:function(state,data){
        const index = state.todos.findIndex(todo => todo.id === data.id);
        if(index !== -1){
            state.todos.splice(index,1,data);
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}