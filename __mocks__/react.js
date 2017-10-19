/* @flow */
const react = require('react');
const { AnimationFrame } = require('rxjs/util/AnimationFrame');

// Resolution for requestAnimationFrame not supported in jest error:
// https://github.com/facebook/react/issues/9102#issuecomment-283873039
global.window = global;
global.window.addEventListener = () => {};
global.window.requestAnimationFrame = () => AnimationFrame;

module.exports = react;
