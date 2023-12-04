import sellerModel from "../models/seller.models.js";

export default class Seller {
    getSellers = async () => {
        try {
            let seller = await sellerModel.find()
            return seller
        } catch (error) {
            console.log(error)
            return null
        }
    }

    getSellerById = async (id) => {
        try {
            let seller = await sellerModel.findOne({ _id: id })
            return seller
        } catch (error) {
            console.log(error)
            return null
        }
    }

    saveSeller = async (seller) => {
        try {
            let result = await sellerModel.create(seller)
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }

    updateSeller = async (id, seller) => {
        try {
            let result = await sellerModel.updateOne({ _id: id }, { $set: seller })
            return result
        } catch (error) {
            return null
        }
    }

    deleteSeller = async (id) =>{
        try {
            const seller = await sellerModel.findById(id);  
            if (!seller) {
            return 'Seller no encontrado';
            }
            await seller.remove();
            return 'Seller eliminado';
        } catch (error) {
            console.error('Error al eliminar el seller:', error);
            return 'Error al eliminar el seller';
        }
    }
}