export const updateState = (state,changes)=>{
    return {
        ...state,
        ...changes
    }
}