
import { useState } from 'react';
import './App.css';
import Register from './Components/Register';
import TodoList from './Components/TodoList';

function App() {
  const [user, setUser] = useState({});
  return (
    <div className="App">
        <Register user={user} setUser={setUser}/>
        {user?<TodoList/>:null}
    </div>
  );
}

export default App;
