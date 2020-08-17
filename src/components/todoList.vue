<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="text" class="form-control mb-2" v-model="newTodo" @keyup.enter="addTodo">
    <table class="table table-striped table-borderd">
      <thead class="bg-success">
      <tr>
        <th width="50"><input type="checkbox" @change="checkAll()" :checked="!anyRemaining"/></th>
        <th width="50">SL</th>
        <th>Title</th>
        <th width="50">Action</th>
      </tr>
      </thead>
      <tbody>
      <todoItem v-for="(todo,index) in todosFilters" :key="todo.id" :todo="todo" :index="index" :checkAll="!anyRemaining" @removedTodo="removeTodo" @finishedUpdate="finishedUpdates" @ChangeStatus="finishedUpdates">
      </todoItem>
      </tbody>
    </table>
    <div>
      <p>{{remaining}} item left</p>
    </div>
    
    <div class="d-flex w-50 float-left">
      <button class="btn btn-info m-1" :class="{active : filter == 'all'}"  @click="filter = 'all'">All</button>
      <button class="btn btn-info m-1" :class="{active : filter == 'complete'}" @click="filter = 'complete'">Completed</button>
      <button class="btn btn-info m-1" :class="{active : filter == 'pending'}"  @click="filter = 'pending'">Pending</button>
    </div>
    <button class="btn btn-warning m-1 float-right" v-if="showCompletedClearButton" @click="clearCompleted()">Clear Completed</button>

    
  </div>
</template>

<script>
import todoItem from './todoItem'
export default {
  name: 'todoList',
  props: {
    msg: String
  },
  components:{
    todoItem,
  },
  data () {
    return {
      newTodo: "",
      todoCash: "",
      filter: "all",
      Tid: 3,
      todos: [
        {id:1,title:'my task 1',completed:true,edit:false},
        {id:2,title:'my task 2',completed:false,edit:false},
      ],
    }
  },

  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  computed:{
    remaining(){
      return this.todos.filter(todo => !todo.completed).length;
    },
    anyRemaining(){
      return this.remaining != 0;
    },
    showCompletedClearButton(){
      return this.todos.filter(todo => todo.completed).length > 0;
    },
    todosFilters(){
      if(this.filter == 'all'){
        return this.todos;
      }else if(this.filter == 'complete'){
        return this.todos.filter(todo => todo.completed);
      }else if(this.filter == 'pending'){
        return this.todos.filter(todo => !todo.completed);
      }
      return this.todos;
    }
  },
  methods:{
    addTodo(){
      if(this.newTodo.trim().length == 0){
        return
      }
      this.todos.push({
        id:this.Tid,
        title:this.newTodo,
        completed:false,
        edit:false
      });
      this.newTodo = "";
      this.Tid = this.Tid+1; 
    },
    removeTodo(index){
      this.todos.splice(index,1);
    },
    
    checkAll(){
      this.todos.forEach((todo)=> todo.completed = event.target.checked);
    },
    clearCompleted(){
      this.todos = this.todos.filter(todo => !todo.completed);
    },
    finishedUpdates(data){
      this.todos.splice(data.index,1,data.todo);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

