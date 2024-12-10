import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// import type {PayloadAction} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import { ITodoName } from '../../Screens/TodoScreen';

interface IState {
  value: number;
  todoArray: ITodoName[];
  isData: boolean;
}
const initialState: IState = {
  value: 0,
  todoArray: [],
  isData: false,
};

export const requestApiCall = createAsyncThunk(
  'request/requestData',
  async (_) => {
    const data = await fetch('https://dummyjson.com/todos?limit=5');
    const arrData = await data.json();
    return arrData;
  },
);

export const apiCallSlice = createSlice({
  name: 'RequestApi',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    addTodo: (state, action) => {
      state.todoArray.push(action.payload);
    },
    updateTodo: (state, action) => {
      const updatedObj = action.payload.updateObject;
      const updatedText = action.payload.updateText;
      const updatedArray = state.todoArray.map((todoItem: ITodoName, index) => {
        if (todoItem.id == updatedObj.id) {
          return (todoItem.todo = updatedText);
        }
        return todoItem;
      });

      console.log('46',updatedArray)
    },
    deleteTodo: (state, action) => {
      if (state.todoArray.length > 0) {
        const filteredArray = state.todoArray.filter((todoItem: ITodoName, index) => {
          return todoItem.id !== action.payload.id;
        });
        state.todoArray = filteredArray;
        if (state.todoArray.length === 0) {
            state.isData = false;
          }
      } 
    },
  },

  extraReducers: builder => {
    builder.addCase(requestApiCall.fulfilled, (state, action) => {
      if (action.payload) {
        state.todoArray = action.payload.todos;
        state.isData = true;
      }
    });
    builder.addCase(requestApiCall.pending, (state, action) => {
      state.isData = false;
    });
    builder.addCase(requestApiCall.rejected, (state, action) => {
      Alert.alert('Something went Wrong !!, Please Try again...');
      state.isData = false;
    });
  },
});

export const {increment, addTodo, updateTodo, deleteTodo} =
  apiCallSlice.actions;
export default apiCallSlice.reducer;
