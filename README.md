jquery.ga.plugin.js
====================

This is a simple jQuery plugin wrapper around `window.ga`. It tries to be smart and simple to make life easier. You can pass custom properties and set custom attributes on elements if you want to be fancy.

**NOTE:** *If the window.ga object is not found, the plugin will automatically switch to development mode.*

### Usage

#### Basic

Setup

```html
<button type="button">Fire An Event</button>
```

```javascript
$('button').ga();
```

Results

```javascript
// this is what will be called in the plugin
// you can see the default properties here
ga('send', {
  eventAction: "click",
  eventCategory: "button", // this is default, it is not pulled from the button type
  hitType: "event"
});
```

#### Development

In development mode, what would normally get passed to the `ga` function, gets passed to `console.log`.

Setup

```html
<button type="button">Fire An Event</button>
```

```javascript
$('button').ga({
  development: true
});
```

Results

```javascript
// this is what will be called when development is set to true
console.log('send', {
  development: true,
  eventAction: "click",
  eventCategory: "button",
  hitType: "event"
});
```

#### Using Native Attributes

Setup

```html
<button type="button" value="hello" name="my-label">Fire An Event</button>
```

```javascript
$('button').ga();
```

Results

```javascript
ga('send', {
  eventAction: "click",
  eventCategory: "button",
  eventLabel: "my-label",
  hitType: "event"
});
```

#### Using Data Attributes

Setup

```html
<button type="button" value="1" name="submit" data-label="Data Label" data-value="10" data-category="grey-button">Fire An Event</button>
```

```javascript
$('button').ga();
```

Results

```javascript
ga('send', {
  eventAction: "click",
  eventCategory: "grey-button",
  eventLabel: "Data Label",
  eventValue: 10, // value is expected to be a positive int
  hitType: "event"
});
```

#### Using Different Events

Setup

```html
<button type="button" value="hello" name="my-label">Fire An Event</button>
```

```javascript
$('button').ga({
  eventAction: 'mouseover'
});
```

Results

```javascript
ga('send', {
  eventAction: "mouseover",
  eventCategory: "button",
  eventLabel: "my-label",
  hitType: "event"
});
```

#### Using Different Elements And Events

Setup

```html
<input type="text" name="search" />
```

```javascript
$('input').ga({
  eventAction: 'input'
});
```

Results

```javascript
// this is what is called if you click on the input and pressed the "1" key
ga('send', {
  eventAction: "input",
  eventCategory: "text",
  eventLabel: "search",
  eventValue: 1, // only positive int is passed
  hitType: "event"
});
```

#### Using Callbacks

Setup

```html
<button type="button" value="hello" name="my-label">Fire An Event</button>
```

```javascript
$('button').ga(function() {
  console.log('event fired');
});
```

Results

```javascript
ga('send', {
  eventAction: "mouseover",
  eventCategory: "button",
  eventLabel: "my-label",
  hitType: "event"
});
```

#### Kitchen Sink

Setup

```html
<button type="button">Fire An Event</button>
```

```javascript
$('button').ga({
  eventAction: "mouseover",
  eventCategory: "button",
  eventLabel: "my-label"
}, function() {
  console.log('event fired');
});
```

Results

```javascript
ga('send', {
  eventAction: "mouseover",
  eventCategory: "button",
  eventLabel: "my-label",
  hitType: "event"
});
```