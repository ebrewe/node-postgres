import { combineReducers } from 'redux';
import  TodosReducer from './todos';
//import PostsReducer from './reducer_posts';

/*const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer
});*/
const rootReducer = combineReducers({
  todos: TodosReducer
});

export default rootReducer;
