import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import comboapi from '../../firebase/combofirestore';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export interface comboState {
    value: [] | undefined;
    status: 'idle' | 'loading' | 'failed';
  }
  const initialState: comboState = {
    value: [],
    status: 'idle',
  };

 

export const comboTicketAsync = createAsyncThunk(
    'comboticket/getData',
    async () => {
      const response = await comboapi.fetchAll();
      console.log(response)
  
     
      return response
    }
  );
  
  export const comboTicketSlice = createSlice({
    name: 'comboticket',
    initialState,
    reducers: {
      getData: (state, action: PayloadAction<{ketqua: firebase.firestore.DocumentData[] | unknown[] | undefined}> ) => {
        console.log(action)
        Object.assign(state, action.payload)
      }
    }
  });
  
  export const selectComboTicket = (state: RootState) => state.ticket;
  
  export const getComboTicket = (): AppThunk =>  async (
    dispatch,
    getState
  ) => {
    const response = await comboapi.fetchAll();
     
      dispatch(comboTicketSlice.actions.getData({ ketqua : response}));
  };
  export default comboTicketSlice;