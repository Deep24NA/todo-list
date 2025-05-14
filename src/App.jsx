// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css'

import Navbar from "./component/Navbar";
import { compile } from 'tailwindcss';

function App() {
  // for addong a todos
  const [todo, setTodo] = useState("")
  // use for containing a todo
  const [todos, settodos] = useState([])


  /* CHATGPT  suggestion */

  //  useEffect(() => {
  //   const todostring = localStorage.getItem("todos");
  //   if (todostring) {
  //     settodos(JSON.parse(todostring));
  //   }
  // }, []);



  useEffect(() => {
    try {
      const todosString = localStorage.getItem("todos");
      const savedTodos = JSON.parse(todosString);
      console.log("saved", savedTodos)
      if (Array.isArray(savedTodos)) {
        settodos(savedTodos);
      } else {
        settodos([]);
      }
    } catch (error) {
      console.error("Error parsing todos from localStorage:", error);
      settodos([todos]);
    }
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // }, [todos]);


  const handleEdit = (id, e) => {
    console.log(id)
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    // savToLS()
    settodos(newTodos)

  }
  const handleDelete = (id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    // let del = todos.filter(item=>{
    //   return item.id === id;
    // })
    // localStorage.removeItem("todos" , JSON.stringify(todos))
    // savToLS()
    settodos(newTodos)

  }
  const handleAdd = () => {

    settodos([...todos, { id: uuidv4(), todo }])
    localStorage.setItem("todos", JSON.stringify(todos));
    // setTodo("")
    console.log("totos", todo)
    // savToLS()
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handlecheck = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos);

  }


  return (
    <>
      <Navbar />
      <div className="container bg-[#bac0c9] mx-auto my-5 rounded-xl p-5 min-h-[80vh]">
        <div className="addTodo my-6">
          <h2 className='text-lg font-bold'>Add a todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='bg-white w-1/3' />
          <button onClick={handleAdd} className='bg-[#070762] text-white py-1 px-4 cursor-pointer mx-2 rounded-sm hover:bg-[#040446] font-bold transition-all scale-3d'>Save</button>
        </div>
        <h2 className="text-lg font-bold">Your Task</h2>
        <div className="todos">
          {todos.length === 0 && <div className='mx-7 my-4 font-bold'>Please Add Some Todo</div>}
          {todos.map((item, index) => {
            return <div key={index} className="todo w-1/3 my-3 flex justify-between ">
              <div className='flex gap-6'>
                <input onClick={handlecheck} type="checkbox" name={item.id} id="" value={item.isCompleted} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="button flex h-full">
                <button onClick={(e) => handleEdit(item.id, e)} className='bg-[#070762] text-white py-1 px-4 cursor-pointer mx-2 rounded-sm hover:bg-[#040446] font-bold transition-all scale-3d'>Edit</button>
                <button onClick={(e) => { e, handleDelete(item.id) }} className='bg-[#070762] text-white py-1 px-4 cursor-pointer mx-2 rounded-sm hover:bg-[#040446] font-bold transition-all scale-3d'>Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App;