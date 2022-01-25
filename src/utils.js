const getErrName = (error) => {
  if (error.isParsingError) {
    return 'parsingError';
  }
  if (error.isAxiosError) {
    return 'networkError';
  }
  return 'unknownError';
};
export default getErrName;
