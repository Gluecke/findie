# Findie

> A restaurant delivery finder

Application for finding restauants on multile delivery sites.

### Installing

installing puppeteer will install a compatible version of chromium

```
npm install
```

## Running

```
npm start
```

navigate to `http://localhost:8080/`

## Deployment

`master` builds and deploys to heroku

# Troubleshoot

Heroku instance does not spin up with everything required to run puppeteer. Must add [puppeteer-heroku-buildpack][1] to start chromium with pupeteer.

[1]: https://github.com/jontewks/puppeteer-heroku-buildpack