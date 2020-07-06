# ht-carousel

## Notes

- Using the Vue CLI framework w/ the carousel implemented as a self-contained component.
- Added packages sass/sass-loader for SCSS support and axios for HTTP requests.
- Loading images from provided mocky.io endpoint.
- Previous and next buttons advance the carousel in either direction, the strip will "wrap around" when the end of the strip is reached.
- A download image icon on the bottom-left of the image area triggers an automatic file download.
- Expand view icon on the bottom-right of image area toggles control strip and scales image to fit the available viewport.
- Load an image by URL via its index (if it exists, starting at 0) using this format: `/?img=3`.
- Keyboard shortcuts for left/right arrows (control strip) and ESC key (toggle expanded view).

## Project setup

```console
yarn install
```

### Compiles and hot-reloads for development

```console
yarn serve
```

### Compiles and minifies for production

```console
yarn build
```

### Lints and fixes files

```console
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
