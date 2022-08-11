import { compose, EnhancerBuilder } from "@uniformdev/canvas";
import {
  cloudinaryEnhancer,
  CLOUDINARY_PARAMETER_TYPES,
} from "@uniformdev/canvas-cloudinary";

import {
  createBigCommerceClient,
  createBigCommerceEnhancer,
  CANVAS_BIGCOMMERCE_PARAMETER_TYPES,
} from "@uniformdev/canvas-bigcommerce";

export const bigCommerceClient = createBigCommerceClient({
  storeHash: process.env.BIG_COMM_STORE_HASH,
  token: process.env.BIG_COMM_ACCESS_TOKEN,
});

// export const bigCommerceEnhancer = () => {
//   createBigCommerceEnhancer({
//     client: bigCommerceClient,
//     createProductOptions: () => {
//       return {
//         include_fields: ["id", "name", "price"],
//       };
//     },
//   });
// };

export const bigCommerceEnhancer = createBigCommerceEnhancer({
  client: createBigCommerceClient({
    storeHash: process.env.BIG_COMM_STORE_HASH,
    token: process.env.BIG_COMM_ACCESS_TOKEN,
  }),
  createProductOptions: () => {
    return {
      include_fields: ["id", "name", "price"],
    };
  },
  createProductQueryOptions: () => {
    return {
      include_fields: ["id", "name", "price"],
    };
  },
});

export const bigCommerceModelCleaner = ({ parameter }) => {
  const { id, name, price, images } = parameter.value;

  parameter.value = {
    id,
    name,
    price,
    image: images[0].url_standard,
  };

  return parameter.value;
};

export const enhancers = new EnhancerBuilder()
  .parameterType(CLOUDINARY_PARAMETER_TYPES, cloudinaryEnhancer)
  .parameterType(
    CANVAS_BIGCOMMERCE_PARAMETER_TYPES,
    compose(bigCommerceEnhancer, bigCommerceModelCleaner)
  );
