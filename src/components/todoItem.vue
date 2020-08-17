<template>
      <tr>
      <td><input type="checkbox" :checked="completed ? 'checked' : ''" @change="statusTodo()"/></td>
        <td class="font-weight-bold">{{id}}</td>
        <td>
          <p class="font-weight-bold"
            @dblclick="editTodo(todo)" 
            v-if="edit == false"  
            :class="completed ? 'completed':''">{{title}}</p>

          <input class="form-control" type="text"
            v-else 
            v-focus 
            @blur="updateTodo(todo)" 
            @keyup.enter="updateTodo(todo)" 
            @keyup.esc="redoTodo(todo)" 
            v-model="title">

        </td>
        <td @click="removeTodo(index)">X</td>
        </tr>
</template>

<script>
export default {
    name : 'todoItem',
    // props : ['todo','index'],
    props : {
        todo : {
            type: Object,
            required : true
        },
        index: {
            type : Number,
            required : true
        },
        checkAll : {
            type: Boolean,
            required : true
        }
    },
     watch:{
        checkAll(){
            this.completed = this.checkAll ? true : this.todo.completed;
        }
    },
    data(){
        return{
            id:this.todo.id,
            title:this.todo.title,
            completed:this.todo.completed,
            edit:this.todo.edit,
            todoCash: "",
        }
    },
   
    methods:{
        removeTodo(index){
            this.$emit('removedTodo',index)
        },
        editTodo(){
            this.todoCash = this.title;
            this.edit = true;
        },
        updateTodo(){
            if(this.title.trim().length == 0){
                this.title = this.todoCash;
            }
            this.edit = false;
            this.$emit('finishedUpdate', {
                'index' : this.index,
                'todo' : {
                    'id' : this.id,
                    'title' : this.title,
                    'completed' : this.completed,
                    'edit' : this.edit,
                }
            })
        },
        redoTodo(){
            this.title = this.todoCash;
            this.edit = false;
            this.todoCash = '';
        },
        statusTodo(){
            this.completed = !this.completed;
            this.$emit('ChangeStatus',{
                'index' : this.index,
                'todo' : {
                    'id' : this.id,
                    'title' : this.title,
                    'completed' : this.completed,
                    'edit' : this.edit,
                }
            })
        },
    },
}
</script>

<style scoped>
.completed{
  text-decoration: line-through;
  color:gray;
}
</style>