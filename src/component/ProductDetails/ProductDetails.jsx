import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../constant/conastant";
import { cartContext } from "../../Context/CartContext";
import { wishlistContext } from "../../Context/WishlistContext";
import ProductDetailsSkeleton from './ProductDetailsSkeleton';
import useDocumentTitle from "../../hooks/useDocumentTitle";


export default function ProductDetails() {
  useDocumentTitle('Product Details');
  const { productId } = useParams();
  const { addToCart, setCart } = useContext(cartContext);
  const { addToWishlist, setWishlist, deleteWishlistItem } =
    useContext(wishlistContext);

  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [redHeart, setRedHeart] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  async function getProductDetails() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/v1/products/${productId}`
      );
      console.log("data :", data.data);
      setProductData(data.data);
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function addProduct(productId) {
    const loadingToster = toast.loading("Waiting...");
    const data = await addToCart(productId);
    toast.dismiss(loadingToster);
    if (data.status === "success") {
      setCart(data);
      toast.success(data?.message);
    } else {
      toast.error(data?.message);
    }
  }

  async function addWishlist(productId) {
    const loadingToster = toast.loading("Waiting...");
    const data = await addToWishlist(productId);
    toast.dismiss(loadingToster);
    if (data.status === "success") {
      setWishlist(data);
      toast.success(data?.message);
      setRedHeart(true);
    } else {
      toast.error(data?.message);
    }
  }

  async function deleteItem(productId) {
    const data = await deleteWishlistItem(productId);
    toast.success(data?.message);
    setLoading(false);
    setWishlist(data);
    setRedHeart(false);
  }

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <div className=" container mx-auto">
      <Toaster position="top-right" reverseOrder={false} />
      {loading ? (
        <ProductDetailsSkeleton />
      ) : (
        <div className=" flex flex-col justify-around  items-center md:flex-row pt-28">
          {/* Image Gallery */}
          <div className="w-80 ms-0">
            {productData?.images?.length > 0 ? (
              <>
                <div className="relative">
                  <img 
                    src={productData.images[currentImageIndex]} 
                    alt={`Product image ${currentImageIndex + 1}`}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                  {productData.images.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev - 1 + productData.images.length) % productData.images.length)}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                      >
                        <i className="fa-solid fa-chevron-left"></i>
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev + 1) % productData.images.length)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                      >
                        <i className="fa-solid fa-chevron-right"></i>
                      </button>
                    </>
                  )}
                </div>
                {/* Thumbnail Gallery */}
                {productData.images.length > 1 && (
                  <div className="flex space-x-2 mt-4">
                    {productData.images.map((img, index) => (
                      <button
                        key={img}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 object-cover rounded ${currentImageIndex === index ? 'ring-2 ring-green-500' : ''}`}
                      >
                        <img 
                          src={img} 
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover rounded"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">No images available</p>
              </div>
            )}
          </div>
          <div className="w-3/4 md:w-1/2">
            <h3 className="py-4 text-4xl font-medium">{productData?.title}</h3>
            <p>{productData?.description}</p>
            <div className="flex justify-between items-center py-4">
              <p>{productData?.price} EGP</p>
              <div>
                <span className="text-yellow-400 px-1">
                  <i className="fa-solid fa-star"></i>
                </span>
                {productData?.ratingsAverage}
              </div>
            </div>
            <div className="flex items-center justify-between text-3xl">
              <button
                onClick={() => addProduct(productData._id)}
                type="button"
                className=" w-3/4 ms-20 focus:outline-none text-white bg-green-500 hover:bg-green-600 rounded-md text-sm px-5 py-2.5 "
              >
                + Add
              </button>
              {redHeart == true ? (
                <button
                  onClick={() => deleteItem(productData?._id)}
                  className="text-red-600"
                >
                  <i className="fa-solid fa-heart"></i>
                </button>
              ) : (
                <button
                  onClick={() => addWishlist(productData._id)}
                  className="text-green-800"
                >
                  <i className="fa-solid fa-heart"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
