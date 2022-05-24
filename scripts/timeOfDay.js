import { isAfter, isBefore } from "date-fns";

const dateMargin = function (date, minutes) {
  const beforeDate = new Date(date);
  const afterDate = new Date(date);
  beforeDate.setMinutes(date.getMinutes() - minutes);
  afterDate.setMinutes(date.getMinutes() + minutes);
  return {
    beforeDate,
    afterDate,
  };
}

const isDateBetween = (date, {beforeDate, afterDate}) => isAfter(date, beforeDate) && isBefore(date, afterDate);

const isDateBetweenMargin = (date, marginDate, minutes) => isDateBetween(date, dateMargin(marginDate, minutes));

export default function timeOfDay ({sunrise, sunset}, date, marginMinutes) {
  if(isDateBetweenMargin(date, sunrise, marginMinutes)) return 'morning';
  if(isDateBetweenMargin(date, sunset, marginMinutes)) return 'evening';
  if(isAfter(date, sunrise) && isBefore(date, sunset)) return 'day';
  return 'night';
};