import custModel from "../models/customer.models.js";

export default class Customer {
    getCustomers = async () => {
        try {
            let customer = await custModel.find()
            return customer
        } catch (error) {
            console.log(error)
            return null
        }
    }

    getCustomerById = async (id) => {
        try {
            let customer = await custModel.findOne({ _id: id })
            return customer
        } catch (error) {
            console.log(error)
            return null
        }
    }

    saveCustomer = async (customer) => {
        try {
            let result = await custModel.create(customer)
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }

    updateCustomer = async (id, customer) => {
        try {
            let result = await custModel.updateOne({ _id: id }, { $set: customer })
            return result
        } catch (error) {
            return null
        }
    }

    deleteCustomer = async (id) => {
        try {
            const customer = await custModel.findById(id);  
            if (!customer) {
                return 'Customer no encontrado';
            }
            await customer.remove();
            return 'Customer eliminado';
        } catch (error) {
            console.error('Error al eliminar el customer:', error);
            return 'Error al eliminar el customer';
        }
    }
}