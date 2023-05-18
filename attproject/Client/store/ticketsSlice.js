import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
export const fetchTickets = createAsyncThunk(
  'ticket/fetchTickets',
  async () => {
    const response = await axios.get(`/api/microservice/all-tickets`);
    return response.data;
  }
);

export const addTicket = createAsyncThunk(
  'ticket/addTicket',
  async (ticket) => {
    const response = await axios.post('/api/tickets', ticket);
    return response.data;
  }
);
export const updateTicket = createAsyncThunk(
  'ticket/updateTicket',
  async (ticket) => {
    const response = await axios.put('/api/tickets', ticket);
    return response.data;
  }
);

export const CompleteTicket = createAsyncThunk(
  'ticket/CompleteTicket',
  async (id) => {
    const response = await axios.put('/api/microservice/ticket_set_complete', id);
    return response.data;
  }
);

export const deleteTicket = createAsyncThunk(
    'ticket/deleteTicket',
    async (id) => {
      const response = await axios.delete('/api/tickets', { data: { id } });
      return id;
    }
  );
  
  export const fetchTicketById = createAsyncThunk(
    'ticket/fetchTicketById',
    async (id) => {
      const response = await axios.get(`/api/tickets`,{ data: { id } });
      return response.data[0];
    }
  );

const ticketSlice = createSlice({
   name: 'ticket',
  initialState: {
    tickets: [],
    status: 'idle',
    error: null,
    selectedTicket: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tickets = action.payload;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTicket.fulfilled, (state, action) => {
        state.tickets.unshift(action.payload);
        toast.success('Ticket Added!');
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        toast.success('Ticket updated!');
      })
      .addCase(CompleteTicket.fulfilled, (state, action) => {
        toast.success('Ticket set To complete!');
      })
      .addCase(deleteTicket.fulfilled, (state, action) => {
        const deletedTicketId = action.payload;

        state.tickets = state.tickets.filter(ticket => ticket._id !== deletedTicketId);
        toast.success('Ticket Deleted!');
      })
      .addCase(fetchTicketById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTicketById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedTicket = action.payload;
      })
      .addCase(fetchTicketById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
      
  },
});

export default ticketSlice.reducer;
