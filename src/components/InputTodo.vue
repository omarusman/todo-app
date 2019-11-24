<template>
    <form @submit.prevent="submit" class="block w-full py-2 flex border px-2 rounded mb-2">
        <input type="text"
               class="flex-1 w-full text-xl font-semibold px-2"
               :value="todoItem"
               placeholder="What do you want to do?"/>
        <button type="submit" class="flex-initial ml-2 px-2 py-1 rounded text-white bg-green-500 hover:bg-green-700 h-full" :disabled="isAdding">Add</button>
    </form>
</template>
<script>
    import uuid from "uuid/v4";
    import http from "axios";

    export default {

        props: ["baseurl"],

        data: () => {
            return {
                todoItem: "",
                isAdding: false
            }
        },

        methods: {

            /**
             * When form is submitted, store item.
             */
            submit() {

                // Prepare data.
                this.todoItem = this.$el.querySelector("input").value;
                const data = {id: uuid(), todo: this.todoItem, completed: false};

                // If empty item, show error.
                if (data.todo === "" || data.todo === undefined || data.todo === null) {
                    return this.$emit("error", "Please enter your todo first.");
                }

                this.isAdding = true;

                // Store data.
                http.post(this.baseurl + "/" + data.id, data).then(response => {
                    this.$emit("added", data);
                    this.todoItem = "";
                }).catch(() => {
                    this.$emit("error", "Unable to add your todo item.");
                }).finally(() => {
                    this.isAdding = false;
                });
            }
        }
    }
</script>