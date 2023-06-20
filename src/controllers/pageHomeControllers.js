const axios = require('axios');

const homeView = async (req, res) => {
  try {
    // const response = await axios.get('https://api.skylightgame.com/countHolders');
    // const countHolders = response.data.countHolders;
    // res.render('pages/home2', { layout: false, countHolders: countHolders });
    res.render('pages/home2', { layout: false });
  } catch (error) {
    console.error(error);
    res.render('pages/error', { layout: false });
  }
}

// const homeView = async (req, res) => {
//   // console.log('Estoy aquí...');
//   // res.send('Página de Home');
//   res.render('pages/home2', { layout: false })
// }

module.exports = {
  homeView
}