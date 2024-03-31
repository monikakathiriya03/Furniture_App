const Cart = require("../model/cart.model");
module.exports = class CartServices {
  async addToCart(body) {
    try {
      return await Cart.create(body);
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
  async getAllCarts(query, user) {
    try {
      let userCart =
        query.me && query.me === "true"
          ? [
              {
                $match: { user: user._id },
              },
            ]
          : [];
      let find = [
        { $match: { isDelete: false } },
        ...userCart,
        {
          $lookup: {
            from: "products",
            localField: "cartItem",
            foreignField: "_id",
            as: "cartItem",
          },
        },
        { $set: { "cartItem": { $first: "$cartItem" } } },
      ];
      let result = await Cart.aggregate(find);
    //   console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
  async getCart(query) {
    try {
      return await Cart.findOne(query).populate('user').populate('cartItem');
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
  async getCartById(id) {
    try {
      return await Cart.findById(id).populate('user').populate('cartItem');
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
  async updateCart(id, body) {
    try {
      return await Cart.findByIdAndUpdate(id, { $set: body }, { new: true });
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
  async updateMany(user, body) {
    try {
      return await Cart.updateMany(
        { user: user._id },
        { $set: body },
        { new: true }
      );
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
};
