<template>
    <div class="block w-full px-4 py-2 text-xl border rounded block mb-1" :class="{'bg-gray-100': isUpdating, 'bg-red-100': isDeleting}">
        <div class="flex">
            <p class="flex-1" :class="{'completed': isCompleted()}">{{ getTodo() }}</p>
            <div class="flex-initial" @click="toggleDone">
                <a href="#" class="ml-2 text-xs px-2 py-1 rounded text-white bg-gray-500 hover:bg-gray-700">{{ isCompleted() ? "Undo" : "Done" }}</a>
            </div>
            <div class="flex-initial" @click="deleteTodo">
                <a href="#" class="ml-2 text-xs px-2 py-1 rounded text-white bg-red-500 hover:bg-red-700">Delete</a>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .completed {
        text-decoration: line-through;
    }
</style>
<script>
    import http from "axios";

    export default {

        props: ["data", "baseurl"],

        data: () => {
            return {
                item: {
                    id: "",
                    todo: "",
                    completed: false
                },
                isUpdating: false,
                isDeleting: false,
            }
        },

        methods: {

            /**
             * Initialize component.
             */
            init() {
                this.item = this.data;
            },

            /**
             * Check if item is completed or not.
             */
            isCompleted() {

                if (this.item !== undefined) {
                    return this.item.completed;
                }

                return false;
            },

            /**
             * Get todo.
             */
            getTodo() {

                if (this.item !== undefined) {
                    return this.item.todo;
                }

                return 'empty';
            },

            /**
             * Toggle item state.
             */
            toggleDone() {

                this.isUpdating = true;

                // Prepare data.
                const data = {
                    id: this.item.id,
                    todo: this.item.todo,
                    completed: !this.item.completed // Toggle value.
                };

                // Update data.
                http.put(this.baseurl + "/" + data.id, data).then(() => {
                    this.item.completed = data.completed;
                }).catch(xhr => {
                    this.$emit("error", "Unable to mark todo item.");
                }).finally(() => {
                    this.isUpdating = false;
                });
            },

            /**
             * Delete item.
             */
            deleteTodo() {

                this.isDeleting = true;

                // Prepare data.
                const data = {
                    id: this.item.id,
                    todo: this.item.todo,
                    completed: !this.item.completed // Toggle value.
                };

                // Update data.
                http.delete(this.baseurl + "/" + data.id, data).then(() => {
                    this.$el.remove();
                }).catch(xhr => {
                    this.$emit("error", "Unable to delete todo item.");
                }).finally(() => {
                    this.isDeleting = false;
                });
            }
        },

        mounted() {
            this.init();
        }
    }
</script>