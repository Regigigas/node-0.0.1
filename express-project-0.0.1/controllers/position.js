const positionModel = require("../models/position.js");

module.exports = {
  addPosition(req, res) {
    const { company, position, salary, address } = req.body;

    positionModel.addPosition(company, position, salary, address, (err) => {
      res.json({
        ret: true,
        data: {
          inserted: !err
        }
      })
    })
  },

  getPositionList(req, res) {
    const { page, size } = req.query;
    let totalPage = 0;
    positionModel.getPosition({}, (result) => {
      if (result && result !== "error") {
        totalPage = Math.ceil(result.length / size)
        positionModel.getPositionByPage(page, size, (result) => {
          res.json({
            ret: true,
            data: {
              list: result,
              totalPage: totalPage
            }
          })
        })
      }
    });
  },

  getPosition(req, res) {
    positionModel.getPositionById(req.query.id, (result) => {
      res.json({
        ret: true,
        data: {
          info: (result && result !== 'error') ? result : false
        }
      })
    });
  },

  removePosition(req, res) {
    positionModel.removeItemById(req.query.id, (err) => {
      res.json({
        ret: true,
        data: {
          delete: !err
        }
      })
    })
  },

  updatePosition(req, res) {
    const { company, position, salary, address, id } = req.body;

    positionModel.updatePositionById(id, {
      company,
      position,
      salary,
      address
    }, (result) => {
      res.json({
        ret: true,
        data: {
          update: (result && result !== "error") ? true : false
        }
      })
    })
  }
}