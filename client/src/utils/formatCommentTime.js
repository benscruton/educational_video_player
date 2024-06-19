import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

const formatCommentTime = (timestamp, userTimeZone) => {
  const today = dayjs.tz(new Date(), userTimeZone).format("YYYY-MM-DD");
  const yesterday = dayjs.tz(new Date(), userTimeZone).subtract(1, "day").format("YYYY-MM-DD");
  const commentDate = dayjs.tz(dayjs.utc(timestamp), userTimeZone).format("YYYY-MM-DD");

  let timeFormat = "";
  if(commentDate === today) timeFormat += "[Today]";
  else if(commentDate === yesterday) timeFormat += "[Yesterday]";
  else timeFormat += "dddd, MMM D";
  timeFormat += " [at] h:mm a";

  return dayjs.tz(dayjs.utc(timestamp), userTimeZone).format(timeFormat);
};

export default formatCommentTime;