import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      return null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export const initializeUser = () => (dispatch) => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    dispatch(setUser(user))
    blogService.setToken(user.token)
  }
}

export const loginUser = (credentials) => async (dispatch) => {
  const user = await loginService.login(credentials)
  window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
  blogService.setToken(user.token)
  dispatch(setUser(user))
  return user
}

export const logoutUser = () => (dispatch) => {
  window.localStorage.removeItem('loggedBlogAppUser')
  dispatch(clearUser())
}

export default userSlice.reducer
