const test = (state = {result: 'HELLO'}, action) => {
    switch (action.type) {
        case 'TEST_ACTION':
         return action.payload
         
        default:
         return state
    }
}

export default test;