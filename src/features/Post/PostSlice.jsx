import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (users) => {
  const response = await axios.get(POST_URL);
  const posts = response.data;

  const usersMap = {};

  if (Array.isArray(users)) {
    users.forEach(user => {
      usersMap[user.id] = user.name;
    });
  }

  const enrichedPosts = posts.map(post => ({
    ...post,
    name: usersMap[post.userId] || "Unknown",
     date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
  }));

  return enrichedPosts;
});



const postSlice = createSlice({
    name: 'posts',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {
        addPost: (state, action) => {
            state.items.unshift(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchPosts.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload;
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
})



export const selectAllPosts = (state) => state.posts.items;
export const selectAllPostsStatus = (state) => state.posts.status;
export const selectAllPostsError = (state) => state.posts.error;
export const selectPostsByUserId = (state, userId) =>
  state.posts.items.filter(post => post.userId === parseInt(userId));



export const { addPost } = postSlice.actions;
export default postSlice.reducer;