import React, {useEffect, useState} from 'react';
import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {OnChangePlugin} from "@lexical/react/LexicalOnChangePlugin";
import {HeadingNode, $createHeadingNode} from "@lexical/rich-text";
import {$getRoot, $createTextNode, $getSelection, $isRangeSelection} from 'lexical';
import {$setBlocksType} from "@lexical/selection"
import {ListPlugin} from "@lexical/react/LexicalListPlugin";
import {INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, ListItemNode, ListNode} from "@lexical/list";


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

function PrintsToEditor() {
    const [editor] = useLexicalComposerContext();
    const onClick = (e) => {
        e.preventDefault()
        editor.update((editorState) => {
            const root = $getRoot(editor);
            root.append($createHeadingNode('h1').append($createTextNode('Hello World')));
        });
    }
    return <button type="button" onClick={onClick}>Heading</button>
}

function HeadingTag() {
    const [editor] = useLexicalComposerContext();

    const onClick = (tag) => {
        editor.update((editorState) => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createHeadingNode(tag));
            }
        });
    }
    return (<>{['h1', 'h2', 'h3'].map((tag) => {
        return <button key={tag} type="button" onClick={() => onClick(tag)}>{tag.toUpperCase()}</button>
    })}

    </>)
}

function ListToolbarPlugin() {
    const [editor] = useLexicalComposerContext();

    const onClick = (tag) => {
        editor.update((editorState) => {
            const selection = $getSelection();
            if (tag === 'ol'){
                editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
            } else {
                editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
            }
        });
    }
    return (<>{['ol', 'ul'].map((tag) => {
        return <button key={tag} type="button" onClick={() => onClick(tag)}>{tag.toUpperCase()}</button>
    })}

    </>)
}

function ToolbarPlugin() {
    const [editor] = useLexicalComposerContext();

    return (
        <div className={'content-editable_toolBarPlugin-toolbar-wrapper'}>
            <HeadingTag/>
            <ListToolbarPlugin/>
        </div>
    );
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
