import { combineReducers } from "@reduxjs/toolkit";
import AdminReducer from '../Reducers/AdminReducer'
import OperatorReducer from '../Reducers/OperatorReducer'
import AuthReducer from '../Reducers/AuthReducer'

export const rootReducer = combineReducers({
  admin: AdminReducer,
  operator: OperatorReducer,
  auth: AuthReducer
});