import {$getRoot, $getSelection} from 'lexical';
import {useEffect, useState} from 'react';

import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {OnChangePlugin} from "@lexical/react/LexicalOnChangePlugin";

const theme = {}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
    console.error(error);
}

export default function Editor(props) {
    const initialConfig = {
        namespace: 'MyEditor',
        theme,
        onError,
    };

    const [editorState, setEditorState] = useState();

    function onChange(editorState) {
        setEditorState(editorState);
        console.log(editorState);
        editorState._nodeMap.forEach((node) => {
            if (node.__type === 'text') {
                props.setContent(node.__text);
            }
        });
    }

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <RichTextPlugin
                contentEditable={<ContentEditable className={'content-editable'}/>}
                placeholder={<div className={'content-editable_placeholder'}>
                    Compose, Compose, Compose!!!</div>}
                ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin/>
            <AutoFocusPlugin/>
            <OnChangePlugin onChange={onChange}/>
        </LexicalComposer>
    );
}
