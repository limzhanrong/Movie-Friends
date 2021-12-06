export const reducer = (state, action) =>{
    switch (action.type) {
        case 'OPEN_SUCCESS_SNACKBAR':
          return { ...state, status:"success", open : true, message: action.message };
        case 'OPEN_ERROR_SNACKBAR':
          return { ...state, status: "error", open : true, message: action.message };
        case 'CLOSE_SNACKBAR':
          return { ...state, open : false };
        default:
          throw new Error();
      }
}