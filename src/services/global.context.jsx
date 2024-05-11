import React, { createContext, useEffect, useReducer } from 'react'

export const GlobalContext = createContext()

const initialState = JSON.parse(localStorage.getItem('appState')) || {
  alumnos: [],
  aulas: [],
  materias: [],
  cartillas: [],
  profesores: [],
  tareas: [],
  tps: [],
  meets: [],
  notis:[],
  getMeet: null,
  getTp: null,
  getTarea: null,
  getAlumno: null,
  getCartilla: null,
  getProfesor: null,
  getNoti:null,
  alumno: null,
}

//funcion reductora para actualizar el estado
const reducer = (state, action) => {

  switch (action.type) {
    case 'LOGOUT':
      return {
        alumnos: [],
        aulas: [],
        materias: [],
        cartillas: [],
        profesores: [],
        tareas: [],
        tps: [],
        notis:[],
        bibliotecas: [],
        meets: [],
        getMeet: null,
        getTp: null,
        getTarea: null,
        getBiblioteca: null,
        getNoti:null,
        getAlumno: null,
        getCartilla: null,
        getProfesor: null,
        alumno: null,
      }
    case 'LOGIN_ALUMNO':
      return {
        ...state,
        alumno: action.payload
      }
    /**
     * CRUD ALUMNO
     */
    case 'GET_ALUMNO':
      return {
        ...state,
        getAlumno: action.payload
      }
    case 'GET_ALUMNOS':
      return {
        ...state,
        alumnos: action.payload
      }
    case 'ACTUALIZAR_ALUMNOS':
      return {
        ...state,
        alumnos: action.payload,
        getAlumno: []
      }
    case 'POST_ALUMNO':
      return {
        ...state,
        alumnos: [...state.alumnos, action.payload],
      }
    case 'UPDATE_ALUMNO':
      const updatedAlumnos = state.alumnos.map(alumno =>
        alumno.alumno_id === action.payload.alumno_id ? action.payload : alumno
      )

      return {
        ...state,
        alumnos: updatedAlumnos
      }
    case 'DELETE_ALUMNO':
      const deletedAlumnos = state.alumnos.filter(alumno =>
        alumno.alumno_id !== action.payload
      )
      return {
        ...state,
        alumnos: deletedAlumnos
      }
    /**
     * CRUD AULAS
     */
    case 'GET_AULAS':
      return {
        ...state,
        aulas: action.payload
      }
    /**
     * CRUD MATERIAS
     */
    case 'GET_MATERIAS':
      return {
        ...state,
        materias: action.payload
      }
    /**
     * CRUD CARTILLAS
     */
    case 'GET_CARTILLAS':
      return {
        ...state,
        cartillas: action.payload
      }
    case 'POST_CARTILLA':
      return {
        ...state,
        cartillas: [...state.cartillas, action.payload]
      }
    case 'GET_CARTILLA':
      return {
        ...state,
        getCartilla: action.payload
      }
    case 'UPDATE_CARTILLA':
      const updatedCartillas = state.cartillas.map(cartilla =>
        cartilla.cartilla_id === action.payload.cartilla_id ? action.payload : cartilla
      )
      return {
        ...state,
        cartillas: updatedCartillas
      }
    case 'DELETE_CARTILLA':
      const deletedCartillas = state.cartillas.filter(cartilla =>
        cartilla.cartilla_id !== action.payload
      )
      return {
        ...state,
        cartillas: deletedCartillas
      }
    /**
     * CRUD Profesores
     */
    case 'GET_PROFESORES':
      return {
        ...state,
        profesores: action.payload
      }
    case 'GET_PROFESOR':
      return {
        ...state,
        getProfesor: action.payload
      }
    case 'POST_PROFESOR':
      return {
        ...state,
        profesores: [...state.profesores, action.payload]
      }
    case 'DELETE_PROFESOR':
      const deletedProfesores = state.profesores.filter(profesor =>
        profesor.profesor_id !== action.payload
      )
      return {
        ...state,
        profesores: deletedProfesores
      }
    case 'UPDATE_PROFESOR':
      const updatedProfesor = state.profesores.map(profesores =>
        profesores.profesor_id === action.payload.profesor_id ? action.payload : profesores
      )
      return {
        ...state,
        profesores: updatedProfesor
      }
    /**
     * CRUD Tareas
     */
    case 'GET_TAREAS':
      return {
        ...state,
        tareas: action.payload
      }
    case 'GET_TAREA':
      return {
        ...state,
        getTarea: action.payload
      }
    case 'POST_TAREA':
      return {
        ...state,
        tareas: [...state.tareas, action.payload]
      }
    case 'DELETE_TAREA':
      const deletedTareas = state.tareas.filter(tarea =>
        tarea.tarea_id !== action.payload
      );
      return {
        ...state,
        tareas: deletedTareas
      };
    case 'UPDATE_TAREA':
      const updatedTareas = state.tareas.map(tarea =>
        tarea.tarea_id === action.payload.tarea_id ? action.payload : tarea
      )
      return {
        ...state,
        tareas: updatedTareas
      }
    /**
     * CRUD Tps
     */
    case 'GET_TPS':
      return {
        ...state,
        tps: action.payload
      }
    case 'GET_TP':
      return {
        ...state,
        getTp: action.payload
      }
    case 'POST_TP':
      return {
        ...state,
        tps: [...state.tps, action.payload]
      }
    case 'DELETE_TP':
      const deletedTps = state.tps.filter(tp =>
        tp.tp_id !== action.payload
      )
      return {
        ...state,
        tps: deletedTps
      }
    case 'UPDATE_TP':
      const updatedTps = state.tps.map(tp =>
        tp.tp_id === action.payload.tp_id ? action.payload : tp
      )
      return {
        ...state,
        tps: updatedTps
      }
    /**
     * CRUD MEET
     */
    case 'GET_MEETS':
      return {
        ...state,
        meets: action.payload
      }
    case 'GET_MEET':
      return {
        ...state,
        getMeet: action.payload
      }
    case 'POST_MEET':
      return {
        ...state,
        meets: [...state.meets, action.payload]
      }
    case 'DELETE_MEET':
      const deletedMeet = state.meets.filter(meet =>
        meet.meet_id !== action.payload
      )
      return {
        ...state,
        meets: deletedMeet
      }
    case 'UPDATE_MEET':
      const updatedMeet = state.meets.map(meet =>
        meet.meet_id === action.payload.meet_id ? action.payload : meet
      )
      return {
        ...state,
        meets: updatedMeet
      }
      /**
     * CRUD VIDEO
     */
    case 'GET_VIDEOS':
      return {
        ...state,
        videos: action.payload
      }
    case 'GET_VIDEO':
      return {
        ...state,
        getVideo: action.payload
      }
    case 'POST_VIDEO':
      return {
        ...state,
        videos: [...state.videos, action.payload]
      }
    case 'DELETE_VIDEO':
      const deletedVideo = state.videos.filter(video =>
        video.video_id !== action.payload
      )
      return {
        ...state,
        videos: deletedVideo
      }
    case 'UPDATE_VIDEO':
      const updatedVideo= state.videos.map(video =>
        video.video_id === action.payload.video_id ? action.payload : video
      )
      return {
        ...state,
        videos: updatedVideo
      }
      /**
     * CRUD AULA
     */
    case 'GET_AULA':
      return {
        ...state,
        getAula: action.payload
      }
    case 'POST_AULA':
      return {
        ...state,
        aulas: [...state.aulas, action.payload]
      }
    case 'DELETE_AULA':
      const deletedAula = state.aulas.filter(aula =>
        aula.aula_id !== action.payload
      )
      return {
        ...state,
        aulas: deletedAula
      }
    case 'UPDATE_AULA':
      const updatedAula = state.aulas.map(aula =>
        aula.aula_id === action.payload.aula_id ? action.payload : aula
      )
      return {
        ...state,
        aulas: updatedAula
      }

      /**
     * CRUD MATERIA
     */
    case 'GET_MATERIA':
      return {
        ...state,
        getMateria: action.payload
      }
    case 'POST_MATERIA':
      return {
        ...state,
        materias: [...state.materias, action.payload]
      }
    case 'DELETE_MATERIA':
      const deletedMateria = state.materias.filter(materia =>
        materia.materia_id !== action.payload
      )
      return {
        ...state,
        materias: deletedMateria
      }
    case 'UPDATE_MATERIA':
      const updatedMateria = state.materias.map(materia =>
        materia.materia_id === action.payload.materia_id ? action.payload : materia
      )
      return {
        ...state,
        materias: updatedMateria
      }

      /**
     * CRUD Biblioteca
     */
    case 'GET_BIBLIOTECAS':
      return {
        ...state,
        bibliotecas: action.payload
      }
    case 'GET_BIBLIOTECA':
      return {
        ...state,
        getBiblioteca: action.payload
      }
    case 'POST_BIBLIOTECA':
      return {
        ...state,
        bibliotecas: [...state.bibliotecas, action.payload]
      }
    case 'DELETE_BIBLIOTECA':
      const deletedBiblioteca = state.bibliotecas.filter(biblio =>
        biblio.biblio_id !== action.payload
      )
      return {
        ...state,
        bibliotecas: deletedBiblioteca
      }
    case 'UPDATE_BIBLIOTECA':
      const updatedBiblioteca = state.bibliotecas.map(biblio =>
        biblio.biblio_id === action.payload.biblio_id ? action.payload : biblio
      )
      return {
        ...state,
        bibliotecas: updatedBiblioteca
      }
      /**
     * CRUD Notificaciones
     */
    case 'GET_NOTIS':
      return {
        ...state,
        notis: action.payload
      }
    case 'GET_NOTI':
      return {
        ...state,
        getNoti: action.payload
      }
    case 'POST_NOTI':
      return {
        ...state,
        notis: [...state.notis, action.payload]
      }
    case 'DELETE_NOTI':
      const deletedNoti = state.notis.filter(noti =>
        noti.noti_id !== action.payload
      );
      return {
        ...state,
        notis: deletedNoti
      };
    case 'UPDATE_NOTI':
      const updatedNoti = state.notis.map(noti =>
        noti.noti_id === action.payload.noti_id ? action.payload : noti
      )
      return {
        ...state,
        notis: updatedNoti
      }
  }
}

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const intervalId = setInterval(() => {
      //cada 30 minutos resetea la sesión
      dispatch({ type: 'LOGOUT' }); // Dispatch de acción para cerrar la sesión
    }, 30 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [])

  useEffect(() => {
    localStorage.setItem('appState', JSON.stringify(state))
  }, [state]);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default ContextProvider
