import React, { useState } from "react";
import ReactDom from 'react-dom'
import './index.css'
const history=[];
const App=()=>{
  const [text,Ctext]=useState("");
  const [data,Cdata]=useState("ඔබේ ප්රශ්නය");
  var text1=""
  const clicked=(event)=>{
    Ctext(event.target.value)
  }
  const fileRead=(event)=>{
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
          const content = e.target.result;
          Ctext(content+text)
      };
      reader.readAsText(file);
    } 
  }
  const htmlToText=(content)=>{
    const doc=document.getElementById('textData')
    doc.innerHTML=content
    text1=doc.textContent
  }
  const typeWritter=()=>{
    const doc=document.getElementById('textData')
  }
  async function save() {
    if(text.length>100) Cdata(text.slice(0,30)+'.....')
    else Cdata(text)
    const doc=document.getElementById('inputText');
    doc.value=""
    try {
      const res = await fetch("http://127.0.0.1:5000/data1", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          text: text
        })
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      htmlToText(data['msg'])
      // Get the first element with the class name 'side'
      const doc = document.getElementsByClassName('side')[0];
      if (doc) {
          // Create a new div element
          const ele = document.createElement('div');
          ele.innerText = data['text'].slice(0, 30);

          // Apply styles to the div
          ele.style.height = '15px';
          ele.style.fontSize = '20px';
          ele.style.backgroundColor = 'gray';
          ele.style.textAlign = 'center';
          ele.style.padding = '10px';
          ele.style.alignContent = 'center';
          ele.style.marginTop = '5px';

          ele.addEventListener('click', () => {
              const doc1=document.getElementById('textData')
              doc1.innerText = text1;
          });

          // Prepend the div to the 'side' element
          doc.after(ele);

          // Log data to history
          history.push([data['text'], data['msg']]);
      } else {
          console.error("No elements with class 'side' found.");
      }
      console.log(data['text']);
      Ctext("")
    } catch (error) {
      console.log(error)
    }
  }

  
  return(
    <div style={{
      display:'flex',
    }}>
      <div style={{
            height:'700px',
            width:'330px',
            backgroundColor:'#e3e3e3',
            borderRadius:'5px',
            boxSizing:"border-box",
            overflowY:'auto',
            display:'flex',
            flexDirection:'column',
          }}>
            <h1 style={{
              height:'20px',
              fontSize:'20px',
              width:'310px',
              backgroundColor:'gray',
              textAlign:'center',
              fontWeight:'bold',
              padding:'10px',
              alignContent:'center',
              margin:'0px'
            }} className="side">ඉතිහාසය</h1>
        </div>
      <div style={{
        marginLeft:'100px'
      }}>
          <div style={{
            height:'30px',
            backgroundColor:'gray',
            fontWeight:'bold',
            fontSize:'25px',
            padding:'10px',
            borderRadius:'5px'
          }} >{data}</div>
          <div style={{
            boxSizing:"border-box",
            width:'900px',
            height:'600px',
            marginLeft:'50px',
            padding:'10px',
            borderRadius:'8px',
            overflowY:'auto'
          }} id="textData" >
          </div>
          <div>
            <div className="file-container">
              <button className="custom-button"><i className="fa-solid fa-file fa-beat-fade"></i></button>
              <input type="file" id="fileInput" onChange={fileRead}/>
            </div>
            <input type="text" onChange={clicked} style={{
              width:'830px',
              height:'20px',
              marginTop:'10px',
              marginLeft:'10px',
              borderRadius:'10px',
              border:'none',
              backgroundColor:'#f4f4f8',
              padding:'15px',
              fontSize:'18px',
              marginRight:'5px'
            }} placeholder="ඔබේ විමසුම ලියන්න" id="inputText">

            </input>
            <button onClick={save} style={{
              height:'50px',
              borderRadius:'10px'
            }}>යන්න</button>
          </div>
      </div>
    </div>
  )
}
ReactDom.render(
  <App/>,
  document.getElementById('root')
)
