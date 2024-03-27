import React from 'react';

import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {$createHeadingNode} from "@lexical/rich-text";
import {$getRoot, $createTextNode, $getSelection, $isRangeSelection} from 'lexical';
import {$setBlocksType} from "@lexical/selection"
import {INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND} from "@lexical/list";


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
            if (tag === 'ol') {
                editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
            } else {
                editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
            }
        });
    }
    return (<>{['ol', 'ul'].map((tag) => {
        return <button key={tag} type="button" onClick={() => onClick(tag)}>{tag.toUpperCase()}</button>
    })}</>);
}

export function ToolbarPlugin() {
    const [editor] = useLexicalComposerContext();

    return (
        <div className={'content-editable_toolBarPlugin-toolbar-wrapper'}>
            <HeadingTag/>
            <ListToolbarPlugin/>
        </div>
    );
}
