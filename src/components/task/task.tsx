import React from "react";
import { removeTaskCreator, pointTaskCreator, updateTaskObjectTextCreator } from './../../store/store';
interface Props {
    id: string;
    task: string;
    activeTask: boolean;
    hideFilter: string;
    nameClassPoint: string;
    store: any;
}
const Task: React.FC<Props> = ({ id, task, activeTask, hideFilter, nameClassPoint, store }) => {
    let onChangeTaskObject = (e: React.FormEvent<HTMLInputElement>) => {
        let text = e.currentTarget.value;
        store.dispatch(updateTaskObjectTextCreator(text, id));
    }
    let removeTask = () => {
        store.dispatch(removeTaskCreator(task, id));
    }
    let pointTask = () => {
        store.dispatch(pointTaskCreator(id, activeTask, nameClassPoint));
    }
    return (
        <li className={hideFilter}>
            <label className="point_task">
                <input onClick={pointTask} className={nameClassPoint} type="button"></input>
            </label>
            <div className="title_task">
                <input onChange={onChangeTaskObject} value={task}></input>
            </div>
            <div className="delete_task">
                <button onClick={removeTask}>X</button>
            </div>
        </li>
    );
};
export default Task;