const formatSeconds = seconds => {
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  let minutes = `${Math.floor(seconds / 60)}`;
  if(hours && (minutes.length < 2)) minutes = `0${minutes}`;
  seconds = `${Math.round(seconds % 60)}`;
  if(seconds.length < 2) seconds = `0${seconds}`;


  let result = "";
  if(hours) result += `${hours}:`;
  result += `${minutes}:${seconds}`;
  return result;
};

export default formatSeconds;