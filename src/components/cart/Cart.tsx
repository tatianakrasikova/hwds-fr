import React, { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import instance from "../../lib/axios";
import { CartItemArticle } from "../../types/types";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {

  const [cartItems, setCartItems] = useState<CartItemArticle[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const navigate = useNavigate();

  async function fetchCart() {
    try {
      const response = await instance.get("/cart", { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } });
      setCartItems(response.data?.articles);
      setTotalPrice(response.data?.totalPriceArticles)
    } catch (error) {
      console.error(error);
    }
  }


  async function deleteCartItem(id: number) {
    try {
      const res = await instance.delete(`/cart/remove_article/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } });
      if (res.status === 204) {
        fetchCart();
      }
    } catch (error) {
      console.error("Error deleting item from cart", error);
    }
  }

  function handleDeleteItem(id: number) {
    deleteCartItem(id);
  }


  async function clearCart() {
    try {
      const res = await instance.delete(`/cart/clear`, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } });
      if (res.status === 204) {
        await fetchCart();
      }
    } catch (error) {
      console.error("Error clearing cart", error);
    }
  }


  function handleCheckout() {

    
    navigate("/checkout");
  }

  useEffect(() => {
    fetchCart()
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Warenkorb</h1>
      {cartItems.length === 0 ? (
        <p className={styles.empty}>Der Warenkorb ist leer</p>
      ) : (
        <>
          <ul className={styles.list}>
            {cartItems.map((cartItem: CartItemArticle) => (
              <li key={cartItem?.id} className={styles.item}>
                <p>Bestelldatum: {cartItem?.entryDate}</p>
                {/* <p>Departure date: {cartItem?.departureDate}</p> */}
                <p>Kategorienummer: {cartItem?.article.departamentId}</p>
                <p>Artikelnummer: {cartItem?.article.id}</p>
                <p>Artikelpreis: {cartItem?.article.price}</p>
                <button className={styles.removeButton} onClick={() => handleDeleteItem(cartItem.article.id)}>Löschen</button>

              </li>

            ))}
          </ul>
          <button className={styles.clearButton} onClick={clearCart}>Leerer Warenkorb</button>
          <div className={styles.summary}>
            <h2 className={styles.totalPrice}>Gesamtkosten: ${totalPrice}</h2>
            <button className={styles.checkoutButton} onClick={handleCheckout}>
              Bezahlen
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
