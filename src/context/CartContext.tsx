'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product } from '@/app/types/Product';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
}

interface CartAction {
  type: 'ADD_TO_CART' | 'REMOVE_FROM_CART' | 'CLEAR_CART' | 'SET_CART' | 'UPDATE_CART';
  payload?: CartItem | string | CartItem[];
}

const initialState: CartState = {
  cart: []
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({
  state: initialState,
  dispatch: () => null
});

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item._id === (action.payload as CartItem)?._id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item._id === existingItem._id ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...(action.payload as CartItem)!, quantity: 1 }]
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item._id !== (action.payload as string))
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cart: []
      };
    case 'SET_CART':
      return {
        ...state,
        cart: action.payload as CartItem[]
      };
    case 'UPDATE_CART':
      return {
        ...state,
        cart: state.cart.map(item =>
          item._id === (action.payload as CartItem)._id ? { ...item, quantity: (action.payload as CartItem).quantity } : item
        )
      };
    default:
      return state;
  }
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      dispatch({ type: 'SET_CART', payload: JSON.parse(savedCart) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
