# gitfolio

Get information about your github portfolio

Loosely based on a SailsJS workflow

![](assets/gitfolio.png)

Please &#9733; this repo if you found it useful &#9733; &#9733; &#9733;

## Features
* Automatic restart during development
* Built in oAuth and Registration
* Automatic API documentation with swagger
* Custom responses
* Boom error handling
* Automatic endpoint creation with footprints
* Express for the server
* Waterline for the ORM
* Super efficient docker support


## Setup

```sh
git clone https://github.com/jamrizzi/trailblazer
cd gitfolio && npm install
npm start
```


## Dependencies

* [Docker](https://www.docker.com/)
* [NPM](https://nodejs.org/)
* [Node](https://www.npmjs.com/)


## Usage

### Scripts

| Command         | Description                           |
| --------------- | ------------------------------------- |
| `npm start`     | Start the development server          |
| `npm run data`  | Run the database                      |
| `npm run lint`  | Lint the code                         |
| `npm run test`  | Test the code                         |
| `npm run build` | Build the docker container            |
| `npm run run`   | Run the docker container              |
| `npm run ssh`   | SSH into the docker container         |
| `npm run essh`  | SSH into the running docker container |
| `npm run push`  | Push the docker container             |


## Support

Submit an [issue](https://github.com/jamrizzi/trailblazer/issues/new)


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## License

[MIT License](https://github.com/jamrizzi/trailblazer/blob/master/LICENSE)

[Jam Risser](https://jamrizzi.com) &copy; 2017


## Credits

* [Jam Risser](https://jamrizzi.com) - Author
* Built with [TrailsJS](https://trailsjs.io/)
* Loosly based on [SailsJS](http://sailsjs.com/)


## Changelog

v0.0.1 (2017-09-22)
* Initial release
