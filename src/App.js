import './index.css'
import { useState,useEffect } from 'react';
import Header from "./components/Header";
import Task from './components/Task';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

function App() {
  const [showAddTask,setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

useEffect(()=>{
  const getTasks=async()=>{
    const tasksFromServer =await fetchTasks()
    setTasks(tasksFromServer)
  }
  
  getTasks()
},[]

)  
//fetch tasks
const fetchTasks=async()=>{
  const res=await fetch('http://localhost:5000/tasks')
  const data=await res.json()
  return data;
}


//fetch task
const fetchTask=async(id)=>{
  const res=await fetch(`http://localhost:5000/tasks/${id}`)
  const data=await res.json()
  return data;
}

//Add Task
const Addtask=async(task)=>
{
  // const id=Math.floor(Math.random()*10000) + 1;
  // const newTask = {id,...task}
  // setTasks([...tasks,newTask])
  const res=await fetch('http://localhost:5000/tasks',{
    method:'POST',
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify(task)
  })

  const data=await res.json()
  setTasks([...tasks,data])
}

//deletetask
const deleteTask= async(id)=>{
  await fetch(`http://localhost:5000/tasks/${id}`,{
    method:'DELETE'
  })
  setTasks(tasks.filter((task) => task.id!==id))
}

//Toggle Reminder

const toggleReminder =async(id) =>
{
  const TaskToToggle =await fetchTask(id)
  const updTask={...TaskToToggle, reminder: !TaskToToggle.reminder}  
  const res=await fetch(`http://localhost:5000/tasks/${id}`,{
    method:'PUT',
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify(updTask)
  })

  const data=await res.json()
  setTasks(tasks.map((task)=>task.id===id?{
    ...task,reminder:!task.reminder
  }:task))
}

  return (
    <div className="App">
      <Header title='Task Tracker'  onAdd={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd={Addtask}/>}
      { tasks.length>0?
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>: 'No tasks'}
    </div>
  );
}


export default App;
