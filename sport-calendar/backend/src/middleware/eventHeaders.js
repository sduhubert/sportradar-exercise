const parseEventHeaders = (req, res, next) => {
  req.filters = {
    sportId: req.headers['sport-id'] ? parseInt(req.headers['sport-id']) : null,
    dateFrom: req.headers['date-from'] ? new Date(req.headers['date-from']) : new Date(),
    count: req.headers['count'] ? parseInt(req.headers['count']) : 100
  };

  next();
};

module.exports = parseEventHeaders;