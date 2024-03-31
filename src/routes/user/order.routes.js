const express = require('express');
const orderRoute = express.Router();
const { userVerifyToken } = require('../../helpers/verifyToken');
const {
    addNewOrder,
    getAllOrders,
    getOrder,
    deleteOrder
} = require('../../controller/user/order.controller');

orderRoute.post('/add-New-Order',userVerifyToken, addNewOrder);
orderRoute.get('/get-All-Order',userVerifyToken, getAllOrders);
orderRoute.get('/get-Order',userVerifyToken, getOrder);
orderRoute.delete('/delete-Order',userVerifyToken, deleteOrder);

module.exports = orderRoute;