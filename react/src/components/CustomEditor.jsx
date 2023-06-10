import { useState } from 'react';
import {
    BtnBold,
    BtnNumberedList,
    BtnStrikeThrough,
    BtnBulletList,
    BtnLink,
    BtnItalic,
    BtnUndo,
    BtnRedo,
    Editor,
    EditorProvider,
    Toolbar
} from 'react-simple-wysiwyg';

export default function CustomEditor({value, onChange}) {

    return (
        <EditorProvider>
            <Editor value={value} onChange={onChange}>
                <Toolbar>
                    <BtnBulletList />
                    <BtnNumberedList />
                    <BtnLink/>
                    <BtnStrikeThrough />
                    <BtnBold />
                    <BtnItalic />
                    <BtnUndo />
                    <BtnRedo />
                </Toolbar>
            </Editor>
        </EditorProvider>
    );
}
