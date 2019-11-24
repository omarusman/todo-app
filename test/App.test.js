import {mount} from "@vue/test-utils"
import sinon from "sinon";
import App from "./../src/components/App"

test('App', () => {

    // Render
    const wrapper = mount(App);

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