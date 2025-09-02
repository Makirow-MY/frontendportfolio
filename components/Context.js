// src/context/CartContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (project) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === project._id);
      if (existingItem) {
        return prevItems.map(item =>
          item._id === project._id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prevItems, { ...project, quantity: 1 }];
    });
  };

  const removeFromCart = (projectId) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === projectId);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map(item =>
          item._id === projectId 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        );
      }
      return prevItems.filter(item => item._id !== projectId);
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);