import React, { useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = ({ content, onSetFieldChange }: any) => {
  return (
    <ReactQuill
      theme="snow"
      value={content}
      onChange={(e) => onSetFieldChange("content", e)}
      placeholder="Content"
    />
  );
};

export default TextEditor;
