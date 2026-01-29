import dayjs from "dayjs"
import "dayjs/locale/zh-tw"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("zh-tw")
dayjs.tz.setDefault("Asia/Taipei")
