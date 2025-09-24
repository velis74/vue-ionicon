# vue-ionicon

Caching icon loader with an emphasis for loading the Ionicons directly from the CDN.

## Demo

https://www.velis.si/ion-icon/

## Features

* Renders sanitised SVG
* Loads from Ionicons CDN, any local URL, any full URL or SVG literal
* Caches loaded icons, there will be only one HTTP request per icon
* Applies currentColor to icons: if colour is not otherwise specified, icons will have same color as HTML text

## Installing

```bash
npm install --save vue-ionicon
```

## Using

```html
<template>
  <div>
    <!-- will load by name from Ionicons CDN -->
    <IonIcon name="warning"/>

    <!-- will load from your own server or any other if full URL is provided -->
    <IonIcon name="/images/my-custom-icon.svg"/>

    <!-- will display the provided SVG, but with all processing (sanitizing, applying currentColor) -->
    <IonIcon :name="<svg...mySvgLiteral</svg>"/>
  </div>
</template>
```

```javascript
<script>
  import IonIcon from 'vue-ionicon';

  export default {
    name: 'myAwesomeComponent',
    components: { IonIcon },
    ...
  }
</script>
```

## Credits

* [Vue](https://vuejs.org) The Progressive JavaScript Framework
* [Ionicons](https://github.com/ionic-team/ionicons) project
* [DOMPurify](https://github.com/cure53/DOMPurify) project