import React, { useState } from "react";
import MyEditor from "./MyEditor";

export default function App(props) {
  const [editor, setEditor] = useState(null);
  return (
    <div className="App">
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
