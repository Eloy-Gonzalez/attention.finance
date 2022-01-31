// @Vendors
import { get } from 'lodash'

import jsonwebtoken from 'jsonwebtoken'

import { TOKEN } from '../constants'

// Mapear mensajes de errores del servidor
export const buildErrorsObj = err => {
  let serverErrors = get(err, 'message', '') || get(err, 'statusText', '') || '¡Ocurrió un error con el servidor!';

  const errNro = get(err, 'errNro', '');
  if (errNro !== '') {
    serverErrors = `${errNro} - ${serverErrors}`;
  }
  return {
    serverErrors,
    statusError: err ? get(err, 'status', '') : 502
  }
}

export function userCan(rolName, rolId) {
  try {
    const rolesList = [ ["ROOT", 1], ["ADMIN", 2] ]
    for(let i = 0; i < rolesList.length; i++) {
      if(rolesList[i][0] === rolName.toUpperCase() && rolesList[i][1] === Number(rolId)){
        return true
      }
    }
    return false
  } catch(err) {
    console.error(err)
    return false
  }
}

export function getToken(key = TOKEN) {
  return JSON.parse(localStorage.getItem(key)) || false
}

export function verifyToken() {
  const token = getToken(TOKEN)
  if(token) {
    const {exp} = jsonwebtoken.decode(token) || 0
    if(exp > Math.floor(Date.now() / 1000)){
      return token
    } else {
      return false
    }
  }
  return false
}

export function setToken(jwt = "", key = TOKEN) {
  localStorage.setItem(key, JSON.stringify(jwt));
}

export function removeToken(key = TOKEN) {
  if(getToken(TOKEN)) {
    localStorage.removeItem(key)
    return true
  }
  return false
}

export const log = fn => {
  return console.log(fn);
}

export const isEmpty = params => {
  if (params === undefined || params === [] || params === '' || params === {} || params === null) {
    return 'Not found';
  } else {
    return params;
  }
}

export const capitalize = (str, lower = false) => {
  return (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
}
