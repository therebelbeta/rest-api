const micro = require('micro')
const { router, get } = require('microrouter')

const { reqLogger } = require('./lib/reqLogger')
const { serviceName, port, isDev } = require('./settings')
const logger = require('./lib/logger')

const db = require('./db')

const healthCheck = require('./api/healthcheck')
const getProviders = require('./api/getProviders')

const app = micro(
  router(
    get('/internal/health', reqLogger(healthCheck)),
    get('/providers', reqLogger(getProviders))
  )
)
db.sync().then(() => {
  logger.info('Database connection has been established successfully. Starting HTTP server.')
  app.listen(port, function () {
    if (isDev) {
      logger.debug("LOG_LEVEL is set to include 'debug'. You'll be receiving more console output than usual")
      logger.info("LOG_LEVEL is set to include 'info'. You'll be receiving standard info output")
      logger.warning("LOG_LEVEL is set to include 'warning'. You'll be receiving warning output")
      logger.error("LOG_LEVEL is set to include 'error'. You'll be receiving error output")
    }
    logger.info(`> ${serviceName} ready on port ${port}`)
  })
}).catch(err => {
  logger.error('Unable to connect to the database:', err)
})
