/**
 * Performs a set number of iterations applying the function f(z) = z^2 + c
 * on the previous result. https://en.wikipedia.org/wiki/Mandelbrot_set
 * f(z) = z^2 + c
 * f(z') = f(z)
 * f(z'') = f(z')
 *
 * @param {number} x x coordinate of the point
 * @param {number} y y coordinate of the point
 * @param {number} maxIter maximum number of iterations
 *
 * @return {number} number (0) represents the color black
 */
const mandelIter = (x, y, maxIter) => {
  let real = x;
  let imaginary = y;
  for (let a = 0; a < maxIter; a++) {
    let tmpReal = real * real - imaginary * imaginary + x;
    let tmpImaginary = 2 * real * imaginary + y;

    real = tmpReal;
    imaginary = tmpImaginary;

    if (real * imaginary > 5) {
      return a/maxIter * 100;
    }
  }

  return 0;
};

export default mandelIter;
