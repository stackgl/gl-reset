var test = require('tape')

var gl    = document.body.appendChild(document.createElement('canvas')).getContext('webgl')
var reset = require('./')(gl)

var program = gl.createProgram()

test('shaders', function(t) {
  var shader = gl.createShader(gl.VERTEX_SHADER)
  var src = 'precision mediump float; void main() { gl_Position = vec4(1); }'

  gl.shaderSource(shader, src)
  t.ok(gl.getShaderSource(shader), 'shader source initially present')

  reset()
  t.ok(!gl.getShaderSource(shader), 'shader source unavailable after reset')
  t.end()
})

test('buffers', function(t) {
  var buffer = gl.createBuffer()

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  t.ok(gl.getParameter(gl.ARRAY_BUFFER_BINDING) === buffer, 'buffer is bound')

  reset()
  t.ok(gl.getParameter(gl.ARRAY_BUFFER_BINDING) !== buffer, 'buffer is unbound on reset')
  t.end()
})

test('programs', function(t) {
  var program = gl.createProgram()
  var vert = gl.createShader(gl.VERTEX_SHADER)
  var frag = gl.createShader(gl.FRAGMENT_SHADER)

  gl.shaderSource(vert, 'precision mediump float; uniform float a; void main() { gl_Position = vec4(a); }')
  gl.shaderSource(frag, 'precision mediump float; uniform float a; void main() { gl_FragColor = vec4(a); }')
  gl.compileShader(vert)
  gl.compileShader(frag)

  gl.attachShader(program, vert)
  gl.attachShader(program, frag)
  gl.linkProgram(program)
  gl.useProgram(program)

  t.ok(gl.getParameter(gl.CURRENT_PROGRAM) === program, 'program is bound')
  t.ok(gl.getUniformLocation(program, 'a'), 'uniform location available initially')
  reset()
  t.ok(gl.getParameter(gl.CURRENT_PROGRAM) !== program, 'program is unbound on reset')
  t.ok(!gl.getUniformLocation(program, 'a'), 'uniform location unavailable on reset')
  t.end()
})

test('framebuffers', function(t) {
  var framebuffer = gl.createFramebuffer()

  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
  t.ok(gl.getParameter(gl.FRAMEBUFFER_BINDING) === framebuffer, 'framebuffer is bound')
  reset()
  t.ok(gl.getParameter(gl.FRAMEBUFFER_BINDING) !== framebuffer, 'framebuffer is unbound on reset')
  t.end()
})

test('renderbuffers', function(t) {
  var renderbuffer = gl.createRenderbuffer()

  gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer)
  t.ok(gl.getParameter(gl.RENDERBUFFER_BINDING) === renderbuffer, 'renderbuffer is bound')
  reset()
  t.ok(gl.getParameter(gl.RENDERBUFFER_BINDING) !== renderbuffer, 'renderbuffer is unbound on reset')
  t.end()
})

test('textures', function(t) {
  var texture = gl.createTexture()

  gl.bindTexture(gl.TEXTURE_2D, texture)
  t.ok(gl.getParameter(gl.TEXTURE_BINDING_2D) === texture, 'texture is bound')
  reset()
  t.ok(gl.getParameter(gl.TEXTURE_BINDING_2D) !== texture, 'texture is unbound on reset')
  t.end()
})

test('shutdown', function(t) {
  t.end()
  setTimeout(function() {
    window.close()
  })
})
