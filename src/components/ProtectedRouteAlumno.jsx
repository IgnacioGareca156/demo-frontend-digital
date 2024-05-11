import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { GlobalContext } from '../services/global.context';

const ProtectedRouteAlumno = ({ children }) => {
  const { state } = useContext(GlobalContext);

  if (state.alumno) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

const AuthProtectedRouteAlumno = ({ children }) => {
  const { state } = useContext(GlobalContext);

  if (state.alumno) {
    return <Navigate to="/digital" />;
  } else {
    return children;
  }
};

export {ProtectedRouteAlumno, AuthProtectedRouteAlumno}
