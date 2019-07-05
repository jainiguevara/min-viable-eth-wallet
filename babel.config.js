module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["module-resolver", {
       alias: {
         randombytes: "./src/utils/randombytes.js",
         crypto: "crypto-browserify",
         assert: "assert"
       }
     }]
   ]
};
