# Translink fleet location map
#### by Bryan Guenther

Production build: [https://bwillem.github.io/spare-challenge](https://bwillem.github.io/spare-challenge)

This project had one challenge in particular I struggled with. Mapping over the large array of bus data on every render was expensive and caused performance issues when navigating the map. Mapping over and rendering ~1000 dots everytime the map had to be reconciled was not an option.

I tried a couple approaches before settling on an optimization. The dots do not need to be rerendered everytime `onChangeViewport` is called - this render is responsible for updating the map state (Lat, Long, Zoom, etc.), not drawing the dots.
The dots only need to be reconciled in two scenarios:
1. A successful fetch
2. After a user finishes using map controls

The first scenario is taken care of by redux. The second scenario I listen for a `mouseUp` event on the map and set a flag on component state. The flag is passed to the `DotDrawer` component, which uses `shouldComponentUpdate` to decide whether or not to update.

This isn't a perfect fix - the dots do not update when a user is navigating the map, and appear to hover in place until the mouseUp event is fired and the dots are redrawn. I'm confident with a bit more research this could be optimized more.

#### Additional libraries
I opted for **redux-saga** over redux-thunk for async redux. This is preference more than anything. I like generator functions, they're conscise and easy to unit test. 
I used **styled-components** for the little styling there was to do. I won't go into why styled-components rules, it's just so easy to use and I love how it handles separation of concerns.

#### Improvements/to do
* Unit tests
* Find a way to optimize dot rendering that doesn't cause a visual bug