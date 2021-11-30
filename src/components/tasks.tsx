import React, {useState} from "react";
import Task from "./task/task";
import {nanoid} from 'nanoid';
import { observer } from 'mobx-react-lite';
import { updateNewTaskTextCreator, addTaskCreator, addFilterCreator } from './../store/store';
interface Props {
    store: any;
}

const Tasks: React.FC<Props> = observer(({ store }) => {
    const [show, setShow] = useState(false)
    let tasksElements = store.state.taskPage.tasks.map((p: any) => {
        return (
            <Task
                id={p.id}
                task={p.task}
                activeTask={p.activeTask}
                nameClassPoint={p.nameClassPoint}
                hideFilter={p.hideFilter}
                store={store}
                key={p.id} 
            />
        )
    })

    let addTask = () => {
        store.dispatch(addTaskCreator())
    }

   
    let onChangeTasks = (e: React.FormEvent<HTMLInputElement>) => {
        let text = e.currentTarget.value;
        store.dispatch(updateNewTaskTextCreator(text));
    }
    let addFilter = () =>{
        setShow(!show)
        store.dispatch(addFilterCreator(show));
    }

    return (
        <div className="task__inner">
            {store.count}
            <div className="content" >
                <input
                    onChange={onChangeTasks}
                    value={store.state.taskPage.newTasksText}
                />
                <button
                    onClick={addTask}
                >
                    Add Task
                </button>
                <a className="task-filter"
                onClick={ addFilter }
                >
                    <img src="https://cdn-icons-png.flaticon.com/512/57/57164.png" />
                </a>
            </div>
            <ul className="list-tasks">
                {tasksElements }
            </ul>
        </div>
    )
});
export default Tasks;