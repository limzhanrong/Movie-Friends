import React, { useState, createContext , useEffect, useReducer } from 'react'
import serverAPI from '../APIs/serverAPI'
import { reducer, AddToWatchListModalReducer } from './reducer'

export const AuthContext = createContext()

export const AuthProvider = (props) => {
    const [auth, setAuth] = useState({
        id:'',
        username:'',
        token:'',
        authenticated: false
    })
    
    const logout = () =>{
        setAuth({
            id:'',
            username:'',
            token:'',
            authenticated: false
        })
        localStorage.removeItem("token")
    }

    async function fetchUserInfo(token) {
        try{
            const response = await serverAPI.post('/api/user/authenticated/getInfo',{
              token: token
            })
            console.log('Fetch user info:', response)
            if(response){
                setAuth(auth=>({ ...auth, id: response.data.user_id, token:token, username:response.data.username, authenticated: true}))
            }
          }catch(err){
            console.log("fetch user info failed: " + err)
          }
    }

    useEffect(() => {
        const serverInterceptor = serverAPI.interceptors.response.use(undefined, (error) => {
            console.log('intercepted: ', error.response);
            if(error.response.status === 401){
                logout()
            }
            return Promise.reject(error);
        });

        

        const token = localStorage.getItem('token');
        if(token){
            fetchUserInfo(token)
        }
        
        // Clean up function. Removes interceptor when component is unmounted
        return () => {
            serverAPI.interceptors.response.eject(serverInterceptor)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <AuthContext.Provider value={{useAuthState: [auth, setAuth], logout: logout, fetchUserInfo:fetchUserInfo}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const SnackBarContext = createContext()

export const SnackBarProvider = (props) => {
    const initialState = {open: false, status:"error", message:"Please fill in all fields"}
    const [snackBar, dispatch] = useReducer(reducer, initialState)

    return (
        <SnackBarContext.Provider value={{snackBar: snackBar, dispatch: dispatch}}>
            {props.children}
        </SnackBarContext.Provider>
    )
}

export const AddToWatchListModalContext = createContext()

export const AddToWatchListModalProvider = (props) => {
    const initialState = {open: false}
    const [userWatchLists,setUserWatchLists] = useState([])
    const [watchListModalState, watchListModalDispatch] = useReducer(AddToWatchListModalReducer, initialState)
    useEffect(()=>{
        setUserWatchLists(["a","b","c","d"])
    },[])
    return (
        <AddToWatchListModalContext.Provider value={{
            watchListModalState: watchListModalState, 
            watchListModalDispatch: watchListModalDispatch,
            useUserWatchListState : [userWatchLists, setUserWatchLists]
            }}>
            {props.children}
        </AddToWatchListModalContext.Provider>
    )
}

