# Twitch Polling Tool

A Twitch polling tool bot and poll visualization overlay for custom polls.

## Integration into OBS

TODO Describe how to run within a server.

```
file:///path/to/index.html
```

You also must append a parameter to the URL to specify your Twitch channel name.

So, for example if your twitch channel name is XYZ:

```
file:///path/to/index.html?channel=XYZ
```

If you don't want the default position (top left) you can specify append another parameter to the URL to change this. The following URL puts the overlay into the bottom right:

```
file:///path/to/index.html?channel=XYZ&positon=br
```

Replace the `br` with any corner you like. These are the supported options:

- `tl`: top left (default)
- `tr`: top right
- `br`: bottom right
- `bl`: bottom left

## Commands

The chat commands to start and edit polls are only available to the broadcaster.

### Starting a Poll

There are different ways to start a poll:

`!poll`: starts a poll with just two options named 1 and 2.

<img width="1920" alt="Bildschirmfoto 2022-07-30 um 22 08 15" src="https://user-images.githubusercontent.com/94025590/181994769-7bb71d57-cb0a-4d26-91c1-7828597e3489.png">

`!poll 3`: starts a poll with three options named 1, 2, 3. (Up to 9 options are supported).

<img width="1920" alt="Bildschirmfoto 2022-07-30 um 22 08 42" src="https://user-images.githubusercontent.com/94025590/181994778-fa08a89b-84e2-494e-a918-37866663bbc5.png">

`!poll "what kind of person are you? "cat person?" "dog person?" "why not both?"`: starts a poll with a title (the first text) and three named options and a title (everything after the first text). These option names will appear next to the option numbers.

<img width="1920" alt="Bildschirmfoto 2022-07-30 um 22 09 59" src="https://user-images.githubusercontent.com/94025590/181994811-878d4d6b-5c9d-487e-b34f-63c2d6cff14c.png">

`!poll "" "cat person?" "dog person?" "why not both?"`: leaves out the title (which will default to "Poll") and supplies the same three options:

<img width="1920" alt="Bildschirmfoto 2022-07-30 um 22 10 20" src="https://user-images.githubusercontent.com/94025590/181994877-82a22432-5799-4ffd-9995-d29a1fed0f82.png">

### Changing the Poll Title

`!polltitle "New Poll Title"`

This will change the poll title of the currently active poll to "New Poll Title".

### Stopping a Poll

`!pollstop`

This will stop the currently active poll in its current state and highlights the winning option. If several options have a draw they will be highlighted together.

<img width="1920" alt="Bildschirmfoto 2022-07-30 um 22 10 43" src="https://user-images.githubusercontent.com/94025590/181994884-358fb293-2daa-4406-93f9-efd0bb93ab3a.png">
<img width="1920" alt="Bildschirmfoto 2022-07-30 um 22 11 21" src="https://user-images.githubusercontent.com/94025590/181994887-30a27146-d739-4b77-8be2-e4b52dc968ee.png">

### Resuming a Poll

`!pollresume`

This will resume the currently stopped, but still visible poll.

### Ending a Poll

`!pollend`

This completely ends the poll and throws away the results. You can't recover the results after.
