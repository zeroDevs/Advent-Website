import React, { createContext, useReducer, useContext } from "react";
import jwtDecode from "jwt-decode";

export const USER_ACTION_TYPES = {
	LOGIN: "LOGIN",
	LOGOUT: "LOGOUT"
};

const initialState = {
	user: null,
	token: null
};

const UserContext = createContext({});
export const useUserContext = () => useContext(UserContext);

const reducer = (state, action) => {
	switch (action.type) {
		case USER_ACTION_TYPES.LOGIN:
			const token = action.payload || window.localStorage.getItem("token");
			try {
				const user = jwtDecode(token);
				if (user.code === 0) throw new Error(user.message);
				window.localStorage.setItem("token", token);
				return {
					...state,
					token: token,
					user: user.userProfile
				};
			} catch (err) {
				window.localStorage.removeItem("token");
				return { state, user: null, token: null };
			}
		case USER_ACTION_TYPES.LOGOUT:
			window.localStorage.removeItem("token");
			return { ...state, user: null, token: null };
		default:
			return state;
	}
};

export const UserProvider = ({ children }) => (
	<UserContext.Provider value={useReducer(reducer, initialState)}>
		{children}
	</UserContext.Provider>
);
