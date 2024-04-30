import axios from "axios";

const getTotalProducts = async () => {
  let skip = 0;
  let totalProducts = [];
  do {
    const res = await axios(`https://dummyjson.com/products?skip=${skip}&limit=10`);
    totalProducts = totalProducts.concat(res.data.products);
    skip += 10;
  } while (skip < 100);
  return totalProducts;
}

export const getRandomCart = async (req, res) => {
  /**
   * Haciendo pruebas con la API DummyJSON me dí cuenta que solo habían 20 
   * diferentes carritos, por eso el nro random que se genra está entre 1 y 20
   */
  const randomCartId = Math.floor(Math.random() * 20) + 1;
  const cartRes = await axios(`https://dummyjson.com/carts/${randomCartId}`);
  return res.status(200).json(cartRes.data);
}

export const checkCart = async (req, res) => {
  const { cart } = req.body;
  const totalProducts = await getTotalProducts();
  let aproved = true;
  const newCart = cart.map(product => {
    const productInStock = totalProducts.find(p => p.id === product.productId);
    productInStock.realStock = Math.floor(productInStock.stock / productInStock.rating);
    if (product.quantity > productInStock.realStock) {
      aproved = false;
    }
    return {
      ...product,
      name: productInStock.title,
      stock: productInStock.stock,
      rating: productInStock.rating,
      realStock: productInStock.realStock,

    };
  });
  console.log(newCart);
  return res.status(200).json({
    newCart,
    aproved,
  });

}

