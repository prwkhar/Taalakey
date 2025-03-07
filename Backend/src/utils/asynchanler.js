const asynchandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next).catch((error) => {
    console.error("Error in asynchandler: ", error);
  });
}

export default asynchandler;