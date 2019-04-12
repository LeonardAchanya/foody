import axios from "../../utils/axios-base";
import * as types from "./types";

 export const authStart = () => ({
  type: types.AUTH_START
});

 export const authSuccess = (token, userId) => ({
  type: types.AUTH_SUCCESS,
  token,
  userId
});

 export const authFailed = error => ({
  type: types.AUTH_FAILED,
  error
});

 export const auth = authData => (dispatch, getState) => {
  dispatch(authStart());
  const isLogin = getState().auth.isLogin;
  // const endPoint = isLogin ? "auth" : "user";
  let endPoint = null;
	let formData = null;
	const config = {
		headers: {}
	};
	if (!isLogin) {
		config.headers["Content-Type"] = "multipart/form-data";
		endPoint = "user";
		formData = new FormData();
		formData.append("firstname", authData.firstname);
		formData.append("lastname", authData.lastname);
		formData.append("username", authData.username);
		formData.append("email", authData.email);
		formData.append("password", authData.password);
		formData.append("image", authData.image);
	} else {
		config.headers["Content-Type"] = "application/json";
		endPoint = "auth";
		formData = authData;
  }
  
  axios
    .post("/" + endPoint, formData,config)
    .then(res => {
      const { token, user } = res.data;
      const userId = user.id;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      dispatch(authSuccess(token, userId));
    })
    .catch(err => dispatch(authFailed(err.response.data)));
};

 export const toggleAuth = () => ({
  type: types.TOGGLE_AUTH
});

 export const logout = () => ({
  type: types.LOGOUT_SUCCESS
});