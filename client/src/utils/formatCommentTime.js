import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

const formatCommentTime = (timestamp, userTimeZone) => {
  const now = dayjs.tz(new Date(), userTimeZone);
  const commentDate = dayjs.tz(dayjs.utc(timestamp), userTimeZone);

  let timeFormat = "";
  // If today, display "Today"
  if(commentDate.format("YYYY-MM-DD") === now.format("YYYY-MM-DD")){
    timeFormat += "[Today]";
  }

  // If yesterday, display "Yesterday"
  else if(commentDate.format("YYYY-MM-DD") === now.subtract(1, "day").format("YYYY-MM-DD")){
    timeFormat += "[Yesterday]";
  }

  // If within the last weekish, just weekday name
  else if(now.subtract(6, "days") < dayjs(timestamp)){
    timeFormat += "dddd" 
  }

  // If older, just put the full date. Only include the year if earlier than the current year.
  else{
    timeFormat += "MMM D";
    if(commentDate.format("YYYY") !== now.format("YYYY")){
      timeFormat += ", YYYY"
    }
  }

  // Finally, add the actual time
  timeFormat += " [at] h:mm a";

  return dayjs.tz(dayjs.utc(timestamp), userTimeZone).format(timeFormat);
};

export default formatCommentTime;