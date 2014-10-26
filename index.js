var stateReset = require('./state')

module.exports = Reset
module.exports.state = stateReset

function Reset(gl) {
  var cleanup = [
    'Buffer'
  , 'Framebuffer'
  , 'Renderbuffer'
  , 'Program'
  , 'Shader'
  , 'Texture'
  ].map(function(suffix) {
    var remove   = 'delete' + suffix
    var create   = 'create' + suffix
    var original = gl[create]
    var handles  = []

    gl[create] = function() {
      var handle = original.apply(this, arguments)
      handles.push(handle)
      return handle
    }

    return {
        remove: remove
      , handles: handles
    }
  })

  return function reset() {
    cleanup.forEach(function(kind) {
      for (var i = 0; i < kind.handles.length; i++) {
        gl[kind.remove].call(gl, kind.handles[i])
      }
    })

    stateReset(gl)

    return gl
  }
}
