import React, { useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type EditorProps = {
  content: string;
  onEditorSetContent: (content: string) => void;
};
const TextEditor = ({ content, onEditorSetContent }: EditorProps) => {
  return (
    <ReactQuill
      theme="snow"
      value={content}
      onChange={(e) => onEditorSetContent(e)}
      placeholder="Content"
    />
  );
};

export default TextEditor;
