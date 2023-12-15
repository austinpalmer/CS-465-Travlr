const index = (req, res) => {
    res.render('index', {title: "Travlr Getaways"});
};

// Load the index page first

module.exports = {
    index
};