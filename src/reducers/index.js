const reducer = (state = {}, action) => {
   switch (action.type) {
     case 'GET_PEOPLE':
          return { ...state, loading: true };
     case 'PEOPLE_RECEIVED':
          return { ...state, peoples: action.json, loading: false }
     default: 
          return state;
   }
  };
  export default reducer;