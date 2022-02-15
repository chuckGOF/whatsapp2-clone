const initialState = ["Await Friends", "Eat lunch", "Play game"];

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADD_TODO":
			return [...state, action.payload];

		default:
			return state;
	}
};

const event_add = {
	type: "ADD_TODO",
	payload: "Summary for Naomi with Jenom",
};

// console.log(reducer(undefined, event_add));

const cart = {
	bag: { price: 25, quantity: 3 },
	cap: { price: 5, quantity: 9 },
	shoe: { price: 35, quantity: 6 },
};

const updater = (name, newQuantity) => {
	return {
		type: "updateQuantity",
		payload: {
			name: name,
			newQuantity: newQuantity,
		},
	};
};

const cartReducer = (state = cart, action) => {
	switch (action.type) {
		case "updateQuantity":
            const { name, newQuantity } = action.payload;
            const itemToUpdate = state[name]
            const updatedQuantity = { ...itemToUpdate, quantity: newQuantity }

            const newState = { ...state, [name]: updatedQuantity }

            return {
                ...state,
                [name]: updatedQuantity
            }

		default:
			return state;
	}
};

console.log(cartReducer(cart, updater('bag', 7)));


import React from 'react';
import {
  calculateTotal,
  getCurrencySymbol,
} from '../../utilities/utilities.js';

// Import the changeItemQuantity() action creator.
import {changeItemQuantity} from './cartSlice'

export const Cart = (props) => {
    const { cart, currencyFilter, dispatch } = props;

    const onInputChangeHandler = (name, input) => {
        // If the user enters a bad value...
        if (input === '') {
            return;
        }

        // Otherwise, convert the input into a number and pass it along as the newQuantity.
        const newQuantity = Number(input);

        // Dispatch an action to change the quantity of the given name and quantity.
        dispatch(changeItemQuantity(name, newQuantity))

        // Use the cart and currencyFilter slices to render their data.
        const cartElements = Object.keys(cart).map(createCartItem);
        const total = calculateTotal(cart, currencyFilter);
    }
        return (
            <div id="cart-container">
                <ul id="cart-items">{cartElements}</ul>
                <h3 className="total">
                    Total{' '}
                    <span className="total-value">
                        {getCurrencySymbol(currencyFilter)}{total} {currencyFilter}
                    </span>
                </h3>
            </div>
        );

        function createCartItem(name) {
            const item = cart[name];

            if (item.quantity === 0) {
                return;
            }

            return (
                <li key={name}>
                    <p>{name}</p>
                    <select
                        className="item-quantity"
                        value={item.quantity}
                        onChange={(e) => {
                            onInputChangeHandler(name, e.target.value);
                        }}
                    >
                        {[...Array(100).keys()].map((_, index) => (
                            <option key={index} value={index}>
                                {index}
                            </option>
                        ))}
                    </select>
                </li>
            );
        }
    };