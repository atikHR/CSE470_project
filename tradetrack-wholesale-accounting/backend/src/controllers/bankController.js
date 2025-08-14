const bankModels = require("../models/bankModels");
const { bank } = require("../models/prismaClient");

const getBankList = async (req, res) => {
	try {
		const bankList = await bankModels.getBank();
		const result = { list: bankList };
		res.status(200).json(result);
	} catch (error) {
		console.error("Error getting bank list:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

const addBank = async (req, res) => {
	try {
		console.log(req.body);
		const { bank_name, hotline, website_link, branch_name } = req.body;
		const newBank = await bankModels.addBank(
			bank_name,
			hotline,
			website_link,
			branch_name // Updated field name
		);
		res.status(201).json({ message: "Bank Branch added!" });
	} catch (error) {
		console.error("Error adding bank branch:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

const deleteBank = async (req, res) => {
	const { bankName, hotline, website } = req.body;
	try {
		const result = await bankModels.deleteBank(bankName, hotline, website);
		res.status(200).json({ message: "Bank deleted!" });
	} catch (error) {
		console.error("Error deleting bank:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

const getBankAccountInfo = async (req, res) => {
	try {
		res.status(200).json(req.body);
	} catch (error) {
		console.error("Error getting bank account list:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

const getBankAccountList = async (req, res) => {
	try {
        const { bank_name, hotline, website_link } = req.body;
		const bankAccountList = await bankModels.getBankAccountList(bank_name, hotline, website_link);
		res.status(200).json({ list: bankAccountList });
	} catch (error) {
		console.error("Error getting bank account list:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

const addBankAccount = async (req, res) => {
	try {
		const { 
			name, 
			accountNo, 
			accountType = "Savings", 
			district, 
			subDistrict, 
			bankid,
			addedby = 1 // Default owner ID
		} = req.body;

		const newAccount = await bankModels.addBankAccount(
			name, 
			accountNo, 
			accountType, 
			district, 
			subDistrict, 
			bankid, 
			addedby
		);
		
		res.status(201).json({ message: "Bank account added successfully!" });
	} catch (error) {
		console.error("Error adding bank account:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

const getBankTransactions = async (req, res) => {
	try {
		const { accountNo } = req.body;
		const transactions = await bankModels.getBankTransactions(accountNo);
		res.status(200).json({ list: transactions });
	} catch (error) {
		console.error("Error getting bank transactions:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

const addBankTransaction = async (req, res) => {
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

		const newTransaction = await bankModels.addBankTransaction({
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
		});

		res.status(201).json({ 
			message: "Bank transaction added successfully!",
			transaction: newTransaction 
		});
	} catch (error) {
		console.error("Error adding bank transaction:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

module.exports = {
	getBankList,
	addBank,
	deleteBank,
	getBankAccountInfo,
	getBankAccountList,
	addBankAccount,
	getBankTransactions,
	addBankTransaction,
};