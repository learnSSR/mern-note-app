import { Card } from "react-bootstrap";
import React from 'react';
import './style.css';

function Chips({
    list,
    setChips,
}) {

    function handleCancel (remLi) {
        console.log(remLi, list)
        setChips(list.filter(li=>li !== remLi))
    }

  return (
    <Card>
    <Card.Body className="cd_style">
        {
            list.map((li,index)=>{
                return(<div className='chip' key={index}>
                  <div  className='chip_text' >{li}</div>
              
                <button type="button" className='chip_cancelbtn' onClick={(e)=>{ handleCancel(li)}}
                  > ×  </button>
                </div>)
            })
        }
    </Card.Body>
  </Card>
  )
}

export default Chips