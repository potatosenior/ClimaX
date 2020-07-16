const api = "/weather?adress=";

const get_weather = async (query) => {
  return fetch(api + encodeURIComponent(query))
  .then( async response => {
    return response.json()
      .then(data => { return data })
      .catch(error => { return data })
  })
  .catch(error => { return {message: 'Tente novamente mais tarde!'}})
}

const form = document.querySelector('form');
const input = document.querySelector('input');
const result1 = document.querySelector('#result1');
const result2 = document.querySelector('#result2');

form.addEventListener('submit', async (e) => {
  // impede a pagina de recarregar quando apertar o botao
  e.preventDefault();

  if (!input.value.length) {
    return result1.textContent = 'Insira um local!';
  }

  await get_weather(input.value)
    .then( data => {
      // console.log(data)
      if (data.error) {
        result1.textContent = data.message;
      } else {
        result1.textContent = data.location + '.';
        result2.textContent = data.forecast;
      }
    })
    .catch(error => console.log('check 0', error))
})