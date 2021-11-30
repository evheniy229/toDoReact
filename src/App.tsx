import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Tasks from './components/tasks';
interface Props{
  store: any;
}
const App: React.FC<Props>=({store})=>{

  return (
    <div className="site-wrapper">
      <div className="top-screen">
        <div className="container">
          <div className="ts-head">
            <h1>Your Things</h1>
          </div>
          <div className="tasks">
            <Tasks
              store={store}
            />
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;
