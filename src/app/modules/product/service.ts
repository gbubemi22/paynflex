import { NotFoundError } from "../../utils/error.js";
import Product, { ProductDataType } from "./model.js";

export const create = async (payload: ProductDataType) => {
  const product = await Product.create(payload);

  return {
    success: true,
    message: `Product Created Successful`,
    data: product.toJSON(),
  };
};


export const list = async () => {
     const products = await Product.find({});
   
     return {
       success: true,
       message: `Business Fetched`,
       data: products,
     };
   };
   
   export const listOne = async (id: string) => {
     const product = await Product.findById(id);
     if (!product) throw new NotFoundError(`Business not found`);
   
     return {
       success: true,
       message: `Business Fetched`,
       data: product,
     };
   };

