import React, { Component } from 'react';
import './todo-list.css';

class Todolist extends Component {
  constructor() {
    super();
    this.state = {
      todoTasks: []
    };
  }

  componentDidMount() {
    this.getList();
    this.addListnerToList();
  }

  getList() {
    chrome.storage.sync.get('todoTasks', todoTasks => {
      if(todoTasks.todoTasks && todoTasks.todoTasks.length) {
        this.setState({
          todoTasks: JSON.parse(todoTasks.todoTasks)
        })
      } 
    })
  }

  addListnerToList() {
    chrome.storage.onChanged.addListener(tasks => {
        if(tasks.todoTasks) {
          this.setState({
          todoTasks: JSON.parse(tasks.todoTasks.newValue),
        });
      }
    });
  }

  toggleCompleted(taskUuid) {
    let list = this.state.todoTasks;
    list.forEach(task => {
      if (task.uuid === taskUuid) {
        task.completed = !task.completed;
      }
    });
    chrome.storage.sync.set({ 'todoTasks': JSON.stringify(this.state.todoTasks) }, () => { });
  }

  deleteItem(taskUuid) {
    let list = this.state.todoTasks;
    const filteredList = list.filter(listItem => listItem.uuid !== taskUuid);
    chrome.storage.sync.set({ 'todoTasks': JSON.stringify(filteredList) }, () => { });
  }

  render() {
    return (
      <div className='main-list'>
        <ul className='list-wrapper'>
          {this.state.todoTasks.map(task => (
            <li
              key={task.uuid}
              className="list-item">
              <span
                className={[task.completed ? 'completed' : 'notcompleted', 'task-discription'].join(' ')}
                onClick={() => { this.toggleCompleted(task.uuid) }}>
                {task.task}
              </span>
              <span
                className="delete-task"
                onClick={() => {this.deleteItem(task.uuid)}}
              >
                X
              </span>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Todolist;
