<template>
    <div>
        <h3>Todo Lists</h3>
        <ul>
            <li v-for="(todo,index) in allTodos" :class="{completed : todo.completed}" :key="index" @dblclick="editTodo(todo)">{{todo.title}}
                <span @click="deleteTodo(todo.id)">x</span>    
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
export default {
    name:"todos",
    computed: mapGetters(['allTodos']),
    methods: {
        ...mapActions(['getTodos','deleteTodo','updateTodo']),
        editTodo(todo){
            // console.log(todo);
            const data = {
                id : todo.id,
                title : todo.title,
                completed : !todo.completed,
                userId : 1
            }
            // console.log(data);
            this.updateTodo(data);
        }
    },
    created(){
        this.getTodos()
    }
}
</script>

<style scoped>
.completed{
    text-decoration : line-through;
}
</style>