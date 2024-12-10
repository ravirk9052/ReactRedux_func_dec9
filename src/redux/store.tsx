import { configureStore} from '@reduxjs/toolkit';
import apiCallReducer from '../redux/reducers/requestSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
    reducer: {
        ReducerApi: apiCallReducer,
    },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 

export const useAppDispatch = () => useDispatch<AppDispatch>();