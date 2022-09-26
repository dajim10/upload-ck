import React, { useState, useEffect } from "react";
import MyEditor from "./MyEditor";
import axios from 'axios'


export default function InputContent(props) {
  const [editor, setEditor] = useState(null);
  const [sdgs, setSdgs] = useState([]);
  const [typeData, setTypeData] = useState('');
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

  }, [])

  function handleChange(e) {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
    console.log(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content_name", data.content_name);
    formData.append("content_detail", data.content_detail);
    formData.append("date", data.date);
    formData.append("type", typeData);
    console.log(formData)
  }

  return (
    <div className="container">
      <h1>RUTs SDGs 17 Goal</h1>
      <label htmlFor="content_detail">Content Detail</label>
      <MyEditor
          handleChange={(data) => {
            setEditor(data);
          }}
          data={editor}
          {...props}
          name="content_detail"
      />
      
      <form className="form-group" encType="multipart/form-data" onSubmit={handleSubmit}>
        <label htmlFor="content_name">Content Title</label>
        <input type="text" className="form-control" name="content_name" onChange={handleChange} />
        <label htmlFor="selection">Toppic Type</label>
        <select className="form-select" onChange={(e) => {
          setTypeData(e.target.value)
          console.log(e.target.value)
        }}>
          <option value="1">Policy and Operation</option>
          <option value="2">Reserch and Innovation</option>
          <option value="3">Teaching and Learning</option>
          <option value="4">Outreach and Engagement</option>
        </select>
        
        



        {/* <div className="mt-3">
          {sdgs.map((item, idx) => (
            <ul key={idx}>
              <input type="checkbox" />

              <span className="rounded shadow p-2 m-2"
                style={{ backgroundColor: item.color, color: '#fff' }}>[<b>{item.id}</b>]
                {"   "}<i>{item.detail}</i></span>
            </ul>
          ))}


        </div> */}


        <div className="mt-2">
          <input type="submit" className="btn btn-primary" value="submit" />
        </div>
      </form>
      {/* {editor} */}
    </div>
  );
}
