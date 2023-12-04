import saleModel from "../models/sale.models.js";

export default class Sale {
    getSales = async () => {
        try {
            let sale = await saleModel.find()
            return sale
        } catch (error) {
            console.log(error)
            return null
        }
    }

    getSaleById = async (id) => {
        try {
            let sale = await saleModel.findOne({ _id: id })
            return sale
        } catch (error) {
            console.log(error)
            return null
        }
    }

    saveSale = async (sale) => {
        try {
            let result = await saleModel.create(sale)
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }

    updateSale = async (id, sale) => {
        try {
            let result = await saleModel.updateOne({ _id: id }, { $set: sale })
            return result
        } catch (error) {
            return null
        }
    }

    deleteSale = async (id) => {
        try {
            const sale = await saleModel.findById(id);  
            if (!sale) {
                return 'Seller no encontrado';
        }
        await sale.remove();
        return 'Sale eliminada';
        } catch (error) {
            console.error('Error al eliminar sale:', error);
            return 'Error al eliminar sale';
        }
    }
}