import React, { useState,useEffect } from "react";
import MyEditor from "./MyEditor";
import axios from 'axios'


export default function InputContent(props) {
  const [editor, setEditor] = useState(null);
  const [sdgs, setSdgs] = useState([]);
  const [data, setData] = useState({
    content_name: '',
    content_detail: '',
    date: new Date(),
    image: [],
    type: 0,

  })

  const getData = () => {
    axios.get('http://localhost:3000/sdgs')
      .then(res => setSdgs(res.data))
      .catch(err => console.log(err));
  }
  
  useEffect(() => {
    getData();
    
  },[])

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
      <form className="form-group" encType="multipart/form-data">
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
        <div className="mt-3">
          {sdgs.map((item, idx) => (
            <ul key={idx}>
              <input type="checkbox" />
             
              <span className="rounded shadow p-2 m-2"
                style={{ backgroundColor: item.color, color: '#fff' }}>{item.id}{item.detail}</span>
            </ul>
          ))}
        </div>
        <div>
          <input type="submit"  className="btn btn-dark btn-lg" value="submit"/>
       </div>
      </form>
      {/* {editor} */}
    </div>
  );
}
