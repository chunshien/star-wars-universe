const initialState = {
   allPeoples: [],
   peoples: [],
   totalItem: 0,
   itemCountPerPage: 10,
   activePage: 1,
   loading: false, 
   details: {}
}
const reducer = (state = initialState, action) => {
   switch (action.type) {
      case 'GET_PEOPLE':          
         return { ...state, loading: true };
      case 'PEOPLE_RECEIVED':
         return { 
               ...state, 
               peoples: action.peoples, 
               totalItem: action.total,
               activePage: action.page,
               loading: false
         }
      case 'GET_DETAILS':          
         return { ...state, loading: true };
      case 'DETAILS_RECEIVED':
            return { 
                  ...state, 
                  details: action.details,
                  loading: false
            }
      default: 
         return state;
   }
};
export default reducer;