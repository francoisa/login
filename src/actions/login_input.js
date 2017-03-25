export const USER_CHANGE = 'USER_CHANGE'
export const PWD_CHANGE = 'PWD_CHANGE'

export const userChange = (user='') => ({
    type: USER_CHANGE,
    payload: user
  });

export const pwdChange = (pwd='') => ({
    type: PWD_CHANGE,
    payload: pwd
  });
