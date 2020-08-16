<template>
  <div class="hello">
    <input type="text" class="form-conrtol mb-2" v-model="newTodo" @keyup.enter="addTodo">
    <h1>{{ msg }}</h1>
    <table class="table">
      <thead>
      <tr>
        <th>SL</th>
        <th>Name</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(todo,index) in todos" :key="todo.id">
        <td>{{todo.id}}</td>
        <td>{{todo.name}}</td>
        <td>{{todo.status}}</td>
        <td @click="removeTodo(index)">Delete</td>
      </tr>
      </tbody>
    </table>

    
  </div>
</template>

<script>
export default {
  name: 'todoList',
  props: {
    msg: String
  },
  data () {
    return {
      newTodo: "",
      Tid: 3,
      todos: [
        {id:1,name:'my task 1',status:'False'},
        {id:2,name:'my task 2',status:'False'},
      ],
    }
  },
  methods:{
    addTodo(){
      if(this.newTodo.trim().length == 0){
        return
      }
      this.todos.push({
        id:this.Tid,
        name:this.newTodo,
        status:'False'
      });
      this.newTodo = ""; 
      this.Tid = this.Tid+1; 
    },
    removeTodo(index){
      this.todos.splice(index,1);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
