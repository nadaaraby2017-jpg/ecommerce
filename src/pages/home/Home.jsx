import axios from "axios";
import { baseUrl } from "../../constant/conastant";
import ProductCard from "../../component/productCard/ProductCard";
import { useEffect, useState } from "react";
import ProductSkeleton from "../../component/productCard/ProductSkeleton";
import img1 from "../../assets/bags.jpg";
import img2 from "../../assets/music.jpg";
import imgSlider1 from "../../assets/babyCart.jpg";
import imgSlider2 from "../../assets/bag.jpg";
import imgSlider3 from "../../assets/accessories.jpg";
import Products from "../products/Products";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export default function Home() {
  useDocumentTitle("Home");
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentCategorySlide, setCurrentCategorySlide] = useState(0);

  async function getAllCategories() {
    setLoading(true);
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/categories`);
      setAllCategories(data.data);
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    getAllCategories();
    
    // Auto-advance main slider
    const mainSliderInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 3000);
    
    // Auto-advance category slider
    const categorySliderInterval = setInterval(() => {
      if (allCategories.length > 0) {
        setCurrentCategorySlide((prev) => (prev + 1) % allCategories.length);
      }
    }, 2000);
    
    return () => {
      clearInterval(mainSliderInterval);
      clearInterval(categorySliderInterval);
    };
  }, [allCategories.length]);

  return (
    <div className="container mx-auto pt-32">
      <div className="flex flex-col md:flex-row justify-center">
        {/* Main Image Slider */}
        <div className="relative !mx-2 md:w-72 h-[480px] overflow-hidden rounded-lg">
          <div 
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            <div className="w-full flex-shrink-0">
              <img
                src={imgSlider1}
                alt="babyCart"
                className="w-80 m-auto md:w-72 h-full object-cover"
              />
            </div>
            <div className="w-full flex-shrink-0">
              <img
                src={imgSlider2}
                alt="babyCart"
                className="w-80 m-auto md:w-72 h-full object-cover"
              />
            </div>
            <div className="w-full flex-shrink-0">
              <img
                src={imgSlider3}
                alt="babyCart"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Slider Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="h-60 px-2  md:w-80">
          <img src={img1} alt="bags" className="h-full w-full" />
          <img src={img2} alt="music" className="h-full w-full" />
        </div>
      </div>
      {/* Categories Slider */}
      <div className="pt-80 md:pt-20">
        <div className="relative h-80 overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ 
              transform: `translateX(-${currentCategorySlide * (100 / Math.min(allCategories.length, 6))}%)`,
              width: `${allCategories.length * (100 / Math.min(allCategories.length, 6))}%`
            }}
          >
            {allCategories.map((categories, index) => (
              <div 
                key={categories._id} 
                className="flex-shrink-0"
                style={{ width: `${100 / Math.min(allCategories.length, 6)}%` }}
              >
                <img
                  className="w-full h-60 object-cover"
                  src={categories.image}
                  alt={categories.name}
                />
                <p className="text-xl text-center font-semibold">
                  {categories.name}
                </p>
              </div>
            ))}
          </div>
          {/* Category Slider Dots */}
          {allCategories.length > 0 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {Array.from({ length: Math.min(allCategories.length, 6) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCategorySlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentCategorySlide === index ? 'bg-green-500' : 'bg-green-500/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Products />
    </div>
  );
}
