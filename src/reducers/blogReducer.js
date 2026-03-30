import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
    },
    removeBlog(state, action) {
      const idToRemove = action.payload
      return state.filter(blog => blog.id !== idToRemove)
    }
  }
})

export const { setBlogs, appendBlog, updateBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => async dispatch => {
  const blogs = await blogService.getAll()
  dispatch(setBlogs(blogs))
}

export const createBlog = (blogObject) => async dispatch => {
  const newBlog = await blogService.create(blogObject)
  dispatch(appendBlog(newBlog))
  return newBlog
}

export const likeBlog = (id, blogObject) => async dispatch => {
  const userId = blog.user && blog.user.id ? blog.user.id : null
  const updatedBlog = await blogService.update(id, { ...blogObject, user: userId })
  dispatch(updateBlog(updatedBlog))
  return updatedBlog 
}
export default blogSlice.reducer