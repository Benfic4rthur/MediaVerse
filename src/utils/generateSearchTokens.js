const stringInArray = string => {
  return [...string].map((_, index) => string.substring(0, index + 1));
};

export const generateSearchTokens = title => {
  const correctedTitle = title.toLocaleLowerCase().replace(/\s+/g, ' ');

  const ArrayTitle = correctedTitle.split(' ');

  const substrings = ArrayTitle.reduce((acc, val) => {
    return (acc = [...acc, ...stringInArray(val)]);
  }, []);

  const titleAll = stringInArray(correctedTitle);

  const filter = [...substrings, ...titleAll].filter((element, index, arr) => {
    return arr.indexOf(element) === index;
  });

  return filter;
};
