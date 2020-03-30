export const getPeople = (page) => ({
    type: 'GET_PEOPLE',
    page
});

export const getDetails = (param) => ({
    type: 'GET_DETAILS',
    param
});