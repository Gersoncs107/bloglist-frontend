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
      const updated = action.payload
      return state.map((b) => (b.id === updated.id ? updated : b))
    },
    removeBlog(state, action) {
      return state.filter((b) => b.id !== action.payload)
    },
  },
})

export const { setBlogs, appendBlog, updateBlog, removeBlog } =
  blogSlice.actions

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll()
  dispatch(setBlogs(blogs))
}

export const createBlog = (blogObject) => async (dispatch) => {
  const newBlog = await blogService.create(blogObject)
  dispatch(appendBlog(newBlog))
  return newBlog
}

export const likeBlog = (blog) => async (dispatch) => {
  const userId =
    blog.user && typeof blog.user === 'object'
      ? blog.user.id || blog.user._id
      : blog.user

  const updatedBlog = {
    user: userId,
    likes: blog.likes + 1,
    author: blog.author,
    title: blog.title,
    url: blog.url,
  }

  const response = await blogService.update(blog.id, updatedBlog)
  dispatch(updateBlog(response))
  return response
}

export const deleteBlog = (id) => async (dispatch) => {
  await blogService.remove(id)
  dispatch(removeBlog(id))
}

export default blogSlice.reducer
