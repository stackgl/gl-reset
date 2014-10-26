# gl-reset
![](http://img.shields.io/badge/stability-experimental-orange.svg?style=flat)
![](http://img.shields.io/npm/v/gl-reset.svg?style=flat)
![](http://img.shields.io/npm/dm/gl-reset.svg?style=flat)
![](http://img.shields.io/npm/l/gl-reset.svg?style=flat)

Completely reset the state of a WebGL context, deleting any allocated resources.

Resetting is slow and instrumentation introduces a very slight overhead on
creating new resources. However, this is useful:

* If you want to safely recycle a WebGL context without state leaking between renders.
* To capture and remove any generated resources during a render.

There's a limit on the number of contexts you can have running
simultaneously on a page, and (at least on Chrome) when hitting the threshold
you simply lose the least recently created one. To work around this limit,
you can instead reset and reuse a single WebGL context between multiple renders.

## Usage

[![NPM](https://nodei.co/npm/gl-reset.png)](https://nodei.co/npm/gl-reset/)

### `reset = require('gl-reset')(gl)`

Returns a function that, when called, will remove any existing resources and
reset the current WebGL state.

**Note:** this function must be created before creating any resources, as it
instruments several WebGL methods to do its thing.

``` javascript
var reset = require('gl-reset')(gl)

function render() {
  // Triggers a context reset
  reset()
}
```

### `require('gl-reset/state')(gl)`

Resets the state, without instrumenting the context and without removing any
allocated resources.

## License

MIT. See [LICENSE.md](http://github.com/hughsk/gl-reset/blob/master/LICENSE.md) for details.
