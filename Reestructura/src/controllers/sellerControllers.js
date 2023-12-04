import Seller from '../dao/classes/seller.dao.js'

const sellerService = new Seller()

export const getSellers = async (req, res) => {
    let result = await sellerService.getSellers()
    res.send({ status: "success", result: result })
}

export const getSellerById = async (req, res) => {
    const { sid } = req.params
    let seller = await sellerService.getSellerById(sid)
    res.send({ status: "success", result: seller })
}

export const saveSeller = async (req, res) => {
    const seller = req.body
    let result = await sellerService.saveSeller(seller)
    res.send({ status: "success", result: result })
}