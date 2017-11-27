# Translink fleet location map
#### by Bryan Guenther

Production build: [https://bwillem.github.io/spare-challenge](https://bwillem.github.io/spare-challenge)

This project had one challenge in particular I struggled with. Mapping over the large array of bus data on every render was expensive and caused performance issues when navigating the map. Mapping over and rendering ~1000 dot components every time the map had to be reconciled (every drag or zoom user input) was not an option. To keep the map from lagging requires successfully rendering every component > 60x/second to maintain 60fps, the framerate necessary for perceived smoothness. Rendering 1000 dot components plus redrawing the map caused a visual lag, even with `react-map-gl` leverageing webGL's GPU acceleration. 

I tried a couple approaches before settling on an optimization. The dots do not need to be rerendered every time `onChangeViewport` is called - this render is responsible for updating the map state (Lat, Long, Zoom, etc.), not drawing the dots.
I decided the dots only really need to be reconciled in two scenarios:
1. After a successful fetch
2. After the map has moved or zoomed

The first scenario is taken care of by redux - redux triggers a virtual DOM diff + repaints every time connected data is updated. The second scenario was the one causing the expensive array mapping. So I listen for a `mouseUp` event on the map and set a flag on component state. The flag is passed to the `DotRenderer` component, which uses `shouldComponentUpdate` to decide whether or not to reconsile. A user does not need bus data being rendered if they're in the process of navigating the map. This saves thousands of renders / second.

This isn't a perfect fix - the dots do not update when a user is navigating the map and appear to hover in place until the mouseUp/touchEnd event is fired and the dots are redrawn. I'm confident with a bit more research this could be optimized more.

#### Additional libraries
I opted for **redux-saga** over redux-thunk for async redux. This is preference more than anything. I like generator functions, they're conscise and easy to unit test. 
I used **styled-components** for the little styling there was to do. I won't go into why styled-components rules, it's just so easy to use and I love how it handles separation of concerns by keeping styles in their component.

#### Improvements/to do
* Unit tests
* Find a way to optimize dot rendering that doesn't cause a visual bug. Maybe hiding bus data while it's not repainting.
* Research a way to hardware accelerate the dot rerendering.
* Add some useful functionality to the map, like bus arrival times per stop, tap for bus info, etc.
* Static typechecking