// eslint-disable-next-line import/no-named-default
import { default as _dayjs } from 'dayjs'

import duration from 'dayjs/plugin/duration'
import relative from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

_dayjs.extend(duration)
_dayjs.extend(utc)
_dayjs.extend(timezone)
_dayjs.extend(relative)

export const dayjs = _dayjs
