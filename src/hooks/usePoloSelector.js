import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const usePoloSelector = () => {
  const { id } = useParams();
  const [bundle, setBundle] = useState(null);
  const [products, setProducts] = useState([]);
  // First product states
  const [selectedPoloShirts1, setSelectedPoloShirts1] = useState([]);
  const [selectedColors1, setSelectedColors1] = useState([]);
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isPoloShirtsOpen1, setIsPoloShirtsOpen1] = useState(false);
  const [quantities1, setQuantities1] = useState({});
  const [totalSelectedSizes1, setTotalSelectedSizes1] = useState(0);
  // Second product states
  const [selectedPoloShirts2, setSelectedPoloShirts2] = useState([]);
  const [selectedColors2, setSelectedColors2] = useState([]);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isPoloShirtsOpen2, setIsPoloShirtsOpen2] = useState(false);
  const [quantities2, setQuantities2] = useState({});
  const [totalSelectedSizes2, setTotalSelectedSizes2] = useState(0);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchBundle = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${apiUrl}/bundle/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to fetch bundle');
        
        const data = await response.json();
        console.log('API Response:', data);

        if (data.bundle) {
          setBundle(data.bundle);
          setProducts(data.bundle.products || []);
        }
      } catch (error) {
        console.error('Error fetching bundle:', error);
      }
    };

    fetchBundle();
  }, [id]);

  // Get product by index
  const getProduct = (index) => {
    return products[index] || null;
  };

  // Calculate total selected sizes for a product
  const calculateTotalSizes = (quantities) => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  };

  // Handlers for first product
  const handleSelectProduct1 = (product, type) => {
    if (type === 'polo' && selectedPoloShirts1.length < 1) {
      setSelectedPoloShirts1([product]);
    }
  };

  const handleColorChange1 = (color) => {
    if (!selectedColors1.includes(color)) {
      setSelectedColors1([...selectedColors1, color]);
    }
    setIsDropdownOpen1(false);
  };

  const handleQuantityChange1 = (size, delta, color) => {
    const key = `${color}-${size}`;
    const newQuantity = (quantities1[key] || 0) + delta;
    const newTotal = totalSelectedSizes1 + delta;

    if (newTotal <= 3 && newQuantity >= 0) {
      setQuantities1({
        ...quantities1,
        [key]: newQuantity
      });
      setTotalSelectedSizes1(newTotal);
    }
  };

  const toggleDropdown1 = () => {
    setIsDropdownOpen1(!isDropdownOpen1);
  };

  const togglePoloShirtsSection1 = () => {
    setIsPoloShirtsOpen1(!isPoloShirtsOpen1);
  };

  // Handlers for second product
  const handleSelectProduct2 = (product, type) => {
    if (type === 'polo' && selectedPoloShirts2.length < 1) {
      setSelectedPoloShirts2([product]);
    }
  };

  const handleColorChange2 = (color) => {
    if (!selectedColors2.includes(color)) {
      setSelectedColors2([...selectedColors2, color]);
    }
    setIsDropdownOpen2(false);
  };

  const handleQuantityChange2 = (size, delta, color) => {
    const key = `${color}-${size}`;
    const newQuantity = (quantities2[key] || 0) + delta;
    const newTotal = totalSelectedSizes2 + delta;

    if (newTotal <= 3 && newQuantity >= 0) {
      setQuantities2({
        ...quantities2,
        [key]: newQuantity
      });
      setTotalSelectedSizes2(newTotal);
    }
  };

  const toggleDropdown2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
  };

  const togglePoloShirtsSection2 = () => {
    setIsPoloShirtsOpen2(!isPoloShirtsOpen2);
  };

  return {
    bundle,
    products,
    getProduct,
    // First product states and handlers
    selectedPoloShirts1,
    selectedColors1,
    isDropdownOpen1,
    isPoloShirtsOpen1,
    quantities1,
    totalSelectedSizes1,
    handleSelectProduct1,
    handleColorChange1,
    handleQuantityChange1,
    toggleDropdown1,
    togglePoloShirtsSection1,
    // Second product states and handlers
    selectedPoloShirts2,
    selectedColors2,
    isDropdownOpen2,
    isPoloShirtsOpen2,
    quantities2,
    totalSelectedSizes2,
    handleSelectProduct2,
    handleColorChange2,
    handleQuantityChange2,
    toggleDropdown2,
    togglePoloShirtsSection2,
  };
};