const extractProductManager = (productManager) => {
    return (req, res, next) => {
      req.productManager = productManager;
      next();
    };
  };

  module.exports = { extractProductManager };