const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();
require("dotenv").config();

async function main() {
    console.log('Starting database seeding...');

    // Create a default owner
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const ownerCount = await prisma.owner.count();
    if (ownerCount === 0) {
        const owner = await prisma.owner.create({
            data: {
                name: 'Admin User',
                email: 'admin@tradetrack.com',
                password: hashedPassword,
                phoneNumber: '+1234567890',
                photoURL: 'https://via.placeholder.com/150',
            }
        });
        console.log('Created default owner:', owner);

        // Create sample banks
        const bank1 = await prisma.bank.create({
            data: {
                bankName: 'Demo Bank',
                hotline: '123-456-7890',
                website: 'https://demobank.com',
                branchName: 'Main Branch',
                photoURL: 'https://via.placeholder.com/150',
            }
        });

        const bank2 = await prisma.bank.create({
            data: {
                bankName: 'Sample Credit Union',
                hotline: '098-765-4321',
                website: 'https://samplecu.com',
                branchName: 'Downtown Branch',
                photoURL: 'https://via.placeholder.com/150',
            }
        });

        console.log('Created sample banks');

        // Create product categories
        const category1 = await prisma.productCategory.create({
            data: {
                productCategory: 'Electronics',
                photoURL: 'https://via.placeholder.com/150',
            }
        });

        const category2 = await prisma.productCategory.create({
            data: {
                productCategory: 'Clothing',
                photoURL: 'https://via.placeholder.com/150',
            }
        });

        console.log('Created sample categories');

        // Create a sample bank client
        const bankClient = await prisma.bankClient.create({
            data: {
                name: 'John Doe',
                accountNo: 'ACC001',
                accountType: 'Savings',
                district: 'Dhaka',
                subDistrict: 'Dhanmondi',
                addedby: owner.id,
                bankid: bank1.id,
            }
        });

        console.log('Created sample bank client');
    }

    console.log('Database seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
