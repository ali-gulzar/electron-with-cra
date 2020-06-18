import React, { useEffect, useState } from 'react';

export default function Card (props) {

  const [colorValue, setColorValue] = useState("");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);

  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  useEffect(() => {
    setColorValue(props.colorValue);
    setTitle(props.title);
    setValue(formatNumber(props.value));
  })

  return (
    <div className={`card card-hover ${colorValue}`}>
      <h3 style={{marginLeft: 20, marginTop: 10, color: 'white', fontFamily: 'Permanent Marker', fontSize: 20}}>{title}</h3>
      <p style={{display: 'flex', fontSize: 30, justifyContent: 'flex-end', marginRight: 30, marginTop: 70, fontFamily: 'MuseoModerno'}}>Rs {value}</p>
    </div>
  )

}
