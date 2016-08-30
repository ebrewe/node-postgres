import axios from 'axios';

export const FETCH_TODOS = "FETCH_TODOS";
export const CREATE_TODO = "CREATE_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const UPDATE_TODO = "UPDATE_TODO";

const todosURI = '/api/v1/todos/'

export function fetchTodos(){
  const request = axios.get(todosURI);
  return {
    type:FETCH_TODOS,
    payload: request
  }
}

export function createTodo(props){
  const request = axios.post(todosURI, props);

  return {
    type:CREATE_TODO,
    payload: request
  }
}

export function deleteTodo(props){
  const request = axios.delete(todosURI + props.id);
  console.warn('Deleting #' + props.id);
  return {
    type:DELETE_TODO,
    payload: request
  }
}

export function updateTodo(props){
  const request = axios.put(todosURI + props.id, props);
  console.log('updating ' + props.id + ' to ' + props.text + ' completed:' + props.complete);
  return {
    type:UPDATE_TODO,
    payload: request
  }
}
