# E-Commerce-Back-end
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

## Table Of Contents
* [Description](#description)
* [Video](#video)
* [Installation](#installation)
* [Usage](#usage)
* [Tests](#tests)
* [Code Snippets](#code-snippets)
* [Technologies](#technologies)
* [License](#license)
* [Author Links](#author-links)

## Description
This application offers an interface to manage a database for an E-Commerce application. The client can send POST, GET, PUT and DELETE HTTP requests to the server through API routes to manipulate the database. The server used Sequelize to perform the operations on the data. 

## Video

These are video recordings of the options available to manage the database:

Setup / Installation:\
[Webm link](https://drive.google.com/file/d/190rowfxvWPorYoySw7ZYlZTchgr9WDpX/view)\
[Screencastify](https://watch.screencastify.com/v/yB9a2UNDIbnA3PkFnOSL)

Insomnia - API routes:\
[Webm link](https://drive.google.com/file/d/1bfVG03FhM5y6xvmpG4l5_o93sRZpk35a/view)\
[Screencastify](https://watch.screencastify.com/v/BK1oKJW5tPpAK2McJ3iq)


## Installation
The application can be started from the command line.

1. Set up the environment variables in the .env file (the DB_PASSWORD variable should be set to the user's SQL password)
```
DB_NAME=ecommerce_db
DB_USER=root
DB_PASSWORD=
```

2. Set up the 'ecommerce_db' database using the following commands: 

Start in the project directory:

``` 
$ cd db
$ mysql -u root
mysql> source schema.sql 
^C (to quit the mysql shell)
```

3. Seed the database

The database is initialized using the following (start in the project directory):

```
$ node seeds/index.js
```

4. Install packages using npm

Return to the project directory from the db directory, and install packages:

```
$ cd ..
$ npm i
```

## Usage

Start the application from the command line with the following command in the project directory:

```
$ node server.js
```

## Tests

Insomnia was used to test this application server. Each of the category, product and tag routes were tested by sending GET, POST, PUT and DELETE requests. (Shown in the video)


## Code Snippets

#### 1. Model setting up the join table between Product and Tag. 

```
 // Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, { 
  through: {
  model: ProductTag,
  unique: false
  },
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, { 
  through: {
    model: ProductTag,
    unique: false
  } 
});
     
```

#### 2. View all products - return the product category and the associated tags.

```
 router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findAll({
      include: [{model: Category}, {model: Tag, through: ProductTag }]
    });
    if (!productData) {
      res.status(404).json("Products not found");
    } else {
      res.status(200).json(productData);
    }
    } catch (err) {
      res.status(500).json(err);
    }
});

```

## Technologies
- Javascript
- express.js framework
- Sequelize library

## References
- [Sequelize](https://sequelize.org/docs/v6/core-concepts/model-basics/)

## License
This application is covered under the [MIT License](https://opensource.org/licenses/MIT).

## Author Links
[GitHub](https://github.com/sbhikshe)\
[LinkedIn](https://www.linkedin.com/in/sripriya-bhikshesvaran-8520992/)
