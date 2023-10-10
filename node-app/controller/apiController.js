const { StatusCodes } = require("http-status-codes");
const { ExpTransactionHistory, sequelize, Sequelize } = require("../models");


createTransactionHistory = async (req, res) => {
    try {
        const createExpTransaction = await ExpTransactionHistory.create({
            userId: req.user.id,
            categoryId: req.params.id,
            amount: req.body.amount
        });

        return res.status(StatusCodes.CREATED).send({
            status: true,
            msg: "Transaction History!! Created Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.BAD_REQUEST).send({
            status: false,
            msg: "ExpTransactionHistory!! Error"
        })
    }
}

getFlowData = async (req, res) => {
    try {
        const query = "SELECT SUM(exptransactionhistories.amount) AS amount , categories.action AS action FROM exptransactionhistories INNER JOIN categories ON exptransactionhistories.categoryId = categories.id WHERE  userId = :userId GROUP BY action ORDER BY action ASC"

        const getFlow = await sequelize.query(query, {
            replacements: {
                userId: req.user.id
            },
            type: Sequelize.QueryTypes.SELECT,
        })

        return res.status(StatusCodes.ACCEPTED).send({
            status: true,
            flow: getFlow,
            msg: "getFlow !! successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.BAD_REQUEST).send({
            status: false,
            msg: "can't get transaction flow "
        })
    }

}

getTotalTransactionHistory = async (req, res) => {
    try {
        let query = "SELECT categories.name,categories.action,exptransactionhistories.amount, DATE_FORMAT(exptransactionhistories.updatedAt, '%e-%b-%y') AS date  FROM `exptransactionhistories` INNER JOIN categories ON exptransactionhistories.categoryId = categories.id where userId = :userId";
        const [getExpTransactionHistory] = await sequelize.query(query, {
            replacements: {
                userId: req.user.id
            },
            type: Sequelize.DataTypes.SELECT
        });

        return res.status(StatusCodes.ACCEPTED).send({
            status: true,
            getExpTransactionHistory: getExpTransactionHistory,
            msg: "getExpenses Transaction History!! successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.BAD_REQUEST).send({
            status: false,
            msg: "getExpenses Transaction History!! Error"
        })
    }
}

getSpecificTransactionHistory = async (req, res) => {
    try {
        let startDate = req.query.startDate + " 00:00:00"
        let endDate = req.query.endDate + " 23:59:59"

        let query = 'SELECT categories.id AS categoryId , categories.name as categoryName , categories.action AS categoryAction , exptransactionhistories.amount AS expAmount, exptransactionhistories.createdAt AS createdAt FROM categories INNER JOIN exptransactionhistories ON exptransactionhistories.categoryId = categories.id where userId = :userId AND exptransactionhistories.createdAt >= :startDate AND exptransactionhistories.createdAt <= :endDate'

        const getTransaction = await sequelize.query(query, {
            replacements: {
                startDate: startDate,
                endDate: endDate,
                userId: req.user.id
            },
            type: Sequelize.QueryTypes.SELECT,
        });

        let flowQuery = 'SELECT  categories.action,SUM(exptransactionhistories.amount) AS amount from categories INNER JOIN exptransactionhistories ON exptransactionhistories.categoryId = categories.id WHERE userId = :userId AND exptransactionhistories.createdAt >= :startDate AND exptransactionhistories.createdAt <= :endDate GROUP BY categories.action'

        const getFlow = await sequelize.query(flowQuery, {
            replacements: {
                startDate: startDate,
                endDate: endDate,
                userId: req.user.id
            },
            type: Sequelize.QueryTypes.SELECT,
        });

        return res.status(StatusCodes.ACCEPTED).send({
            status: true,
            data: { getFlow, getTransaction },
            msg: ""
        })

    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.BAD_REQUEST).send({
            status: false,
            msg: ""
        })
    }
}

getCategory = async (req, res) => {
    try {
        let query = "SELECT  id , name,action FROM categories ";
        const [getCategory] = await sequelize.query(query, {
            type: Sequelize.DataTypes.SELECT
        });

        return res.status(StatusCodes.ACCEPTED).send({
            status: true,
            getCategory: getCategory,
            msg: "getCategory !! successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.BAD_REQUEST).send({
            status: false,
            msg: "getCategory !! Error"
        })
    }
}


module.exports = {
    createTransactionHistory,
    getFlowData,
    getTotalTransactionHistory,
    getSpecificTransactionHistory,
    getCategory
}