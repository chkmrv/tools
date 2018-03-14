# @chantelle/guideline

- Use handle*[Something] like function names on reactive functions like events that can re-run in time
- Use longer variable and symbol names instead of shortened ones in order to inherit knowledge to everyone
- Enable your eslint with -fix option enabled
- Enable your .editorconfig if your IDE needs it
- Avoid mutating
- Avoid side-effects
- Don’t create selfish functions that does everything itself and shares nothing. Create tiny composable functions and try to re-use them
- Make your functions pure, get some input give some output.
- Own your branch. Merging it and rebasing it your responsibility. Act faster, push and merge faster in more small pull-requests
- Don’t skip tests
- Cover your new functionality with test. At least make sure it doesn’t explode when you run it.
- Try to test and cover all the flow of the domain you are working in once instead of creating many tests (integration > unit)
- Check the #logs channel to see how is your tests or deployments are doing