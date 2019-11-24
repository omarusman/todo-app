import Vue from "vue";
import InputTodo from "./components/InputTodo";
import TodoItem from "./components/TodoItem";
import http from "axios";
import _ from "lodash";

new Vue({

    el: "#todo",

    data: {
        baseUrl: "https://www.jsonstore.io/76d13b4df56acdcc0852956896af3a6f8787938959a1c1bd5749e74050dbfbbb",
        todoItems: []
    },

    components: {
        "input-todo": InputTodo,
        "todo": TodoItem
    },

    methods: {

        /**
         * Init app.
         */
        init() {
            this.getTodos();
        },

        /**
         * Get list of items.
         */
        getTodos() {

            http.get(this.baseUrl).then(response => {
                _.forEach(response.data.result, (todo) => {
                    this.todoItems.push(todo);
                });
            }).catch(xhr => {
                this.showError("Unable to get list of todos.");
            });
        },

        /**
         * On item is added, store to memory and update view.
         *
         * @param todo
         */
        todoItemAdded(todo) {
            this.todoItems.push(todo);
        },

        /**
         * Show error to user.
         *
         * @param msg
         */
        showError(msg) {
            alert(msg);
        }
    },

    mounted() {
        this.init();
    }
});