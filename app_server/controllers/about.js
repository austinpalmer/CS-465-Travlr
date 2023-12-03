// Get About view
const about = (req, res) => {
    res.render('about', { title: 'About'});
};

// Get Contact view
const contact = (req, res) => {
    res.render('contact', { title: 'Contact'});
};

module.exports = {
    about,
    contact
};