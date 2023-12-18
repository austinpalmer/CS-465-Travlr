# CS-465-Travlr

## Architecture

  In this project, we created a full-stack application using the MEAN stack which stands for MongoDB, Express, Angular, and Node.js. This is a powerful stack that allows for
uniformity, easy setup, and creating feature rich applications that can easily work with the database. The application is broken up into 3 main parts: app_admin (the adminfrontend SPA), 
app_api (API to make requests to the database), and app_server (the backend Express/Node app for visitors). 

  An Angular SPA was chosen as the best approach for an admin side frontend due to the need for a feature rich side that allows for CRUD operations on trips. Node and Express 
were chosen for the backend due to the easy setup and enhanced performance due to the need for a fast and indexable frontend for visitors.

## Functionality

  One benefit of this stack is that everything can be written in HTML, CSS, and JavaScript with the exception of angular but that is written with TypeScriptMongoDB was used for the 
database due to its flexible document style and since documents contain JSON it ties into the rest of the MEAN stack really well when it comes to working with data.

  Throughout the entire application controllers and routes were constantly reconfigured due to the addition of the API, and then the SPA, and then reformatting those in a way that
authentication could be used. Due to the nature of the MEAN stack, it made much easier to do this reconfiguration due to reusable components in Angular, consistent structure with
express routes, and using partials/handlebars to template HTML making it more functional and easier to read.

## Testing

  Testing was done using several methods including static testing, using Postman to test API routes, MongoDBCompass which was used for the database, and developer tools to log and view 
network issues in the browser. These testing methods made it easy to identify issues and maintaining understanding even with the massive file structure. Postman was one of my favorite 
new tools to use and allowed me to easily test the responses of my API and authentication/authorization. 

## Reflection

  This course was extremely useful to my overall goal of becoming a software engineer as it gave me experience with several new technologies, improved my testing capabilities, and made me
adaptable to learning new programming languages and frameworks. Several libraries and frameworks were used in addition to the stack such as: crypto (security), JWTToken (security), 
seedgoose (seeding MongoDB), request (request client), nodemon/npm (node packages and session management), passport (simplified token management), and handlebars (dynamic templating).
