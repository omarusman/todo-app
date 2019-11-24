import {shallowMount} from "@vue/test-utils"
import sinon from "sinon";
import InputTodo from "./../src/components/InputTodo"

test('InputTodo', () => {

    // Render
    const wrapper = shallowMount(InputTodo);

    // Methods
    const getTodos = sinon.stub();
    wrapper.setMethods({getTodos: getTodos});
    wrapper.vm.getTodos();
    expect(getTodos.called).toBe(true);

    const todoItemAdded = sinon.stub();
    wrapper.setMethods({todoItemAdded: todoItemAdded});
    wrapper.vm.todoItemAdded();
    expect(todoItemAdded.called).toBe(true);

    const showError = sinon.stub();
    wrapper.setMethods({showError: showError});
    wrapper.vm.showError();
    expect(showError.called).toBe(true);
});