// submit order
import axios from "axios";
import url from "../utils/URL";

// async function submitOrder({ name, total, items, stripeTokenId, userToken }) {
//   const response = await axios
//     .post(
//       `${url}/api/orders`,

//       { name, total, items, stripeTokenId },
//       {
//         headers: {
//           Authorization: `Bearer ${userToken}`,
//         },
//       }
//     )
//     .catch((error) => console.log(error));
//   console.log(response);
//   return response;
// }

async function submitOrder({ name, total, items, stripeTokenId, userToken }) {
  try {
    const response = await axios.post(
      `${url}/api/orders`,
      // { data: { name, total, items, stripeTokenId } },
      { data: { name, total, items, stripeTokenId } },

      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}
export default submitOrder;
