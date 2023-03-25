export const initialState = JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : ""
export const stateForLogin = localStorage.getItem("isLogin") ? localStorage.getItem("isLogin") : false
export const stateForActive = localStorage.getItem("active") ? localStorage.getItem("active") : false

export const reducer = (state, action) => {
    switch(action.type) {
        case "USER":
            return  action.payload
        case "NO-USER":
            return action.payload
        default:
            return state
    }
}

export const reducerForLogin = (state, action) => {
    switch(action.type) {
        case "LOGIN":
            return action.payload
        case "LOGOUT":
            return action.payload
        default:
            return state
    }
}

export const reducerForActive = (state, action) => {
    switch(action.type) {
        case "ACTIVE":
            return action.payload
            break;
        case "NOT_ACTIVE":
            return action.payload
            break;
        default:
            return state
    }
}