# WebAssembly Workshop Sample Code

A code sample that aims to introduce users to WebAssembly. The code sample uses React to render a Mandelbrot fractal(C++ implementation) on a 2D canvas. This was influenced by this article: https://dev.to/brightdevs/using-webassembly-with-react-1led 🙌🏼

## Installation

* `git clone git@github.com:dikaeinstein/wasm_react.git`

### Setup Enscripten

Follow the download and install instruction on the emscripten site: https://kripken.github.io/emscripten-site/docs/getting_started/downloads.html

to setup the emscripten sdk `emsdk`.

Then run:

* `${install_path}/emsdk/emsdk activate latest`
* `source ${install_path}/emsdk/emsdk_env.sh`


Ensure you have `emcc` in path: `emcc --version`.

Then run these commands to setup and start the app.

* `cd wasm_react`
* `yarn install`
* `source ./build_wasm.sh`
* `yarn start`
* visit `http://localhost:8080/`
