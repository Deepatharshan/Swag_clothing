import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = (cloth, size, qty) => {
    setItems(prev => {
      const existing = prev.find(it => it.id === cloth._id && it.size === size);
      if (existing) {
        return prev.map(it =>
          it.id === cloth._id && it.size === size
            ? { ...it, quantity: it.quantity + qty }
            : it
        );
      }
      return [
        ...prev,
        { id: cloth._id, name: cloth.name, price: cloth.price, image: cloth.image, size, quantity: qty },
      ];
    });
  };

  const updateItem = (index, newValues) => {
    setItems(prev => prev.map((it, i) => (i === index ? { ...it, ...newValues } : it)));
  };

  const removeItem = index => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addItem, updateItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
