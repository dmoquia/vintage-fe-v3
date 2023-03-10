import React from "react";
import { ProductContext } from "../../context/products";
const Filters = () => {
  const {
    filters: { search, category, price, shipping },
    updateFilters,
    sorted,
  } = React.useContext(ProductContext);

  return (
    <section className="filters-section">
      <h2 className="section-title">search product</h2>
      <form className="filters-form">
        <div>
          {/* search input */}
          <div className="form-group">
            <label htmlFor="search">search term</label>
            <input
              type="text"
              id="search"
              name="search"
              value={search}
              onChange={updateFilters}
              className="form-control"
            />
          </div>
          {/* end of search input */}
          {/* select category */}
          <div className="form-group">
            <label htmlFor="category" id="category">
              category:
            </label>
            <select
              name="category"
              id="category"
              value={category}
              onChange={updateFilters}
            >
              <option value="all">all</option>
              <option value="phone">phone</option>
              <option value="computer">computer</option>
            </select>
          </div>
          {/*end of select category */}
          {/* free shipping */}
          <div className="form-group">
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              checked={shipping}
              onChange={updateFilters}
            />
            <label htmlFor="shipping">free shipping</label>
          </div>
          {/* end free shipping */}
        </div>
        <div className="price-group">
          <p>price</p>
          <label>
            <input
              type="radio"
              name="price"
              value="all"
              checked={price === "all"}
              onChange={updateFilters}
            />
            all
          </label>
          <label>
            <input
              type="radio"
              name="price"
              value="0"
              checked={price === 0}
              onChange={updateFilters}
            />
            0 - $300
          </label>
          <label>
            <input
              type="radio"
              name="price"
              value="300"
              checked={price === 300}
              onChange={updateFilters}
            />
            300 - $650
          </label>
          <label>
            <input
              type="radio"
              name="price"
              value="650"
              checked={price === 650}
              onChange={updateFilters}
            />
            over $650
          </label>
        </div>
      </form>
      <h6>total product: {sorted.flat().length}</h6>
      <hr />
    </section>
  );
};

export default Filters;
