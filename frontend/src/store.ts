import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@features/Auth/authSlice'
import profileReducer from "@features/Profile/profileSlice"
import networkReducer from "@features/Network/networkSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    network: networkReducer
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch