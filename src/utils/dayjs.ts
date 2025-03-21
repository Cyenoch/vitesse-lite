import dayjs from 'dayjs'

import duration from 'dayjs/plugin/duration'
import relative from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(duration)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relative)

export default dayjs
