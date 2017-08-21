import React, {Component} from 'react';

class Additem extends Component{

    constructor() {
        super();
        this.state = {
            taskDescription: '',
            errorMessage: '',
            error: false,
        };
    }

    handleAddTask(tasks) {
        tasks.push({
            task: this.state.taskDescription,
            uuid: Date.now(),
            completed: false
        });
        chrome.storage.sync.set({todoTasks: JSON.stringify(tasks)}, () => {
            this.setState({
                taskDescription: '',
                errorMessage: '',
            });
        });
    }

    getTask() {
        if(this.state.taskDescription === '') {
            this.addErrorAnimation();
            return;
        }
        chrome.storage.sync.get('todoTasks', tasks => {
            this.handleAddTask(tasks.todoTasks ? JSON.parse(tasks.todoTasks) : []);
        });
    }

    addErrorAnimation() {
        this.setState({
            errorMessage: 'You cannot do nothing :)',
            error: true
        });
        setTimeout(() => {
            this.setState({
                error: false
            });
        }, 1000);
    }

    render() {
        return(
            <footer>
                { this.state.errorMessage ?
                     <div className="error-message">{this.state.errorMessage}</div> :
                     ''
                }
                <input  type="text" 
                        placeholder="task..." 
                        className={this.state.errorMessage !== '' ? 'task-description error' : 'task-description'}
                        value={this.state.taskDescription}
                        onChange={(event) => { this.setState({taskDescription: event.target.value, errorMessage: ''}) }}
                />
                <button className="add-button"
                        onClick={() => this.getTask()}
                        >
                        Add
                </button>
            </footer>
        )
    }
}

export default Additem;
