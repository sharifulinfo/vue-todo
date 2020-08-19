<template>
    <div>
        <h3>Todo Lists</h3>
        <ul>
            <li v-for="(todo,index) in allTodos" :key="index">{{todo.title}}</li>
        </ul>
    </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
export default {
    name:"todos",
    computed: mapGetters(['allTodos']),
    methods: {
        ...mapActions(['getTodos']),
    },
    created(){
        this.getTodos()
    }
}
</script>