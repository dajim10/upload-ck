import React, { useState } from "react";
import MyEditor from "./MyEditor";

export default function InputContent(props) {
  const [editor, setEditor] = useState(null);
  return (
      <div className="container">
          
      <MyEditor
        handleChange={(data) => {
          setEditor(data);
        }}
        data={editor}
        {...props}
      />
      {editor}
      {/* {process.env.REACT_API_KEY} */}
    </div>
  );
}
