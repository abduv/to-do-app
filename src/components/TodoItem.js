import React, { useState, useContext } from 'react';
import { Store } from '../context/Store';
import { Button } from './Button';
import { UPDATE_TITLE } from '../context/constants';

export const TodoItem = ({ todo }) => {
    const { state, dispatch } = useContext(Store)
    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState('')

    const handleEditTodo = (id) => {
        if (editMode) {
            if (newTitle) {
                dispatch({ type: UPDATE_TITLE, payload: { id, newTitle } })
                setEditMode(false)
                return null
            }
            setEditMode(true)
        } else {
            setEditMode(true)
        }
    }
    

    return (
        <li className="todoList__item">
            <input className="todoList__completed" id="completed" type="checkbox"/>
            { editMode ? (
                <input
                    onChange={ e => setNewTitle(e.target.value) }
                    className="todoList__input"
                    defaultValue={todo.title}
                    autoFocus={true}
                />
            ) : (
                <label className="todoList__title" htmlFor="completed">{ todo.title }</label>
            ) }
            <Button
                onClick={ () => handleEditTodo(todo.id, todo.title) }
                className="todoList__button todoList__editButton"
            >
                { editMode ? 'Save' : 'Edit' }
            </Button>
            <Button className="todoList__button todoList__removeButton">
                Remove
            </Button>
        </li>
    )
}