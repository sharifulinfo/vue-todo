<template>
    <div>
        <form @submit="saveTodo">
            <input type="text" v-model="title" class="form-control">
            <button type="submit" class="btn btn-info">Save</button>
        </form>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name : "AddTodo",
    methods : {
        ...mapActions(['newTodo']),
        saveTodo(e){
            e.preventDefault();
            this.newTodo(this.title);
            this.title = "";
        }
    },
    data () {
        return {
            title : '',
        }
    }
}
</script>