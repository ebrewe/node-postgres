import axios from 'axios';

export const FETCH_TODOS = "FETCH_TODOS";

const todosURI = '/api/v1/todos/'

export function fetchTodos(){
  const request = axios.get(todosURI);
  return {
    type:FETCH_TODOS,
    payload: request
  }
}
