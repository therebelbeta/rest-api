# rest-api

This API queries a predefined set of inpatient prospective payment systems providers.

## Quick Start

To test in a deployed setting, visit [therebelrobot-test-api.now.sh/providers](https://therebelrobot-test-api.now.sh/providers), test it out in [Insomnia](https://insomnia.rest/), or try it in `curl`:

```sh
curl -v https://therebelrobot-test-api.now.sh/providers\?state\=GA
```

To run locally:

```
git clone https://github.com/therebelbeta/rest-api
cd rest-api
npm install
npm start
```

## architecture

This was built using the following architecture decisions:
- server in zeit/micro, a low-friction express-based server lib
- environment-based structured logs using winston
- request logging, with status codes
- long-query warnings
- unique id's for all requests (ksuid, `X-Request-ID` response header)
- a healthcheck endpoint for starting up
- eslint, with a superset of feross/standard (`npm run lint`)
- unit testing using ava and mock-require (`npm test`)
- 100% api controller test coverage reporting using nyc (`npm run test:coverage`)
- precommit hooks for running tests automatically
- a development environment server (`npm run dev`)
- a generic dockerfile for deployment
- sane environment defaults (`/settings.js`)

## datastore

I decided to use a sqlite database to store the data provided. As it's more or less static (in the requested implementation at least), and deployment isn't being clustered/sharded, sqlite provides the lowest friction datastore while still providing a robust query set. I used [sequelize](http://docs.sequelizejs.com/) as an ORM, and stored both the original csv and the sqlite db in the `/db/data` folder of the application.

I did a bit of data normalization, namely: changed the names of the columns to snake_case to be easier to query, removed `$` from USD columns to allow it to be set as a valid float type, and removed `provider_` from the columns as it's a bit redundant in a `Provider` table.

## assumptions

- Given this dataset is specifically setting `state`, it is assumed the currency is in USD, which allows the wholesale removal of the `$` symbol in data normalization. Ideally there'd be a separate field with currency type and a conversion table (for max and min queries) if international currencies are stored in the same table.
- I added `max_average_total_payments` and `min_average_total_payments` query parameters, as it seems logically similar to the other query parameters with little effort to add
- Since the dataset is enormous, I also added `limit`, `offset`, `sort_by` (with a camelCase version of the field to sort by), and `sort_by_direction` (with `ASC` or `DESC`) query parameters. The defaults are:
  - `limit`: `10`
  - `sort_by`: `id` or `Provider ID`
  - `sort_by_direction`:`DESC`
- To debug/work with these new parameters and defaults, I've also added the following headers:
  - `X-Total-Count`
  - `X-Pagination-Limit`
  - `X-Pagination-Offset`
  - `X-Pagination-Sort-By`
  - `X-Pagination-Sort-By-Direction`
