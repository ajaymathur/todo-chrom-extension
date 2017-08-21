import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Header} from './components/header/header';
import Todolist from './components/todo-list/todo-list';
import Additem from './components/add-item/add-item';
import './app.css';
class App extends Component{
    render() {
        return(
            <div className='height-full'>
                <Header />
                <Todolist />
                <Additem />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
