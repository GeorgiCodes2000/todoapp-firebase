import { signOut } from '@firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase-config';
import Tasks from './Tasks';
import { collection, doc, getDocs, updateDoc, query, orderBy, deleteDoc, setDoc, where } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function TodoList() {

    
    const user = auth.currentUser;
    console.log(user);
    

     

    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let currentDate = new Date();
    const currentDay = weekday[currentDate.getDay()];
    const currentDateFormatted = currentDate.getDate()+" / " + Number(currentDate.getMonth()+1) + " / " + currentDate.getFullYear();

    const logout = async(e) => {
        e.preventDefault();
        await signOut(auth);
    }
    
    const [input, setInput] = useState("");
    const [tasks, setTasks] = useState([]);
    const [editing, setEditing] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState({});
    const tasksCollectionRef = collection(db, "tasks"); 
    
     
 


    const addTask = async (e) => {
        if(user!==null){
            e.preventDefault();
            await setDoc(doc(db, "tasks", user.uid + input), {
            title: input,
            date: new Date(),
            uid: user.uid
          });          
        let arr = [...tasks];
        arr.push({title: input, date: new Date(), id:user.uid + input,  uid: user.uid});
        setTasks([...arr]);
        setInput("");
        toast.success('Task added !', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
    }   

    const updateTaskField = (e, task) => {
        console.log(task.id);
        e.preventDefault();
        setInput(task.title);
        setEditing(true);
        setTaskToEdit(task);
    }

    const updateTask = async (e) => {
        e.preventDefault();
        const taskDoc = doc(db, "tasks", taskToEdit.id);
        const newField = {title: input, date: new Date()};
        await updateDoc(taskDoc, newField);
        let arr = [...tasks];
        for(let i = 0; i < arr.length; i++){
            if(arr[i].id === taskToEdit.id){
                arr[i].title = input;
                arr[i].date = new Date();
            }
        }
        setTasks(arr);
        setEditing(false);
        setInput("");
        toast.success('Task updated !', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }

    const deleteTask = async (e, task) => {
        e.preventDefault();
        const taskDoc = doc(db, 'tasks', task.id);
        const arr = tasks.filter(el=>el.id!==task.id);
        setTasks(arr);
        await deleteDoc(taskDoc); 
        toast.error('Task deleted !', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }

    useEffect(()=>{
        const getTasks = async () => {
            const q = query(tasksCollectionRef, orderBy("date", "desc"))
            const data = await getDocs(q);
            console.log(data);
            let arr = data.docs.map((doc)=>( {...doc.data(), id:doc.id}));
            let arr1 = [];
            for(let i = 0; i < arr.length; i++){
                if(arr[i].id.includes(user.uid)){
                    arr1.push(arr[i]);
                }
            }
            setTasks(arr1)
        }
         
        if(user!==null){
            getTasks();
        }
       
            
         
        
        
    }, [])

    return (
        <div className="todo-container">
        <ToastContainer />
            <div className="header">
                <div><h3>TODO-APP</h3></div>
                <div className="date-div">
                    <h2>{currentDay}</h2>
                    <p>{currentDateFormatted}</p>
                </div>
                <div className="logout-div">
                    <button onClick={logout} className="logout-btn "><i class="fas fa-sign-out-alt fa-2x"></i></button>
                </div>
            </div>

            
            <form className='input-form' >
                <input type="text" placeholder="What do i have to do ?" value={input} onChange={(e)=>setInput(e.target.value)}  maxLength="60"/>
                {editing?<button type='submit' onClick={(e)=>updateTask(e)}>Edit</button>:<button type='submit' onClick={(e)=>addTask(e)}>Submit</button>}
            </form>

            {tasks.length>0?<Tasks tasks={tasks} updateTask={updateTaskField} deleteTask={deleteTask}/>:null}
               

        </div>
    )
}

export default TodoList
