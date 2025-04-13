import { AppDataSource } from "../database"; // adjust path to your DataSource
import { User, UserRole } from "../model/user";
import { Property, PropertyType, PropertyStatus } from "../model/property";
import { Lead, LeadStatus, LeadSource } from "../model/lead";
import bcrypt from "bcrypt";

const seed = async () => {
  await AppDataSource.initialize();

  console.log("Seeding started...");

  // Seed Users
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = User.create({
    name: "Admin User",
    email: "admin@example.com",
    password: hashedPassword,
    phone: "0771234567",
    role: UserRole.ADMINISTRATOR,
  });
  await admin.save();

  // Seed Properties
  const property1 = Property.create({
    title: "Luxury Villa",
    location: "Colombo",
    price: 45000000,
    type: PropertyType.HOUSE,
    status: PropertyStatus.AVAILABLE,
  });

  const property2 = Property.create({
    title: "Ocean View Condo",
    location: "Galle",
    price: 32000000,
    type: PropertyType.CONDO,
    status: PropertyStatus.AVAILABLE,
  });

  await property1.save();
  await property2.save();

  // Seed Leads
  const lead1 = Lead.create({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "0771234567",
    source: LeadSource.ZILLOW,
    inquiryDate: new Date(),
    status: LeadStatus.UNASSIGNED,
  });

  await lead1.save();

  console.log("Seeding completed.");
  process.exit();
};

seed().catch((error) => {
  console.error("Error while seeding:", error);
  process.exit(1);
});
