
const mediaView = async (req, res) => {
  try {
    res.render('pages/media', { layout: false });
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
  mediaView
}