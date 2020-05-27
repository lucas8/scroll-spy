# Scroll Spy

> Created as a submission for the primer frontend take-home

## Examples

- Basic Nav - [Live](https://lucas8.github.io/scroll-spy) - [Source](./example)

## Installation

Note: This doesn't actually work because the package is not on npm.

```bash
$ npm i --save scroll-spy
# or
$ yarn add scroll-spy
```

## Usage

### Getting Started

To get started, wrap all of the components you want to use with scroll-spy inside of the `<ScrollSpyProvider />`

You are able to pass in [options](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options) to the ScrollSpyProvider which will effect the Intersection Observer.

```js
import React from 'react'
import { ScrollSpyProvider } from 'scroll-spy'

function App() (
  <ScrollSpyProvider>
    <h1>Hello World!</h1>
  </ScrollSpyProvider>
)
```

### The Scroll Component

The scroll component is used to add React nodes to the observation tree. You can add an item using the following syntax.

The `id` props is the hash that will identify the section.
eg. http://localhost:3000/#my-new-section.

The `title` is the string that will be added to the observation tree and can be accessed later on using `useSpyScrollState`.

```js
function App() (
  <ScrollSpyComponent id="my-new-section" title="My New Section">
    <h1>My new section</h1>
  </ScrollSpyComponent>
)
```

### Making your own scroll component

You can make your own scroll component using the exposed `useSpyScroll` hook, which you can pass in as a hook value and will be added to the tree as well.

Remember to add the `data-title`, `data-parent` and `data-topic` params as well, for
