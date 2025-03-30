import './App.css';
import {React, useEffect, useState} from 'react';
import {Button,FormControl, Input, InputLabel} from '@mui/material/';
import Todo from './Todos';
import { db } from './firebase';
import { addDoc, collection, onSnapshot,serverTimestamp, orderBy , query, documentId} from 'firebase/firestore';




function App() {
  const [todos,setTodos]=useState([]);// useState is a short term memory that stores data of component or element

  const [input, setInput]=useState('');

//when the app loads we need to listen to the database and fetch the data /new todo as they get added removed.

useEffect(()=>{//function 
  // Fetch the 'todos' collection from Firestore
  const q = query(collection(db, "todos"), orderBy("timestamp", "desc")); 
  const unsubscribe = onSnapshot(q, (snapshot) => {
    setTodos(snapshot.docs.map((doc) => ({id: doc.id, todo: doc.data().todo})));
  });

  return () => unsubscribe();
 }, // Cleanup Firestore listener// dependencies 
[])
  



  const addTodo=(event)=>{
    //this will fire off when we click the button
    event.preventDefault(); //will stop refresh
    addDoc(collection(db, "todos"),{
      todo:input,
      timestamp: serverTimestamp(),
      id:input
    })


    setTodos([...todos,input]);
    setInput(''); //to clear the input field
    
    

  }



  return (
    <div className="App">
      <h1>Hello There !!</h1>
      <form>
        
        <FormControl>
          <InputLabel >What's Your Todo ?</InputLabel>
          <Input value={input}
          onChange={(event) => setInput(event.target.value)}/>
          
        </FormControl>

        <Button
          disabled={!input}
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
        >
          Add Todo
        </Button>
        {/* <button type='submit' onClick={addTodo}>Add Todo</button> */}
      </form>

      <ul>
        {todos.map((todo) => (
          <Todo key = {todo.id} todo={todo}/>
          // <li>{todo}</li>
        ))}
        
      </ul>
    </div>
  );
}

export default App;
