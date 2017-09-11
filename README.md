express-log-url
===============
Simple, nice-looking, logging for Express.

![Screenshot](docs/screenshot.png)


Installation
============

Install package
---------------

```
npm --save install express-log-url
```


Install within Express
----------------------

```javascript
// Somewhere within your server setup

app.use(require('express-log-url'));
```


Socket logging
---------------
The module also contains an extremely simple socket logging function:

```javascript
var io = require('socket.io').listen(server);
io.on('connect', socket => {
	socket.on('something', require('express-log-url').socket);
	socket.on('something', ()=> ...Actually do work...);
})
```


Options
=======
Set the following options via `app.set('OPTION', 'VALUE');`

| Setting      | Type   | Default | Description               |
|--------------|--------|---------|---------------------------|
| `log.indent` | String | `null`  | Prefix for any log entry  |
