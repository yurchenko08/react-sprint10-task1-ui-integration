import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {shallow, configure, mount} from "enzyme";
import NewPostForm from '../tasks/01-ui-integration/NewPostForm';
import PostsList from '../tasks/01-ui-integration/PostsList';
import store from "../tasks/01-ui-integration/store";
import * as actions from "../tasks/01-ui-integration/actions";

configure({adapter: new Adapter()});

describe("NewPostForm", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('State should have array from Store', () => {
        const wrapper = shallow(<NewPostForm/>);
        expect(wrapper.state().authors).toBe(store.getState().authors);
    });

    it('Action creator should be called', () => {
        const state = {
            title: "Hello Kitty",
            selectedAuthor: "bkenobi",
            authors: [],
        };
        const wrapper = mount(<NewPostForm/>);
        wrapper.setState(state);
        const creator = jest.spyOn(actions, "addNewPost");
        wrapper.find('button').props().onClick();
        expect(creator).toHaveBeenCalled();
    });

    it('Action creator should have matching arguments', () => {
        const state = {
            title: "Hello Kitty",
            selectedAuthor: "bkenobi",
            authors: [],
        };
        const wrapper = mount(<NewPostForm/>);
        wrapper.setState(state);
        const creator = jest.spyOn(actions, "addNewPost");
        wrapper.find('button').props().onClick();
        expect(creator).toBeCalledWith("bkenobi", "Hello Kitty");
    });

    it('Title should be cleared', () => {
        const state = {
            title: "Hello Kitty",
            selectedAuthor: "bkenobi",
            authors: [],
        };
        const wrapper = mount(<NewPostForm/>);
        wrapper.setState(state);
        wrapper.find('button').props().onClick();
        expect(wrapper.state().title).toBe("");
    });

    it('Store should dispatch with action', () => {
        const state = {
            title: "Hello Kitty",
            selectedAuthor: "bkenobi",
            authors: [],
        };
        const wrapper = mount(<NewPostForm/>);
        wrapper.setState(state);
        const creator = jest.spyOn(store, "dispatch");
        wrapper.find('button').props().onClick();
        expect(creator).toHaveBeenCalledWith({
            type: "ADD_NEW_POST",
            id: expect.any(String),
            authorId: state.selectedAuthor,
            title: state.title,
        });
    });

    it('Store should not dispatch if author is null', () => {
        const state = {
            title : "",
            selectedAuthor : null,
            authors : [],
        }
        const wrapper = mount(<NewPostForm/>);
        wrapper.setState(state);
        const creator = jest.spyOn(store, "dispatch");
        wrapper.find('button').props().onClick();
        expect(creator).not.toHaveBeenCalled();
    });

    it('Store should not dispatch if title is empty', () => {
        const state = {
            title : "",
            selectedAuthor : null,
            authors : [],
        }
        const wrapper = mount(<NewPostForm/>);
        wrapper.setState(state);
        const creator = jest.spyOn(store, "dispatch");
        wrapper.find('button').props().onClick();
        expect(creator).not.toHaveBeenCalled();
    });
});

describe("PostsList", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('State should have array from Store', () => {
        const wrapper = shallow(<PostsList/>);
        expect(wrapper.state().authors).toBe(store.getState().authors);
        expect(wrapper.state().posts).toBe(store.getState().posts);
    });

    it('Store should be subscribed', () => {
        const creator = jest.spyOn(store, "subscribe");
        shallow(<PostsList/>);
        expect(creator).toHaveBeenCalled();
    });

    it('Callback should be passed', () => {
        const creator = jest.spyOn(store, "subscribe");
        const wrapper = shallow(<PostsList/>);
        expect(creator).toHaveBeenCalledWith(wrapper.instance().onStoreUpdated);
    });

    it('Adding new post should trigger state update', () => {
        const wrapper = shallow(<PostsList/>);
        store.dispatch(actions.addNewPost("bkenobi", "Hello!"));
        expect(wrapper.state().posts.length).toBeGreaterThanOrEqual(4);
        expect(wrapper.state().posts.filter((el) => el.authorId === "bkenobi" && el.title === "Hello!").length).toBe(1);
    });
});
