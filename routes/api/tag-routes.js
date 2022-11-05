const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll(
      { include: [{model: Product, through: ProductTag}] }
      );

    if (!tagData) {
      res.status(404).json("Tags not found");
    } else {
      res.status(200).json(tagData);
    }
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, { include: [{model: Product, through: ProductTag}] });

    if (!tagData) {
      res.status(404).json("Tag not found");
    } else {
      res.status(200).json(tagData);
    }
    } catch (err) {
      res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    console.log("tagdata.id =" + tagData.id);

    if(req.body.productIds.length) {
      /* set up product - tag pairs with each product_id and the new tag_id */
      const tag_id = tagData.id;
      for (const productId of req.body.productIds) {
        /* create the product tag pair in the ProductTag table */
        let productTagData = await ProductTag.create({product_id: productId, tag_id: tag_id});
      }
    }
    if (!tagData) {
      res.status(404).json("Tag not created");
    } else {
      res.status(200).json(tagData);
    }
    } catch (err) {
      res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(
      {tag_name: req.body.tag_name}, 
      {
        where: {
          id: req.params.id,
        },
      });

    /* If there are product_ids in the request to be associated with this tag */
    if(req.body.productIds.length) {

      /* find the existing product-tag pairs for this tag id and destroy */
      let productTagData = await ProductTag.destroy({
        where: {
          tag_id: req.params.id,
        }
      });

      /* set up product - tag pairs with each product_id from the request and the tag_id */
      const tag_id = req.params.id;
      for (const productId of req.body.productIds) {
        let productTagData = await ProductTag.create({product_id: productId, tag_id: tag_id});
      }
    }

    if (!tagData) {
      res.status(404).json("Tag not updated");
    } else {
      res.status(200).json(tagData);
    }
    } catch (err) {
      res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    /* destroy entries in the ProductTag table that have
    this tag_id */
    const productTagData = await ProductTag.destroy({
      where: {
        tag_id: req.params.id,
      }
    });
    console.log("productTagData = " + productTagData);

    /* Delete the tag_id from the Tag table */
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json("Tag not deleted");
    } else {
      res.status(200).json(tagData);
    }
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
