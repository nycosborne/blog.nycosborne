import React, {useEffect, useState} from 'react';
import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {OnChangePlugin} from "@lexical/react/LexicalOnChangePlugin";
import {HeadingNode} from "@lexical/rich-text";
import {ListPlugin} from "@lexical/react/LexicalListPlugin";
import {ListItemNode, ListNode} from "@lexical/list";
import {ToolbarPlugin} from "./editor/Toolbar.jsx";


const theme = {
    heading: {
        h1: 'content-editable_h1',
        h2: 'content-editable_h2',
        h3: 'content-editable_h3',
    },
    text: {
        bold: 'test-class'
    },
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
    console.error(error);
}

export default function Editor(props) {
    const [editorState, setEditorState] = useState();

    const initialConfig = {
        namespace: 'MyEditor',
        theme: theme,
        onError,
        nodes: [
            HeadingNode, ListNode, ListItemNode
        ],
    };

    function onChange(editorState) {
        setEditorState(editorState);
        console.log(editorState);
        editorState._nodeMap.forEach((node) => {
            if (node.__type === 'text') {
                props.setContent(node.__text);
            }
        });
    }

    // When the editor changes, you can get notified via the
    // OnChangePlugin!
    function MyOnChangePlugin({onChange}) {
        // Access the editor through the LexicalComposerContext
        const [editor] = useLexicalComposerContext();
        // Wrap our listener in useEffect to handle the teardown and avoid stale references.
        useEffect(() => {
            // most listeners return a teardown function that can be called to clean them up.
            return editor.registerUpdateListener(({editorState}) => {
                // call onChange here to pass the latest state up to the parent.
                onChange(editorState);
            });
        }, [editor, onChange]);
        return null;
    }

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <ToolbarPlugin/>
            <ListPlugin/>
            <RichTextPlugin
                contentEditable={<ContentEditable className={'content-editable'}/>}
                placeholder={<div className={'content-editable_placeholder'}>
                    Compose, Compose, Compose!!!</div>}
                ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin/>
            <AutoFocusPlugin/>
            {/*<MyOnChangePlugin onChange={onChange}/>*/}
            <OnChangePlugin onChange={onChange}/>
        </LexicalComposer>
    );
}
