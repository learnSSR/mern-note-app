import React, { useEffect, useState } from "react";
import MainScreen from "../../Component/MainScreen";

import Chips from "../../Component/Chips/Chips";

import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { UpdateNote } from "../../actions/noteAction";
import ReactMarkdown from "react-markdown";
import Error from "../../Component/Error";
import Loading from "../../Component/Loading";
import { useNavigate } from "react-router-dom";
import {  useParams } from 'react-router-dom';

function EditNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const [ chips, setChips] = useState([])
  
  const { id } = useParams()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { noteUpdate, notes } = useSelector((state) => state);
  const { noteList = []} = notes
  const { loading, error, note } = noteUpdate;

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const submitHandler = (e) => {
    console.log(e)
    e.preventDefault();
    e.stopPropagation()
    if (!title || !content || !(chips.length > 0)) return;
    
    dispatch(UpdateNote(id, title, content, chips.join(",")));
    resetHandler();
    navigate("/mynotes");
  };

  useEffect(() => {
    console.log(id, noteList)
     let pickedNote = noteList.filter(note=>note._id === id)[0]
     console.log(pickedNote)

     setTitle(pickedNote.title)
     setChips(pickedNote.category.split(","))
     setContent(pickedNote.content);
  }, []);

  const handleChips = (e)=>{
    console.log(e)
    e.stopPropagation()
    if (e.key === 'Enter'){
     setChips([...chips, category])
     setCategory("")
    }
 }

  return (
    <MainScreen title="Create a Note">
      <Card>
        <Card.Header>Edit Note</Card.Header>
        <Card.Body>
          <Form >
            {error && <Error variant="danger">{error}</Error>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the content"
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Chips 
               list={ chips}
               setChips={setChips}
              />
              <Form.Control
                type="content"
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
                onKeyDown={(e)=>handleChips(e)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="button" variant="primary"
                onClick={submitHandler}
            >
              Update Note
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default EditNote;