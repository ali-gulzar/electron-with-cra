import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';

export default function Card (props) {

  const [colorValue, setColorValue] = useState("");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);
  const [loader, setLoader] = useState(true);

  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  function ReturnLoader() {
    return (
      <Loader
         type="Puff"
         color="white"
         height={50}
         width={50}
         style={{marginLeft: 20}}
      />
    )
  }

  useEffect(() => {
    setColorValue(props.colorValue);
    setTitle(props.title);
    if (props.value !== null) {
      setValue(props.value)
      setLoader(false);
    }
  })

  return (
    <div className={`card card-hover ${colorValue}`} style={{marginRight: 20}}>
      <h3 style={{paddingLeft: 20, marginTop: 10, color: 'white', fontFamily: 'Permanent Marker', fontSize: 20}}>{title}</h3>
      <p style={{display: 'flex', fontSize: 30, justifyContent: 'flex-end', marginRight: 30, marginTop: 70, fontFamily: 'MuseoModerno'}}>Rs {loader ? <ReturnLoader/> : formatNumber(value)}</p>
    </div>
  )

}
