import React from 'react';
import mandelIter from '../util/mandelIter';

const createWebAssembly = async (path, importObject) => {
  const result = await window.fetch(path);
  const bytes = await result.arrayBuffer();
  return WebAssembly.instantiate(bytes, importObject);
};

const init = async () => {
  const memory = new WebAssembly.Memory({initial: 256, maximum: 256});
  const env = {
    abortStackOverflow: _ => { throw new Error('overflow'); },
    table: new WebAssembly.Table({initial: 0, maximum: 0, element: 'anyfunc'}),
    __table_base: 0,
    memory,
    __memory_base: 1024,
    STACKTOP: 0,
    STACK_MAX: memory.buffer.byteLength,
  };

  const wa = await createWebAssembly('fractal.wasm', { env });
  const exports = wa.instance.exports;
  console.info('got exports', exports);
  return exports;
};


class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  async componentDidMount() {
    const exports = await init();
    const mandelIterWASM = exports.__z10mandelIterffi;

    const canvas = this.canvasRef.current.getContext('2d');
    const mag = 200;
    const panX = 2;
    const panY = 1.25;
    const maxIter = 100;

    for (let x = 10; x < this.props.height; x++)  {
      for (let y = 10; y < this.props.width; y++)  {
        let m = mandelIter(x/mag - panX, y/mag - panY, maxIter);
        canvas.fillStyle = (m === 0) ? '#000' : 'hsl(0, 100%, ' + m + '%)'; 
        canvas.fillRect(x, y, 1,1);
      }
    }
  }

  render() {
    const { width, height } = this.props;
    return (
      <canvas ref={this.canvasRef} width={width} height={height} />
    );
  }
}

export default Canvas;
