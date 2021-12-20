import React from 'react'

function Tasks({tasks, updateTask, deleteTask}) {
    
   

    return (
        <div className='tasks-div'>
            {tasks.map((task, id)=>{ 
                let task_date;
                if (task.date.getMonth) {
                      task_date = task.date; 
                }
                else{
                    task_date = task.date.toDate(); 
                }
                
                
                return(
                    <div key={id} className='single-task-div'>
                        <p>{task.title}</p>
                        <div className='inner-single-task-div'>
                        <button className='fa-btn' onClick={(e)=>updateTask(e, task)}><i class="far fa-edit fa-lg"></i></button>
                        <button className='fa-btn' onClick={(e)=>deleteTask(e, task)}><i class="fas fa-trash fa-lg"></i></button>
                        <span className='date-info'>{task_date.getDate()+"/" +  Number(task_date.getMonth()+1)+"/"+task_date.getFullYear()}</span>       
                        </div> 
                    </div>
                )
            })}
        </div>
    )
}

export default Tasks
