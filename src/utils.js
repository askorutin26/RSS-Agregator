const getErrName = (error) => {
  if (error.isParsingError) {
    return 'parsingError';
  }
  if (error.isAxiosError) {
    return 'networkError';
  }
  return error.message;
};
export default getErrName;
