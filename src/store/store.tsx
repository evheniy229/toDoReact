import { makeAutoObservable, makeObservable, action } from "mobx";
import {nanoid} from 'nanoid';
const POINT_TASK = 'POINT-TASK';
const REMOVE_TASK = 'REMOVE-TASK';
const UPDATE_NEW_TASK_TEXT = 'UPDATE-NEW-TASK-TEXT';
const UPDATE_TASK_OBJECT_TEXT = 'UPDATE-TASK-OBJECT-TEXT';
const ADD_FILTER = 'ADD-FILTER';
const ADD_TASK = 'ADD-TASK';
class store {
    state = {
        taskPage: {
            tasks: [
                {
                id: '1', 
                task: 'example',
                activeTask: false,
                hideFilter: '',
                nameClassPoint: '',
                }
            ],
            newTasksText: "New Task",
        },
    };
    
    constructor() {
        makeAutoObservable(this);
        this.state.taskPage.tasks = []

    };
    dispatch(action: any) {
        type MyTypes={
            id: string;
            task: string;
            activeTask: boolean;
            hideFilter: string;
            nameClassPoint: string;
        }
        if (action.type === ADD_TASK) {
            let newTask = {} as MyTypes;
            newTask.id = (nanoid()) ;
            newTask.task =this.state.taskPage.newTasksText ;
            newTask.activeTask =false ;
            newTask.hideFilter ='' ;
            newTask.nameClassPoint ='' ;
            this.state.taskPage.tasks.push(newTask);
            this.state.taskPage.newTasksText = '';
        } else if (action.type === UPDATE_NEW_TASK_TEXT) {
            this.state.taskPage.newTasksText = action.newText;
        } else if (action.type === UPDATE_TASK_OBJECT_TEXT){
            this.state.taskPage.tasks = this.state.taskPage.tasks.map((t) => {
                if(t.id === action.itemId){
                    t.task = action.newText;
                }
                return(t)
            })
        } else if (action.type === REMOVE_TASK) {
            this.state.taskPage.tasks = this.state.taskPage.tasks.filter(t => t.id !== action.itemId);
        } else if (action.type === POINT_TASK) {
            this.state.taskPage.tasks = this.state.taskPage.tasks.map((t) => {
                if (t.id === action.itemId) {
                    if (action.itemActive === false) {
                        t.activeTask = true;
                        t.nameClassPoint = action.nameClassPoint = 'active';

                    }
                    else {
                        t.activeTask = false;
                        t.nameClassPoint = action.nameClassPoint = '';
                    }
                }
                return (t)
            })
        } else if (action.type === ADD_FILTER) {
            if (action.activeFilter === false) {
                this.state.taskPage.tasks = this.state.taskPage.tasks.map((t) => {
                    if (t.activeTask === action.activeFilter) {
                        t.hideFilter = 'hide';
                    }
                    return (t)
                    
                })
            } else {
                this.state.taskPage.tasks = this.state.taskPage.tasks.map((t) => {
                    t.hideFilter = '';
                    return (t)
                })
            }
            this.state.taskPage.tasks.map((t) => {
                console.log(t.hideFilter);
            })
        }
    };

};
export const addTaskCreator = () => {
    return {
        type: ADD_TASK,
    }
}
export const updateNewTaskTextCreator = (text: string) => {
    return {
        type: UPDATE_NEW_TASK_TEXT,
        newText: text,
    }
}
export const updateTaskObjectTextCreator = (text:string, id:string)=>{
    return{
        type: UPDATE_TASK_OBJECT_TEXT,
        newText:text,
        itemId: id,
    }
}
export const addFilterCreator = (show: boolean) => {

    return {
        type: ADD_FILTER,
        activeFilter: show,
    }
}
export const pointTaskCreator = (id: string, activeTask: boolean, nameClassPoint: string) => {
    return {
        type: POINT_TASK,
        itemId: id,
        itemActive: activeTask,
        nameClassPoint: nameClassPoint
    }
}
export const removeTaskCreator = (task: string, id: string) => {
    return {
        type: REMOVE_TASK,
        removeItem: task,
        itemId: id,
    }
}
export default store;