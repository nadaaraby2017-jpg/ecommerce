import { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export default function CartPage() {
  useDocumentTitle("Cart");

  const {
    getCartItem,
    deleteCartItem,
    updateCartItem,
    deleteAllCart,
    setCart,
  } = useContext(cartContext);

  const [cartInfo, setCartInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCartData = async () => {
    setIsLoading(true);
    const response = await getCartItem();
    setCartInfo(response);
    setIsLoading(false);
  };

  const removeProduct = async (id) => {
    const loadingToast = toast.loading("Removing item...");
    const result = await deleteCartItem(id);
    toast.dismiss(loadingToast);
    toast.success("Item removed successfully!");
    setCart(result);
    setCartInfo(result);
    fetchCartData();
  };

  const clearCartItems = async () => {
    const loadingToast = toast.loading("Clearing cart...");
    const result = await deleteAllCart();
    toast.dismiss(loadingToast);
    toast.success("Cart cleared!");
    setCart(result);
    setCartInfo(result);
  };

  const modifyProductCount = async (id, quantity) => {
    if (quantity < 1) return removeProduct(id);
    const loadingToast = toast.loading("Updating...");
    await updateCartItem(id, quantity);
    toast.dismiss(loadingToast);
    toast.success("Product updated");
    fetchCartData();
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  return (
    <section className="pt-36 container mx-auto px-4 md:px-8">
      <Toaster position="top-right" />
      <div className="bg-gray-100 rounded-lg p-8 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold">Your Cart</h2>
          {isLoading ? null : cartInfo?.data?.products.length ? (
            <Link to="/checkout">
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-md px-4 py-2 transition">
                Proceed to Checkout
              </button>
            </Link>
          ) : null}
        </div>

        {isLoading ? (
          <h3 className="text-xl font-medium">Loading your cart...</h3>
        ) : cartInfo?.data?.products.length ? (
          <>
            <div className="flex justify-between items-center text-lg mb-4">
              <p>
                Total Price:
                <span className="text-blue-500 ps-1">
                  {cartInfo?.data?.totalCartPrice} EGP
                </span>
              </p>
              <p>
                Items:
                <span className="text-blue-500 ps-1">
                  {cartInfo?.numOfCartItems}
                </span>
              </p>
            </div>

            {cartInfo.data.products.map((item) => (
              <div
                key={item.product._id}
                className="flex flex-col md:flex-row justify-between items-center py-4 border-b"
              >
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-24 md:w-28"
                  />
                  <div>
                    <h4 className="text-lg font-medium">{item.product.title}</h4>
                    <p className="text-gray-600">{item.price} EGP</p>
                    <button
                      onClick={() => removeProduct(item.product._id)}
                      className="text-red-500 mt-2"
                    >
                      <i className="fa-solid fa-trash"></i> Remove
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-3 md:mt-0">
                  <button
                    onClick={() =>
                      modifyProductCount(item.product._id, item.count - 1)
                    }
                    className="border border-blue-400 px-3 py-1 rounded"
                  >
                    -
                  </button>
                  <span>{item.count}</span>
                  <button
                    onClick={() =>
                      modifyProductCount(item.product._id, item.count + 1)
                    }
                    className="border border-blue-400 px-3 py-1 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-center mt-6">
              <button
                onClick={clearCartItems}
                className="border border-red-400 text-red-500 hover:bg-red-50 px-6 py-2 rounded transition"
              >
                Clear Cart
              </button>
            </div>
          </>
        ) : (
          <h3 className="text-xl font-medium text-center">Your cart is empty</h3>
        )}
      </div>
    </section>
  );
}
