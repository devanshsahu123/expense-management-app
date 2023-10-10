const { body,param } = require("express-validator");
const { category } = require("../models");

transactionHistoryValidationRules =[
param('id').toInt().isInt().withMessage("id must be integer")
.custom(async(id,{req})=>{
    const checkCategory = await category.count({
        where:{
            id:id
        }
    })
    if(checkCategory == 0) return false
    console.log(req.body.amount, "am");
    return true
}).withMessage("category !! not exist"),

body('amount').toInt().isInt().withMessage('amount must be integer')
]

module.exports ={
    transactionHistoryValidationRules,
}