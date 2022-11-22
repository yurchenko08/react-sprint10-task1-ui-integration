import React, {Component} from "react";

import PostsList from "./PostsList";
import NewPostForm from "./NewPostForm";
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const markdown = `# Task Description
This is a small app for listing blog posts.  The state tree stores a list of blog posts
and a list of authors.  Each post entry has an author ID associated.

There's two main components: \`<PostsList>\` and \`<NewPostForm>\`.  Both of them need access to the Redux store.  The
\`<PostsList>\` needs to display a list of posts with the right author details, and the \`<NewPostForm>\` needs to let
the application user select a post author and dispatch an action containing the new post title and the author ID.

The app has a working store set up, and already imported into both component files.  Use \`store.getState()\` to copy
data from the store into the initial component state, and \`store.subscribe()\` and \`getState()\` to get the updated
values from the store so the component can call \`setState()\` and re-render as needed.`
export default class UIIntegrationTask extends Component {
    render() {
        return (
            <div>
                <h3>UI Integration</h3>
                <PostsList />
                <NewPostForm />
                <ReactMarkdown plugins={[gfm]} children={markdown} />
            </div>
        )
    }
}
