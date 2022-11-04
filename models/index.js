// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, { 
  through: {
  model: ProductTag,
  //field referenced in the association must have a unique constraint placed on it. 
  unique: false
  },
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, { 
  through: {
    model: ProductTag,
    //field referenced in the association must have a unique constraint placed on it. 
    unique: false
  } 
});


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
