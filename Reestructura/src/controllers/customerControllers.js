import Customer from '../dao/classes/customer.dao.js'

const custService = new Customer()

export const getCustomers = async (req, res) => {
    let result = await custService.getCustomers()
    res.send({ status: "success", result: result })
}

export const getCustomerById = async (req, res) => {
    const { cid } = req.params
    let customer = await custService.getCustomerById(cid)
    res.send({ status: "success", result: customer })
}

export const saveCustomer = async (req, res) => {
    const customer = req.body
    let result = await custService.saveCustomer(customer)
    res.send({ status: "success", result: result })
}