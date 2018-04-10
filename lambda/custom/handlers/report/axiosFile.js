var axios = require('axios');

const instance = axios.create({
  baseURL: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
  timeout: 3000,
  headers: {
    'x-app-id':'b0cbef83',
    'x-app-key':'ced592a9f740d39a5b1c31bd7902f488'
  }
})

module.exports = instance;
