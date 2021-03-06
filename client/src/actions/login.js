import ActionTypes from '../constants/actionTypes'
import axios from "axios";
import { message } from 'antd';
import history from '../routes/history';

import store from '../store'

export async function login(payload) {
  try {
    store.dispatch({
      type: ActionTypes.LOGIN_BEGIN,
      payload: payload
    });

    const res = await axios.post('http://localhost:3001/api/v1/auth/login', payload);

    store.dispatch({
      type: ActionTypes.LOGIN_SUCCESS,
      payload: {
        username: res.data.user.username,
        id: res.data.user._id,
      }
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user_id", res.data.user._id);

    history.push('/');
  } catch (e) {
    message.error(e.response.data.message, 1);
    store.dispatch({
      type: ActionTypes.LOGIN_ERROR,
      payload: e.response.data.message
    });
  }
}

export async function register(payload) {
  store.dispatch({
    type: ActionTypes.REGISTER_BEGIN,
    payload: payload
  });

  try {
    const res = await axios.post('http://localhost:3001/api/v1/auth/register', payload);
    store.dispatch({
      type: ActionTypes.REGISTER_SUCCESS,
      payload: res.data.user.username
    });

    history.push('/login');
  } catch (e) {
    message.error(e.response.data.message, 1);

    store.dispatch({
      type: ActionTypes.REGISTER_ERROR,
      payload: e.response.data.message
    });
  }
}

export async function isLogined() {
  if (localStorage.token) {
    const data = {
      headers: {
        Authorization: "Bearer " + localStorage.token
      }
    }

    try {
      store.dispatch({
        type: ActionTypes.LOGIN_BEGIN
      });

      const res = await axios.get('http://localhost:3001/api/v1/auth/', data);

      store.dispatch({
        type: ActionTypes.LOGIN_SUCCESS,
        payload: res.data.username
      });

      history.push('/');
    } catch (e) {
      store.dispatch({
        type: ActionTypes.LOGIN_ERROR,
        payload: e.response.data.message
      });

      localStorage.removeItem("token");
      history.push('/login');
    }
  }

}

export async function logout() {
  store.dispatch({
    type: ActionTypes.LOGOUT
  });

  localStorage.removeItem("user_id");
}