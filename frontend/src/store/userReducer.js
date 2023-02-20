

export const initialState ={
    site:'xyz.com',
    name:'test'
}

export const reducer =(state,action) =>{
    console.log('====================================',state,action);
    switch(action.type){
        case 'UPDATE_NAME':
            return {...state,name:action.payload}
        default:
        return state
    }
}