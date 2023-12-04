import Sale from '../dao/classes/sale.dao.js'

const saleService = new Sale()

export const getSales = async (req, res) => {
    let result = await saleService.getSales()
    res.send({ status: "success", result: result })
}

export const getSaleById = async (req, res) => {
    const { sid } = req.params
    let sale = await saleService.getSaleById(sid)
    res.send({ status: "success", result: sale })
}

export const saveSale = async (req, res) => {
    const sale = req.body
    let result = await saleService.saveSale(sale)
    res.send({ status: "success", result: result })
}