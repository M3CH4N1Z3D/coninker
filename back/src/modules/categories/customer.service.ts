// Customer Service (Interacts with TypeORM Entity)

import { AppDataSource } from "../../database/data-source"; // Import AppDataSource
import { Customer } from "./entities/category.entity"; // Import Customer Entity
import { CreateCustomerDto } from "./dto/category.dto";
import { Company } from "../products/entities/product.entity"; // Import Company entity

export class CustomerService {
  private customerRepository = AppDataSource.getRepository(Customer);
  private companyRepository = AppDataSource.getRepository(Company); // Get Company repository

  async createCustomer(
    companyId: string,
    customerData: CreateCustomerDto
  ): Promise<Customer> {
    // Find the company entity
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    });
    if (!company) {
      throw new Error(`Company with ID ${companyId} not found.`);
    }

    const newCustomer = this.customerRepository.create({
      ...customerData,
      company: company, // Assign the company entity
    });

    await this.customerRepository.save(newCustomer);
    console.log("Saved new customer to database:", newCustomer);
    return newCustomer;
  }

  async getCustomersByCompany(companyId: string): Promise<Customer[]> {
    // Find customers related to the company, including the company relation
    return this.customerRepository.find({
      where: { company: { id: companyId } }, // Filter by company ID
      relations: ["company"], // Load the company relation
    });
  }

  // Add other methods like findById, update, delete later
}

// Export an instance of the service
export const customerService = new CustomerService();
