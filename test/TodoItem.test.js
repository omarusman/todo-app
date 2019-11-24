import {shallowMount} from "@vue/test-utils"
import TodoItem from "./../src/components/TodoItem"

// <todo :data="todo" :baseurl="baseUrl" @error="showError"></todo>
test('TodoItem', () => {

    // Render
    const wrapper = shallowMount(TodoItem);

    const baseUrl = "https://test.com";
    const data = {id: 1, todo: "todo", completed: false};

    wrapper.setProps({
        "baseurl": baseUrl,
        "data": data
    });

    // Property
    expect(wrapper.vm.baseurl).toBe(baseUrl);
});