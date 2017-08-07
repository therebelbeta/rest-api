const test = require('ava')
const mock = require('mock-require')
const { isObject } = require('lodash')

mock('../db/models', {
  Provider: {
    findAndCountAll: (query) => {
      return {
        count: 12345,
        rows: query // return the raw query rather than data, for introspection
      }
    }
  }
})
mock('../db/normalize', (data) => data) // data normalization isn't needed since we're mocking response for introspection

const res = { setHeader: () => null } // return null for this, it's just setting headers for response

const getProviders = require('./getProviders')

test('should return a valid JSON object', async t => {
  const req = { query: {}, reqLogger: { requestId: 1234 } }
  const result = await getProviders(req, res)
  t.truthy(isObject(result), 'Did not return data results') // micro converts js objects to json automatically, just check if object
})

test('should return providers in data', async t => {
  const req = { query: {}, reqLogger: { requestId: 1234 } }
  const result = await getProviders(req, res)
  t.truthy(result, 'Did not return data results')
})

test('should query with max_average_total_payments', async t => {
  const req = { query: { max_average_total_payments: 123 }, reqLogger: { requestId: 1234 } }
  const result = await getProviders(req, res)
  t.is(result.where.averageTotalPayments.$lte, req.query.max_average_total_payments, 'Did not filter by max_average_total_payments')
})

test('should query with min_average_total_payments', async t => {
  const req = { query: { min_average_total_payments: 123 }, reqLogger: { requestId: 1234 } }
  const result = await getProviders(req, res)
  t.is(result.where.averageTotalPayments.$gte, req.query.min_average_total_payments, 'Did not filter by min_average_total_payments')
})

test('should query with max_discharges', async t => {
  const req = { query: { max_discharges: 123 }, reqLogger: { requestId: 1234 } }
  const result = await getProviders(req, res)
  t.is(result.where.totalDischarges.$lte, req.query.max_discharges, 'Did not filter by max_discharges')
})

test('should query with min_discharges', async t => {
  const req = { query: { min_discharges: 123 }, reqLogger: { requestId: 1234 } }
  const result = await getProviders(req, res)
  t.is(result.where.totalDischarges.$gte, req.query.min_discharges, 'Did not filter by min_discharges')
})

test('should query with max_average_covered_charges', async t => {
  const req = { query: { max_average_covered_charges: 123 }, reqLogger: { requestId: 1234 } }
  const result = await getProviders(req, res)
  t.is(result.where.averageCoveredCharges.$lte, req.query.max_average_covered_charges, 'Did not filter by max_average_covered_charges')
})

test('should query with min_average_covered_charges', async t => {
  const req = { query: { min_average_covered_charges: 123 }, reqLogger: { requestId: 1234 } }
  const result = await getProviders(req, res)
  t.is(result.where.averageCoveredCharges.$gte, req.query.min_average_covered_charges, 'Did not filter by min_average_covered_charges')
})

test('should query with max_average_medicare_payments', async t => {
  const req = { query: { max_average_medicare_payments: 123 }, reqLogger: { requestId: 1234 } }
  const result = await getProviders(req, res)
  t.is(result.where.averageMedicarePayments.$lte, req.query.max_average_medicare_payments, 'Did not filter by max_average_medicare_payments')
})

test('should query with min_average_medicare_payments', async t => {
  const req = { query: { min_average_medicare_payments: 123 }, reqLogger: { requestId: 1234 } }
  const result = await getProviders(req, res)
  t.is(result.where.averageMedicarePayments.$gte, req.query.min_average_medicare_payments, 'Did not filter by min_average_medicare_payments')
})

test('should query with state', async t => {
  const req = { query: { state: 'CA' }, reqLogger: { requestId: 1234 } }
  const result = await getProviders(req, res)
  t.is(result.where.state, req.query.state, 'Did not filter by state')
})
