import { App } from "./App";

const args = process.argv.slice();

// Remove first element and second elements of the array since it is not ignored
// by the command-line parser.
args.splice(0, 2);

const app = new App();
app.execute(args);
