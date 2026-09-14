const { jsx } = require('react/jsx-runtime');
try {
  jsx(undefined, {});
} catch (e) {
  console.log("Error:", e.message);
  console.log("Stack:", e.stack);
}
