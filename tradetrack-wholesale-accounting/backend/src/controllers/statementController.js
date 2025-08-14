const { statement, transaction } = require("../models/prismaClient");

const getStatements = async (req, res) => {
	try {
		const statements = await statement.findMany({
			include: {
				bankclient: {
					include: {
						bank: true
					}
				},
				owner: true
			},
			orderBy: {
				date: 'desc'
			}
		});
		res.status(200).json({ list: statements });
	} catch (error) {
		console.error("Error getting statements:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

const addStatement = async (req, res) => {
	try {
		const {
			accountNo,
			transactionType,
			reference,
			description,
			quantity = 1,
			rate = 0,
			debit = 0,
			credit = 0,
			bankclientid,
			addedby = 1 // Default owner ID
		} = req.body;

		const newStatement = await statement.create({
			data: {
				accountNo,
				transactionType,
				reference,
				description,
				quantity,
				rate,
				debit,
				credit,
				bankclientid,
				addedby
			}
		});

		res.status(201).json({ 
			message: "Statement added successfully!",
			statement: newStatement 
		});
	} catch (error) {
		console.error("Error adding statement:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

const getTransactions = async (req, res) => {
	try {
		const transactions = await transaction.findMany({
			include: {
				owner: true,
				bankclient: {
					include: {
						bank: true
					}
				},
				supplierinfo: true
			},
			orderBy: {
				date: 'desc'
			}
		});
		res.status(200).json({ list: transactions });
	} catch (error) {
		console.error("Error getting transactions:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

const addTransaction = async (req, res) => {
	try {
		const {
			transactionType,
			reference,
			description,
			quantity,
			credit = 0,
			debit = 0,
			balance = 0,
			addedby = 1, // Default owner ID
			bankclientid,
			supplierinfoid
		} = req.body;

		const newTransaction = await transaction.create({
			data: {
				transactionType,
				reference,
				description,
				quantity,
				credit,
				debit,
				balance,
				addedby,
				bankclientid,
				supplierinfoid
			}
		});

		res.status(201).json({ 
			message: "Transaction added successfully!",
			transaction: newTransaction 
		});
	} catch (error) {
		console.error("Error adding transaction:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

const getFilteredStatements = async (req, res) => {
	try {
		const { startDate, endDate, accountNo, transactionType } = req.body;
		
		let whereClause = {};
		
		if (startDate || endDate) {
			whereClause.date = {};
			if (startDate) whereClause.date.gte = new Date(startDate);
			if (endDate) whereClause.date.lte = new Date(endDate);
		}
		
		if (accountNo) {
			whereClause.accountNo = { contains: accountNo };
		}
		
		if (transactionType) {
			whereClause.transactionType = { contains: transactionType };
		}

		const filteredStatements = await statement.findMany({
			where: whereClause,
			include: {
				bankclient: {
					include: {
						bank: true
					}
				},
				owner: true
			},
			orderBy: {
				date: 'desc'
			}
		});

		// Calculate total balance
		const totalCredit = filteredStatements.reduce((sum, stmt) => sum + stmt.credit, 0);
		const totalDebit = filteredStatements.reduce((sum, stmt) => sum + stmt.debit, 0);
		const totalBalance = totalCredit - totalDebit;

		res.status(200).json({ 
			list: filteredStatements,
			summary: {
				totalCredit,
				totalDebit,
				totalBalance
			}
		});
	} catch (error) {
		console.error("Error filtering statements:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

module.exports = {
	getStatements,
	addStatement,
	getTransactions,
	addTransaction,
	getFilteredStatements
};
