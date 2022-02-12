const initialState = ['Await Friends', 'Eat lunch', 'Play game']

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, action.payload]
        
        default:
            return state
    }
}

const event_add = {
    type: 'ADD_TODO',
    payload: 'Summary for Naomi with Jenom'
}

console.log(reducer(undefined, event_add))