const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware.js')
const handlerValidationErrors = require('../middlewares/handlerValidationErrors.js')
const apiValidation = require("../validations/apiValidation.js")
const apiController = require('../controller/apiController.js')

router.use(authMiddleware);

router.post('/transaction-history/:id',
    apiValidation.transactionHistoryValidationRules,
    handlerValidationErrors,
    apiController.createTransactionHistory
);

router.get('/flow-transaction', apiController.getFlowData);
router.get('/transaction-history',apiController.getTotalTransactionHistory);
router.get('/specific-transaction-history',apiController.getSpecificTransactionHistory);
router.get('/getCategory',apiController.getCategory);

module.exports = router




