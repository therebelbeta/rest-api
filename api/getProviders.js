const logger = require('../lib/logger')

module.exports = async function healthcheck (req, res) {
  const {
    max_discharges, // The maximum number of Total Discharges
    min_discharges, // The minimum number of Total Discharges
    max_average_covered_charges, // The maximum Average Covered Charges
    min_average_covered_charges, // The minimum Average Covered Charges
    max_average_medicare_payments, // The maximum Average Medicare Payment
    min_average_medicare_payments, // The minimum Average Medicare Payment
    state // The exact state that the provider is from
  } = req.query
  logger.debug({max_discharges, min_discharges, max_average_covered_charges, min_average_covered_charges, max_average_medicare_payments, min_average_medicare_payments, state})
  return '👻'
}
