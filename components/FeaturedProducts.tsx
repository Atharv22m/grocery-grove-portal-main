
import { Button } from "@/components/ui/button";
import { ShoppingCart, ImageOff, ArrowUp, ArrowDown } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

export const products = [
  {
    id: "1",
    name: "Fortune Sunlite Refined Sunflower Oil",
    description: "Premium quality refined sunflower oil that's good for your health",
    price: 199,
    unit: "1L",
    image: "/images/sunflower oil.jpeg",
    category: "Oils & Ghee",
    rating: 4.5,
    stock: 15,
    weight: "1L"
  },
  {
    id: "2",
    name: "Tata Salt",
    description: "Iodized salt for your cooking needs, with essential minerals",
    price: 25,
    unit: "1kg",
    image: "/images/tata salt.jpeg",
    category: "Essentials",
    rating: 4.8,
    stock: 30,
    weight: "1kg"
  },
  {
    id: "3",
    name: "Aashirvaad Atta with Multigrains",
    description: "Superior quality multigrain flour for healthy rotis and breads",
    price: 325,
    unit: "5kg",
    image: "/images/aashirvaad atta.jpeg",
    category: "Flours & Grains",
    rating: 4.6,
    stock: 12,
    weight: "5kg"
  },
  {
    id: "4",
    name: "Saffola Active Refined Oil",
    description: "Heart-healthy cooking oil with balanced fatty acids",
    price: 215,
    unit: "1L",
    image: "/images/saffola oil.jpeg",
    category: "Oils & Ghee",
    rating: 4.4,
    stock: 18,
    weight: "1L"
  },
  {
    id: "5",
    name: "Maggi 2-Minute Noodles",
    description: "Quick and tasty instant noodles ready in 2 minutes",
    price: 72,
    unit: "pack of 6",
    image: "/images/maggi.jpg",
    category: "Instant Foods",
    rating: 4.7,
    stock: 25,
    discount: 10
  },
  {
    id: "6",
    name: "Daawat Basmati Rice - Premium",
    description: "Premium aged basmati rice with aromatic flavor",
    price: 299,
    unit: "1kg",
    image: "/images/daawat basmati.jpg",
    category: "Rice & Pulses",
    rating: 4.9,
    stock: 20,
    weight: "1kg"
  },
  {
    id: "7",
    name: "Bournvita Health Drink",
    description: "Chocolate malt drink rich in essential vitamins and minerals",
    price: 245,
    unit: "500g",
    image: "/images/bournvita.jpeg",
    category: "Beverages",
    rating: 4.3,
    stock: 14,
    weight: "500g"
  },
  {
    id: "8",
    name: "Red Label Tea",
    description: "Natural tea with refreshing aroma and taste",
    price: 170,
    unit: "500g",
    image: "/images/red label tea.jpg",
    category: "Beverages",
    rating: 4.5,
    stock: 22,
    weight: "500g",
    discount: 5
  },
];

export const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [displayedProducts, setDisplayedProducts] = useState([...products]);

  const handleAddToCart = async (productId: string) => {
    try {
      setLoadingProductId(productId);
      await addToCart(productId);
      toast.success("Item added to cart");
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      toast.error("Failed to add item to cart");
    } finally {
      setLoadingProductId(null);
    }
  };

  const handleImageError = (productId: string) => {
    setImageErrors(prev => ({
      ...prev,
      [productId]: true
    }));
  };

  const handleSort = (order: 'asc' | 'desc') => {
    setSortOrder(order);
    const sorted = [...products].sort((a, b) => {
      return order === 'asc' ? a.price - b.price : b.price - a.price;
    });
    setDisplayedProducts(sorted);
  };

  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by price:</span>
            <Button 
              variant={sortOrder === 'asc' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => handleSort('asc')}
              className={sortOrder === 'asc' ? 'bg-primary' : ''}
            >
              <ArrowUp className="h-4 w-4 mr-1" /> Low to High
            </Button>
            <Button 
              variant={sortOrder === 'desc' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => handleSort('desc')}
              className={sortOrder === 'desc' ? 'bg-primary' : ''}
            >
              <ArrowDown className="h-4 w-4 mr-1" /> High to Low
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow animate-fade-in"
            >
              <Link to={`/product/${product.id}`} className="block mb-4">
                <div className="mb-4 flex justify-center h-40">
                  {imageErrors[product.id] ? (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <ImageOff size={32} />
                      <p className="text-sm mt-2">Image not available</p>
                    </div>
                  ) : (
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="object-contain h-full w-full rounded-md"
                      onError={() => handleImageError(product.id)}
                    />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-primary">₹{product.price}</span>
                  <span className="text-sm text-gray-500">per {product.unit}</span>
                </div>
              </Link>
              <Button 
                className="w-full bg-primary hover:bg-primary-hover"
                onClick={() => handleAddToCart(product.id)}
                disabled={loadingProductId === product.id}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {loadingProductId === product.id ? "Adding..." : "Add to Cart"}
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/products">
            <Button className="bg-primary hover:bg-primary-hover">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
