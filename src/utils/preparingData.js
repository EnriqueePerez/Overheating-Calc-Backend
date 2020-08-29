//Adding time and date to the values
const dateFormat = require('../utils/dateFormat');

function parsingValues(values) {
  const dateAndTime = dateFormat(); //Getting the formatted date and time

  values.time = dateAndTime.time;
  values.date = dateAndTime.date;

  const onlyValues = Object.values(valuesWithNames); //Extracting the values from the object
  const parsedValues = onlyValues.map((i) => i.toString()); //Parsing the values to string to avoid errors
  return parsedValues;
}

module.exports = parsingValues;
