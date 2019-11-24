import {shallowMount} from "@vue/test-utils"
import sinon from "sinon";
import InputTodo from "./../src/components/InputTodo"

test('InputTodo', () => {

    // Render
    const wrapper = shallowMount(InputTodo);

    const baseUrl = "https://test.com";
    const submitFn = sinon.stub();

    wrapper.setProps({"baseurl": baseUrl});

    // Property
    expect(wrapper.vm.baseurl).toBe(baseUrl);

    // DOM Elements
    expect(wrapper.find("form input[type=text]").isVisible()).toBe(true);
    expect(wrapper.find("form button[type=submit]").isVisible()).toBe(true);

    // Methods
    wrapper.setMethods({submit: submitFn});
    wrapper.find('form').trigger('submit');
    expect(submitFn.called).toBe(true);
});