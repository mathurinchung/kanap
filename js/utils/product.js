class Product {
  async getProduct({ _id, color, quantity }) {
    const product = await api.get(`/products/${_id}`);
    return { ...product, _id, color, quantity };
  }
}