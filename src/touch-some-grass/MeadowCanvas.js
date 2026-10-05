import { useEffect, useRef } from 'react';

const VERTEX = `
  attribute vec2 position;
  varying vec2 uv;
  void main() {
    uv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

// Displace the source photograph only where the foreground plants grow.
// The horizon and mountains remain completely still, as in a locked-off camera.
const FRAGMENT = `
  precision mediump float;
  uniform sampler2D landscape;
  uniform vec2 cover;
  uniform float time;
  varying vec2 uv;
  void main() {
    vec2 p = (uv - 0.5) * cover + 0.5;
    float foreground = 1.0 - smoothstep(0.02, 0.32, p.y);
    float gust = sin(time * 0.58 + p.x * 8.0);
    float ripple = sin(time * 1.12 + p.x * 23.0 + p.y * 9.0);
    float breeze = (gust * 0.68 + ripple * 0.32) * foreground;
    p.x += breeze * 0.0028;
    p.y += sin(time * 0.72 + p.x * 16.0) * foreground * 0.00075;
    gl_FragColor = texture2D(landscape, clamp(p, 0.001, 0.999));
  }
`;

export default function MeadowCanvas({ src, paused, onReady }) {
  const canvasRef = useRef(null);
  const pausedRef = useRef(paused);
  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl', {
      alpha: false, antialias: false, depth: false, powerPreference: 'low-power',
    });
    if (!gl) return undefined;

    let disposed = false;
    let frame = 0;
    let elapsed = 0;
    let previousTime = 0;
    let loaded = false;
    const shaders = [];
    const program = gl.createProgram();
    const buffer = gl.createBuffer();
    const texture = gl.createTexture();
    const photo = new Image();

    const compile = (kind, source) => {
      const shader = gl.createShader(kind);
      shaders.push(shader);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return false;
      gl.attachShader(program, shader);
      return true;
    };

    const release = () => {
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      shaders.forEach(shader => gl.deleteShader(shader));
    };

    if (!compile(gl.VERTEX_SHADER, VERTEX) || !compile(gl.FRAGMENT_SHADER, FRAGMENT)) {
      release();
      return undefined;
    }
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      release();
      return undefined;
    }
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const coverUniform = gl.getUniformLocation(program, 'cover');
    const timeUniform = gl.getUniformLocation(program, 'time');
    gl.uniform1i(gl.getUniformLocation(program, 'landscape'), 0);

    const draw = () => {
      if (!loaded || disposed || gl.isContextLost()) return;
      gl.uniform1f(timeUniform, elapsed);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const resize = () => {
      if (!loaded || disposed) return;
      const { width, height } = canvas.getBoundingClientRect();
      if (!width || !height) return;
      const density = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * density);
      canvas.height = Math.round(height * density);
      gl.viewport(0, 0, canvas.width, canvas.height);
      const viewRatio = width / height;
      const imageRatio = photo.width / photo.height;
      gl.uniform2f(coverUniform, Math.min(viewRatio / imageRatio, 1), Math.min(imageRatio / viewRatio, 1));
      draw();
    };

    const animate = timestamp => {
      if (disposed) return;
      if (previousTime && !pausedRef.current && !document.hidden) {
        elapsed += Math.min((timestamp - previousTime) / 1000, 0.05);
        draw();
      }
      previousTime = timestamp;
      // Stop the GPU loop entirely for a hidden tab; resume from visibilitychange.
      if (!document.hidden) frame = requestAnimationFrame(animate);
    };
    const visibility = () => {
      cancelAnimationFrame(frame);
      previousTime = 0;
      if (!document.hidden) frame = requestAnimationFrame(animate);
    };
    const contextLost = event => {
      event.preventDefault();
      canvas.style.opacity = '0';
      cancelAnimationFrame(frame);
    };
    photo.onload = () => {
      if (disposed) return;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, photo);
      loaded = true;
      resize();
      canvas.style.opacity = '1';
      onReady();
      frame = requestAnimationFrame(animate);
    };
    photo.src = src;
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    document.addEventListener('visibilitychange', visibility);
    canvas.addEventListener('webglcontextlost', contextLost);

    return () => {
      disposed = true;
      photo.onload = null;
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener('visibilitychange', visibility);
      canvas.removeEventListener('webglcontextlost', contextLost);
      release();
    };
  }, [src, onReady]);

  return <canvas ref={canvasRef} className='meadow__canvas' aria-hidden='true' />;
}
