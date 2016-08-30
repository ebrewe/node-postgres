import axios from 'axios';

export const FETCH_TODOS = "FETCH_TODOS";
export const CREATE_TODO = "CREATE_TODO";

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
