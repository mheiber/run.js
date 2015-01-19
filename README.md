# run.js
Control flow experiment for Node

I used [Async.js](https://github.com/caolan/async) for control flow and really liked the `auto` method for specifying the depenencies of a function. However, the syntax is cumbersome and the need for an extra argument can lead to errors or difficult workarounds.

I thought it would be nice to have a function `run` that let's you do: `run(func, arguments)` that runs when the arguments to the function are "ready." 

and ended up reinventing a more crummy version of promises. So I refactored the code to use promises, played around with it, and switched to the [Q promise library](https://github.com/kriskowal/q). 

Still, it was fun to write the tests and play with `run`. The Mocha tests in the `test` directory show how to use it.
