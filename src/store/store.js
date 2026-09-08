import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";

import { FlightReducer } from "./adminFlights/reducer";
import { HotelReducer } from "./adminHotels/reducer";
import { LoginReducer } from "./auth/auth.reducer";
import { StayReducer } from "./stay/reducer";

const rootReducer = combineReducers({
  FlightReducer,
  HotelReducer,
  LoginReducer,
  StayReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
