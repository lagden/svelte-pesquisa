# pesquisa-webcomponent

[![NPM version][npm-img]][npm]


[npm-img]:         https://img.shields.io/npm/v/@tadashi/svelte-pesquisa.svg
[npm]:             https://www.npmjs.com/package/@tadashi/svelte-pesquisa

---

Svelte component

## Install

```
$ npm i -S @tadashi/svelte-pesquisa
```


## Usage

Example: https://codepen.io/lagden/pen/oNezyyv?editors=1010

```html
<script type="module" src="https://unpkg.com/@tadashi/svelte-pesquisa@{VERSION}/dist/Pesquisa.js"></script>

<tadashi-pesquisa
  endpoint="https://ws.apicep.com/cep.json"
  prop="code"
  method="get"
>
  <input type="text" name="q">
</tadashi-pesquisa>

<script>
  const pesquisa = document.querySelector('tadashi-pesquisa')
  pesquisa.addEventListener('response', console.log)
</script>
```


## License

MIT © [Thiago Lagden](https://github.com/lagden)
