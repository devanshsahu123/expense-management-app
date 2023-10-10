const { body,param } = require("express-validator");
const { category } = require("../models");

transactionHistoryValidationRules =[
param('id').toInt().isInt().withMessage("id must be integer")
.custom(async(id)=>{
    const checkCategory = await category.count({
        where:{
            id:id
        }
    })
    if(checkCategory == 0) return false
    return true
}).withMessage("category !! not exist"),

body('amount').toInt().isInt().withMessage('amount must be integer')
]

module.exports ={
    transactionHistoryValidationRules,
}