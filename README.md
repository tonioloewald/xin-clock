# xin-clock

This is an implemention of the Swiss Railway Clock adapted from an old
[b8rjs demo component](https://b8rjs.com/?source=components/swiss-clock.js).
It is implemented as a xinjs `blueprint` (i.e. a component definition with
no included code from xinjs).

## Configuration

By default, the clock will update once per second, but you can set a
different `update-interval` (in milliseconds) if so desired.

If you set an `update-interval` that is over 1000, the second-hand will
automatically be hidden.

And you can set a timezone offset using the `timezone` (e.g. 'Europe/Helsinki') or `offset` (e.g. `3`).

Here's the time in "Australia/Sydney" and "America/Denver". `update-interval` has been set
to 10s (10000ms), so the second hands will not be displayed.

```
<xin-clock
  class="small"
  update-interval="10000"
  timezone="Australia/Sydney"
>
```

You can display a fixed time using the `time` (assumed to be an ISO time stamp).

```
<xin-clock
  class="small"
  time="1976-04-01T08:23:45.678Z"
  timezone="America/Los_Angeles"
></xin-clock>
</div>
```

You can get a list of supported timezones using `Intl.supportedValuesOf('timeZone')`.
[`Intl` Dodcumentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)

```html
<xin-clock
  time="1976-04-01T08:23:45.678Z"
  timezone="America/Los_Angeles"
></xin-clock>
```

## Loading a blueprint

If you just want to bundle the component…

```
import { makeComponent } from 'xinjs'
import blueprint from 'xin-clock'

const xinClock = makeBlueprint('xin-clock', blueprint).creator

document.body.append(xinClock())
```

If you want to use a CDN:

```
<script type="module">
  import 'https://cdn.jsdelivr.net/npm/xinjs@0.7.1/dist/module.js'
</script>
<xin-loader>
  <xin-blueprint tag="xin-clock" src="https://tonioloewald.github.io/xin-clock/dist/blueprint.js"></xin-blueprint>
</xin-loader>
<xin-clock></xin-clock>
```

You can also use `<xin-loader>` and `<xin-blueprint>` or `makeComponent` to load blueprints at runtime.

## Development

This project is designed for use with [Bun](https://bun.sh).

The blueprint code is `./src/blueprint.ts` and unless it's complicated there's no reason
it can't all be in one source file.

`./index.html` exercises your blueprint.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun start
```
