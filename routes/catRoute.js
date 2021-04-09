'use strict';
// catRoute
const express = require('express');
const multer  = require('multer');
const catController = require('../controllers/catController');
const router = express.Router();
const { body } = require('express-validator');

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || 'image/png' || 'image/gif' ){
    cb(null, true);
  } else {
    cb(null, false);
  }
}
const upload = multer({ dest: 'uploads/', fileFilter });

router.get('/', catController.cat_list_get);
router.post('/', upload.single('cat'),
    body('name').isLength({ min: 1 }),
    body('age').isLength({min: 1}).isNumeric(),
    body('weight').isLength({min: 1}).isNumeric(),
    body('owner').isLength({min: 1}).isNumeric(),
    catController.cat_create);

router.get('/:id', catController.cat_get_by_id);
router.put('/:id', catController.cat_update);
router.delete('/:id', catController.cat_delete);

module.exports = router;
