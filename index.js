const micro = require('micro')
const { router, get } = require('microrouter')

const { reqLogger } = require('./lib/reqLogger')
const { serviceName, port, isDev } = require('./settings')
const logger = require('./lib/logger')

const healthCheck = require('./api/healthcheck')
const getProviders = require('./api/getProviders')

const app = micro(
  router(
    get('/internal/health', reqLogger(healthCheck)),
    get('/providers', reqLogger(getProviders))
  )
)

app.listen(port, function () {
  if (isDev) {
    logger.debug("LOG_LEVEL is set to include 'debug'. You'll be receiving more console output than usual")
    logger.info("LOG_LEVEL is set to include 'info'. You'll be receiving standard info output")
    logger.warning("LOG_LEVEL is set to include 'warning'. You'll be receiving warning output")
    logger.error("LOG_LEVEL is set to include 'error'. You'll be receiving error output")
  }
  logger.info(`> ${serviceName} ready on port ${port}`)
})
