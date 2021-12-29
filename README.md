# adb-cms

## Docker setup
**Build the image**
```docker
$ docker build -t adb-cms .
```

**Run the container**
```docker
$ docker run -it -p 8080:80 adb-cms
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
