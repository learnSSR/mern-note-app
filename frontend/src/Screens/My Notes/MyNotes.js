import React, { useEffect, useState } from 'react';
import { Badge,Accordion, Button, Card } from 'react-bootstrap';
import MainScreen from '../../Component/MainScreen';
import Chips from '../../Component/Chips/Chips';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { DeleteNote, getNotes, StarredNote } from '../../actions/noteAction'
import Loading from '../../Component/Loading'
import Error from '../../Component/Error'
import ReactMarkdown from "react-markdown";
import './Style.css';

function MyNotes({ search }) {
     const [star, setStar] = useState(false)
    const dispatch = useDispatch()
    const {userLogin, notes, noteCreate , noteUpdate, noteDelete} = useSelector(state=>state)
    const {userInfo={} } = userLogin||{};
    const {loading , error, noteList:notesList=[]} = notes
    const [ noteList ,setNoteList] = useState(notesList)
    const { success }= noteCreate
    const { success:upSuccess } = noteUpdate
    const { success:delSuccess } = noteDelete 
    async function fetchData(){
       dispatch(getNotes()) 
    }
     useEffect(()=>{
      setNoteList(notesList)
     },[notesList])

    useEffect(()=>{
        fetchData()

    },[userInfo,success, upSuccess, delSuccess])
 const handleDelete = (id)=>{
    dispatch(DeleteNote(id))
 }

 const handleStar = (id, star)=>{
   //setStar(!star)
   console.log(id, star)
   dispatch(StarredNote(id, star))
   setNoteList(noteList.map(note=> note._id === id ? {...note,star} : note))
 }
  console.log(noteList,notesList)
  return (
    <MainScreen title={`Welcome Back ${userInfo.name} ....`}>
        <Button style={{ marginLeft:10, marginBottom:6 }} size='lg'> <Link to={'/create'}> Create New Note</Link> </Button>
       { error && <Error>{'Invalid Token'}</Error>}
       {
        loading? <Loading /> :
        noteList?.filter(nt=>nt.title.toLowerCase().includes(search.toLowerCase())).reverse().map(nt=>{
          let time = new Date(nt.createdAt).toString().substr(0,21)
        return(
     <Accordion defaultActiveKey={"0"} key={nt._id}
       style={{
        marginBottom: 10
       }}
     >
     <Accordion.Item eventkey="0">
     <Card>
    
      <Card.Header style={{ display:'flex', justifyContent:'space-between' , padding:0}}>
       <Accordion.Button className='acc_style' eventkey='0' variant='link' as={Card.text}>
        <div className='title_style'>
          {nt.title}
        </div>
       </Accordion.Button>
        <div
        style={{
          padding: '12px 10px 10px 10px'
        }}
        >
            <button
            onClick={()=>handleStar(nt._id, !nt.star)}
             style={{
              border: 'none',
              background: 'inherit',
              margin: '0px',
              outline: 'none',
             }}
            >{<svg 
              style={{
                width: 20,
                stroke: 'black',
                fill: nt.star?'yellow':'white',
                strokeWidth: 40,
              }}        
               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>}</button>
            <Button> <Link to={`/notes/${nt._id}`}> Edit</Link></Button>
            <Button onClick={()=>handleDelete(nt._id)} variant='danger' className='mx-2'>Delete</Button>
        </div>
      </Card.Header>
    
      <Accordion.Collapse>
      <Card.Body>
        
        <h4>
          category - 
          { nt.category.split(",").map(cat=>{
            return(
            <Badge bg="success" text="light">
               {cat}
            </Badge>
            )
          })
         }
        </h4>

      <blockquote className="blockquote mb-0">
         
          <ReactMarkdown>{nt.content}</ReactMarkdown>
         
          <footer className="blockquote-footer">
            Created at - {time}
          </footer>
        </blockquote>
      </Card.Body>
      </Accordion.Collapse>
    </Card>
    </Accordion.Item>
    </Accordion>
          )
        })
       }
    </MainScreen>
  )
}
    

export default MyNotes