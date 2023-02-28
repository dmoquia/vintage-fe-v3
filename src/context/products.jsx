import React from "react";
import axios from "axios";
import url from "../utils/URL";
import { featuredProducts, flattenProducts, paginate } from "../utils/helpers";

export const ProductContext = React.createContext();

// useEffect();
// let's perform side effect - data fetching, window event listener
// by default runs after every render
// cb as first parameter
// returns cleanup function to avoid memory leaks, so it cannot be async
// second argument - array of values(dependencies)

// Provider, Consumer, useContext()
export default function ProductProvider({ children }) {
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [featured, setFeatured] = React.useState([]);

  // extra state values
  const [sorted, setSorted] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [filters, setFilters] = React.useState({
    search: "",
    category: "all",
    shipping: false,
    price: "all",
  });

  // React.useEffect(() => {
  //   setLoading(true);
  //   axios.get(`${url}/api/products?populate=*`).then((response) => {
  //     const features = featuredProducts(flattenProducts(response.data));
  //     const products = flattenProducts(response.data);
  //     setSorted(paginate(products));
  //     setProducts(products);
  //     setFeatured(features);
  //     setLoading(false);
  //   });

  //   return () => {};
  // }, []);
  React.useEffect(() => {
    setLoading(true);
    async function getProduct() {
      try {
        const res = await axios.get(`${url}/api/products?populate=*`);
        const features = featuredProducts(flattenProducts(res.data));
        const products = flattenProducts(res.data);
        setSorted(paginate(products));
        setProducts(products);
        setFeatured(features);
        setLoading(false);
        console.log(res.data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }

    getProduct();
    return () => {};
  }, []);

  React.useEffect(() => {
    // let newProducts = [...products].sort((a, b) => a.price - b.price);
    let newProducts = [...products].sort();

    const { search, category, shipping, price } = filters;

    // logic
    // console.log(newProducts[0]);
    if (category !== "all") {
      newProducts = newProducts.filter((item) => item.category === category);
    }
    if (shipping !== false) {
      newProducts = newProducts.filter((item) => item.shipping === shipping);
    }
    if (search !== "") {
      newProducts = newProducts.filter((item) => {
        let title = item.title.toLowerCase().trim();
        return title.startsWith(search) ? item : null;
      });
    }
    if (price !== "all") {
      newProducts = newProducts.filter((item) => {
        if (price === 0) {
          return item.price < 300;
        } else if (price === 300) {
          return item.price > 300 && item.price < 650;
        } else {
          return item.price > 650;
        }
      });
    }
    setPage(0);
    setSorted(paginate(newProducts));
  }, [filters, products]);

  const changePage = (index) => {
    setPage(index);
  };
  const updateFilters = (e) => {
    const type = e.target.type;
    const filter = e.target.name;
    const value = e.target.value;
    let filterValue;
    if (type === "checkbox") {
      filterValue = e.target.checked;
    } else if (type === "radio") {
      value === "all" ? (filterValue = value) : (filterValue = parseInt(value));
    } else {
      filterValue = value;
    }

    setFilters({ ...filters, [filter]: filterValue });
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        featured,
        sorted,
        page,
        filters,
        changePage,
        updateFilters,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
