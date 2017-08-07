const Sequelize = require('sequelize')
const db = require('./index.js')

// Model Definitions
const Provider = db.define('Provider_Summary', {
  drgDefinition: {
    type: Sequelize.STRING,
    field: 'drg_definition'
  },
  id: {
    type: Sequelize.STRING,
    field: 'id',
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    field: 'name'
  },
  streetAddress: {
    type: Sequelize.STRING,
    field: 'street_address'
  },
  city: {
    type: Sequelize.STRING,
    field: 'city'
  },
  state: {
    type: Sequelize.STRING,
    field: 'state'
  },
  zipCode: {
    type: Sequelize.STRING,
    field: 'zip_code'
  },
  hospitalReferralRegionDescription: {
    type: Sequelize.STRING,
    field: 'hospital_referral_region_description'
  },
  totalDischarges: {
    type: Sequelize.FLOAT,
    field: 'total_discharges'
  },
  averageCoveredCharges: {
    type: Sequelize.FLOAT,
    field: 'average_covered_charges'
  },
  averageTotalPayments: {
    type: Sequelize.FLOAT,
    field: 'average_total_payments'
  },
  averageMedicarePayments: {
    type: Sequelize.FLOAT,
    field: 'average_medicare_payments'
  }
}, {
  timestamps: false,
  paranoid: true,
  underscored: true,
  freezeTableName: true,
  tableName: 'Provider_Summary'
})

// Export
module.exports = {
  Provider
}
