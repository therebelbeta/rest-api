/* eslint camelcase: 0 */
const { Provider } = require('../db/models')
const normalizeData = require('../db/normalize')
const setProp = require('@f/set-prop')

module.exports = async function getProviders (req, res) {
  let {
    limit = 10,
    offset = 0,
    sort_by = 'id',
    sort_by_direction = 'DESC',
    max_average_total_payments,
    min_average_total_payments,
    max_discharges,
    min_discharges,
    max_average_covered_charges,
    min_average_covered_charges,
    max_average_medicare_payments,
    min_average_medicare_payments,
    state
  } = req.query

  let query = { limit, offset, order: [[sort_by, sort_by_direction]] }

  // apply filters
  if (max_discharges) {
    max_discharges = parseFloat(max_discharges)
    query = setProp('where.totalDischarges.$lte', query, max_discharges)
  }
  if (min_discharges) {
    min_discharges = parseFloat(min_discharges)
    query = setProp('where.totalDischarges.$gte', query, min_discharges)
  }
  if (max_average_covered_charges) {
    max_average_covered_charges = parseFloat(max_average_covered_charges)
    query = setProp('where.averageCoveredCharges.$lte', query, max_average_covered_charges)
  }
  if (min_average_covered_charges) {
    min_average_covered_charges = parseFloat(min_average_covered_charges)
    query = setProp('where.averageCoveredCharges.$gte', query, min_average_covered_charges)
  }
  if (max_average_medicare_payments) {
    max_average_medicare_payments = parseFloat(max_average_medicare_payments)
    query = setProp('where.averageMedicarePayments.$lte', query, max_average_medicare_payments)
  }
  if (min_average_medicare_payments) {
    min_average_medicare_payments = parseFloat(min_average_medicare_payments)
    query = setProp('where.averageMedicarePayments.$gte', query, min_average_medicare_payments)
  }
  if (max_average_total_payments) {
    max_average_total_payments = parseFloat(max_average_total_payments)
    query = setProp('where.averageTotalPayments.$lte', query, max_average_total_payments)
  }
  if (min_average_total_payments) {
    min_average_total_payments = parseFloat(min_average_total_payments)
    query = setProp('where.averageTotalPayments.$gte', query, min_average_total_payments)
  }
  if (state) query = setProp('where.state', query, state)

  // run query
  let { rows: providers, count } = await Provider.findAndCountAll(query)

  // convert camelCase field names to the normal terms
  providers = normalizeData(providers)

  res.setHeader('X-Total-Count', count)
  res.setHeader('X-Pagination-Limit', limit)
  res.setHeader('X-Pagination-Offset', offset)
  res.setHeader('X-Pagination-Sort-By', sort_by)
  res.setHeader('X-Pagination-Sort-By-Direction', sort_by_direction)

  // return results
  return providers
}
