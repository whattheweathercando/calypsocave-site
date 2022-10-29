const dayjs = require('dayjs')

const defaultFormat = 'D MMM YYYY'

function dayjsFilter(date, format = defaultFormat) {
  return dayjs(date).format(format)
}

module.exports = dayjsFilter