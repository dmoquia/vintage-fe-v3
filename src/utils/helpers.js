// flatten function
// export function flattenProducts(data) {
//   return Object.values(data)?.map((item) => {
//     let resItem = item?.attributes;
//     let resImage = item?.attributes?.image?.data?.attributes?.url;
//     // cloudinary
//     // let image = item.image.url // <- from this
//     // let image = (item.image && item.image.url) || null; // <- to this
//     let image = (resItem && resImage) || null; // <- to this

//     // local setup no deployment
//     // let image = `${url}${item.image.url}`
//     return { ...item, image };
//   });
// }

// export function flattenProducts(data) {
//   console.log(data);
//   const { id, attributes } = data.data;
//   const { title, price, description, featured } = attributes;
//   const image = attributes?.image?.data?.attributes?.url || null;

//   return [{ id, title, price, description, featured, image }];
// }

export function flattenProducts(data) {
  const flatData = [];
  data.data.forEach((item) => {
    let { url } = item.attributes.image.data.attributes;
    console.log(url);
    const flatItem = {
      id: item.id,
      title: item.attributes.title,
      price: item.attributes.price,
      description: item.attributes.description,
      featured: item.attributes.featured,
      image: url,
      category: item.attributes.category,
      shipping: item.attributes.free_shipping,
    };
    flatData.push(flatItem);
  });
  return flatData;
}

// helper functions
export function featuredProducts(data) {
  return data.filter((item) => {
    return item.featured === true;
  });
}

export function paginate(products) {
  const itemsPerPage = 4;
  // const numberOfPage = products.length / itemsPerPage;
  const numberOfPage = Math.ceil(products.length / itemsPerPage);

  // const newProducts = Array.from({ length: numberOfPage }, () => {
  //   return products.slice(0, itemsPerPage);
  // });

  const newProducts = Array.from({ length: numberOfPage }, (_, index) => {
    const start = index * itemsPerPage;
    return products.slice(start, start + itemsPerPage);
  });

  return newProducts;
}
