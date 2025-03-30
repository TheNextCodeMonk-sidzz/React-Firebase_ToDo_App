import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import React from 'react';
import './Todo.css';
import { collection, deleteDoc, doc,updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { useState } from 'react';


function Todo(props) {
    const [editMode, setEditMode]=useState(false);
    const [newTodo, setNewTodo]=useState('');

    
    const updateTodo=()=>{
        const todoRef=doc(db, "todos", props.todo.id);
        updateDoc(todoRef,{todo:newTodo});
        setEditMode(false);
    }






  return (
    <List className='todo__list'>
        <ListItem>
            <ListItemAvatar>
                
            </ListItemAvatar>
            {editMode ? (
                <>
                <input placeholder={props.todo.todo} value={newTodo} onChange={(event)=>setNewTodo(event.target.value)}/>
                <button onClick={updateTodo}>Update</button>
                </>
            ) : (<ListItemText primary="Todo ..." secondary={props.todo.todo}/> )
            }

{/* we are passing todo which is a object and we are getting todo.todo which is the value of todo */}
            
            <button onClick={()=>setEditMode(true)}>Edit the todo</button> &nbsp;
            
            <button onClick={()=>deleteDoc(doc(db,"todos",props.todo.id))}>Delete</button>
            
        </ListItem>
        
    </List>
  )
}

export default Todo