const validateURL = () => {
  const input = document.querySelector('input .email');
  input.addEventListener('change', (e) => {
    e.preventDefault();
    console.log('abobas');
  });
};
export default validateURL;
