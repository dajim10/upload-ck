import React, { useState } from "react";
import MyEditor from "./MyEditor";
import axios from 'axios'


export default function InputContent(props) {
  const [editor, setEditor] = useState(null);
  const [data, setData] = useState({
    content_name: '',
    content_detail: '',
    date: new Date(),
    image: [],
    type: 0,

  })

  function handleChange(e) {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
    console.log(e.target.value)
  }

  
  return (
    <div className="container">
      <h1>RUTs SDGs 17 Goal</h1>
      <form className="form-group">
        <label htmlFor="content_name">Content Title</label>
        <input type="text" className="form-control" name="content_name" onChange={handleChange}/>
        <label htmlFor="selection">Toppic Type</label>
        <select className="form-select" onChange={handleChange} >
          <option value="1">Policy and Operation</option>
          <option value="2">Reserch and Innovation</option>
          <option value="3">Teaching and Learning</option>
          <option value="4">Outreach and Engagement</option>
        </select>
        <label htmlFor="content_detail">Content Detail</label>
        <MyEditor
          handleChange={(data) => {
            setEditor(data);
           
          }}
          data={editor}
          {...props}
          
        />
          <button type="submit" className="btn btn-dark mt-2">Submit</button>
      </form>
      {/* {editor} */}
    </div>
  );
}
