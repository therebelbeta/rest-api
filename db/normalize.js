const fieldMapping = {
  drgDefinition: 'DRG Definition',
  id: 'Provider Id',
  name: 'Provider Name',
  streetAddress: 'Provider Street Address',
  city: 'Provider City',
  state: 'Provider State',
  zipCode: 'Provider Zip Code',
  hospitalReferralRegionDescription: 'Hospital Referral Region Description',
  totalDischarges: 'Total Discharges',
  averageCoveredCharges: 'Average Covered Charges',
  averageTotalPayments: 'Average Total Payments',
  averageMedicarePayments: 'Average Medicare Payments'
}
module.exports = (data) => data.map(normalizeProvider)

function normalizeProvider (provider) {
  const normalizedData = {}
  for (let key of Object.keys(provider.dataValues)) {
    const value = provider[key]
    normalizedData[fieldMapping[key]] = value
  }
  return normalizedData
}
