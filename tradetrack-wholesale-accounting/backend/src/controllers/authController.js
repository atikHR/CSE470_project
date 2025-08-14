const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { owner } = require("../models/prismaClient");

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Validate input
		if (!email || !password) {
			return res.status(400).json({ message: "Email and password are required" });
		}

		// Find user by email
		const user = await owner.findUnique({
			where: { email }
		});

		if (!user) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		// Check password
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		// Generate JWT token
		const token = jwt.sign(
			{ 
				userId: user.id, 
				email: user.email,
				name: user.name 
			},
			process.env.JWT_SECRET,
			{ expiresIn: "24h" }
		);

		// Return user info (without password) and token
		const { password: _, ...userWithoutPassword } = user;
		
		res.status(200).json({
			message: "Login successful",
			user: userWithoutPassword,
			token
		});
	} catch (error) {
		console.error("Error during login:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

const register = async (req, res) => {
	try {
		const { name, email, password, phoneNumber, photoURL = "" } = req.body;

		// Validate input
		if (!name || !email || !password || !phoneNumber) {
			return res.status(400).json({ 
				message: "Name, email, password, and phone number are required" 
			});
		}

		// Check if user already exists
		const existingUser = await owner.findUnique({
			where: { email }
		});

		if (existingUser) {
			return res.status(400).json({ message: "User with this email already exists" });
		}

		// Check if phone number already exists
		const existingPhone = await owner.findUnique({
			where: { phoneNumber }
		});

		if (existingPhone) {
			return res.status(400).json({ message: "User with this phone number already exists" });
		}

		// Hash password
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		// Create new user
		const newUser = await owner.create({
			data: {
				name,
				email,
				password: hashedPassword,
				phoneNumber,
				photoURL
			}
		});

		// Generate JWT token
		const token = jwt.sign(
			{ 
				userId: newUser.id, 
				email: newUser.email,
				name: newUser.name 
			},
			process.env.JWT_SECRET,
			{ expiresIn: "24h" }
		);

		// Return user info (without password) and token
		const { password: _, ...userWithoutPassword } = newUser;
		
		res.status(201).json({
			message: "User registered successfully",
			user: userWithoutPassword,
			token
		});
	} catch (error) {
		console.error("Error during registration:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

const getProfile = async (req, res) => {
	try {
		const userId = req.user.userId; // From JWT middleware

		const user = await owner.findUnique({
			where: { id: userId }
		});

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Return user info without password
		const { password: _, ...userWithoutPassword } = user;
		
		res.status(200).json({
			user: userWithoutPassword
		});
	} catch (error) {
		console.error("Error getting profile:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

const updateProfile = async (req, res) => {
	try {
		const userId = req.user.userId; // From JWT middleware
		const { name, phoneNumber, photoURL } = req.body;

		const updatedUser = await owner.update({
			where: { id: userId },
			data: {
				...(name && { name }),
				...(phoneNumber && { phoneNumber }),
				...(photoURL && { photoURL })
			}
		});

		// Return user info without password
		const { password: _, ...userWithoutPassword } = updatedUser;
		
		res.status(200).json({
			message: "Profile updated successfully",
			user: userWithoutPassword
		});
	} catch (error) {
		console.error("Error updating profile:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

module.exports = {
	login,
	register,
	getProfile,
	updateProfile
};
