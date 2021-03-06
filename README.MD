# Tajawal Back-End Code Challenge Solution

[![Build Status](https://travis-ci.com/farhantahir/code-challenge.png?branch=master)](https://travis-ci.com/farhantahir/code-challenge) 
[![Maintainability](https://api.codeclimate.com/v1/badges/94fd9f91055d5cd54788/maintainability)](https://codeclimate.com/github/farhantahir/code-challenge/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/94fd9f91055d5cd54788/test_coverage)](https://codeclimate.com/github/farhantahir/code-challenge/test_coverage)



# Table of Contents
* [Technologies](#technologies)
* [Dependancies](#dependancies)
* [Dev Dependancies](#dev-dependancies)
* [Setup](#setup)
* [Assumptions](#assumptions)
* [Usage](#usage)
* [Run Tests](#run-tests)


# Technologies
* Node.js (v10.9.0)
* Express Framework
* Jest
* Travis CI
* Code Climate

# Dependancies
* config
* dotenv
* express
* morgan
* request
* request-promise-native  

# Dev Dependancies
* jest
* nodemon


# Setup

1) Clone this repository.

```
git clone https://github.com/farhantahir/code-challenge.git
```

2) Copy `.env.example` and rename it to `.env`

3) Install Dependancies.
```
npm i
```

4) Run development server.
```
npm run dev
```

Server will be running at `http://localhost:4000`

# Assumptions

* `price` will be always a range filter
* `date` will be always a range filter

# Usage

### Hotels Search End Point:
Using any RestAPI Client `Postman` or `Restlet` etc hit the following end point with appropriate params.

```
GET /hotels/search
```

### Params:
 
 * `name`: A part of hotel name matches using `.includes`
 * `city`: A city name that will use `Exact Match`.
 * `price`: A range of price like `100:500` or `1000:2000`. It uses a range filter.
 * `date`: A range of date as `10-12-2020:15-12-2020`. It uses a range filter.
 * `sort_field`: Field name to run sort against.
 * `sort_order`: Order of the sorting `asc/desc`


### Response: 

 ```
  {
    "hotels": [ //  Array of hotels]
  }
 ```

### Run Tests

Tests are written using `jest` testing framework.

To run tests use following command.

```
npm test
```


