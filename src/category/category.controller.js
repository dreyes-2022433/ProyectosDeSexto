import Category from './category.model.js'
import Products from '../products/products.model.js'

export const createCategory = async (req, res) => {
    try {
        let data = req.body;
        let category = new Category(data);
        await category.save();
        return res.send({ message: 'Category created successfully', category });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'General error', err });
    }
}

export const getAllCategories = async (req, res) => {
    try {
        const {limit = 20, skip= 0} = req.query;
        const categories = await Category.find()
        .skip(skip)
        .limit(limit)
        if(categories.length === 0) return res.status(404).send({ message: 'Categories not found',success: false });              
        return res.send({ 
            message: 'Categories found',
            categories 
        }
    )
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'General error', err })
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.body
        let data = req.body

        const category = await Category.findByIdAndUpdate(id, data, { new: true })
        if (!category) return res.status(404).send({ message: 'Category not found', success: false })
        return res.send({ message: 'Category updated successfully', category })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'General error', err })
    }
}

export const defaultCategory = async()=>{
    let defaultCategory = await Category.findOne({name:'Default'})
    if(!defaultCategory){
        defaultCategory = await Category.create({
            name: 'Default',
            description: 'Default category'
        })
    }
}



export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.body
        let defaultCategory = await Category.findOne({name: 'Default'})
        if(defaultCategory._id == id)return res.status(400).send({message: 'You can not delete the default Category'})
        const category = await Category.findByIdAndDelete(id)
        if (!category) return res.status(404).send({ message: 'Category not found', success: false })
        await Products.updateMany({category: id},{category: defaultCategory._id})
        return res.send({ message: 'Category deleted successfully', category })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'General error', err })
    }
}