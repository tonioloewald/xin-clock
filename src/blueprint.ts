import { XinBlueprint, PartsMap } from 'xinjs'

interface SwissClockParts extends PartsMap {
  assembly: SVGGElement
  face: SVGCircleElement
  hour: SVGPathElement
  minute: SVGPolygonElement
  second: SVGPathElement
}

export const swissClock: XinBlueprint = (tag, factory) => {
  const { Component, svgElements, elements, vars } = factory
  const { svg, g, circle, polygon, path } = svgElements
  const { div, xinSlot } = elements

  class SwissClock extends Component {
    timezone: string | null = null
    offset = 0
    time: string | null = null
    interval: any | null = null
    updateInterval = 1000

    constructor() {
      super()

      this.initAttributes('timezone', 'time', 'offset', 'updateInterval')
    }

    content = () => [
      svg(
        {
          viewBox: '0 0 600 600',
          version: '1.1',
          xmlns: 'http://www.w3.org/2000/svg',
          'xmlns:xlink': 'http://www.w3.org/1999/xlink',
        },
        g(
          {
            part: 'assembly',
            stroke: 'none',
            fill: 'none',
            fillRule: 'evenodd',
          },
          circle({
            part: 'face',
            class: 'face',
            fillRule: 'nonzero',
            cx: '300',
            cy: '300',
            r: '291.54',
          }),
          polygon({
            part: 'hour',
            class: 'hour',
            fillRule: 'nonzero',
            points: '286.17 127.81 312.58 127.81 315.22 362.85 283.53 362.85',
          }),
          polygon({
            part: 'minute',
            class: 'minute',
            fillRule: 'nonzero',
            points: '289.21 46.22 310.34 46.22 312.98 363.12 286.57 363.12',
          }),
          path({
            part: 'second',
            class: 'second',
            fillRule: 'nonzero',
            d: 'M300,102.93 C315.31,102.93 327.72,115.35 327.72,130.66 C327.72,145.08 316.72,156.92 302.66,158.26 L304.48,390.78 L296.56,390.78 L294.73,157.89 C281.93,155.43 272.27,144.17 272.27,130.66 C272.27,115.35 284.68,102.93 300,102.93 Z',
          }),
          circle({
            class: 'pin',
            fillRule: 'nonzero',
            cx: 300,
            cy: 300,
            r: 3,
          })
        )
      ),
      div({ class: 'caption' }, xinSlot()),
    ]

    timezoneOffset(timeNow: Date): number {
      const offset = this.offset
      if (!this.timezone) {
        return offset
      }
      const localOffset = this.time ? 0 : timeNow.getTimezoneOffset() / 60
      return (
        offset +
        Number(
          Intl.DateTimeFormat('en-GB', {
            hour: 'numeric',
            minute: 'numeric',
            timeZoneName: 'shortOffset',
            timeZone: this.timezone,
          })
            .format(timeNow)
            .split('GMT')
            .pop()!
            .replace(/:30/, '.5')
        ) +
        localOffset
      )
    }

    update() {
      if (this.time) {
        this.killInterval
      } else if (!this.interval) {
        this.interval = setInterval(
          this.queueRender.bind(this),
          this.updateInterval
        )
      }

      const { hour, minute, second } = this.parts as SwissClockParts
      const time = this.time ? new Date(this.time) : new Date()
      this.ariaLabel = time.toLocaleTimeString()
      let s = time.getSeconds()
      const offset = this.timezoneOffset(time)
      const m = ((time.getMinutes() + 60 * offset) % 60) + s / 60
      const h = time.getHours() + m / 60 + Math.floor(offset)
      hour.setAttribute('transform', `rotate(${h * 30}, 300, 300)`)
      minute.setAttribute('transform', `rotate(${m * 6}, 300, 300)`)
      if (this.updateInterval > 1000) {
        second.style.display = 'none'
      } else {
        second.style.display = ''
        const ms =
          Math.round(time.getMilliseconds() / this.updateInterval) *
          this.updateInterval
        s += ms * 0.001
        second.setAttribute('transform', `rotate(${s * 6}, 300, 300)`)
      }
    }

    connectedCallback() {
      super.connectedCallback()
      const { assembly, hour } = this.parts
      for (let minute = 0; minute < 60; minute++) {
        if (minute % 5 === 0) {
          assembly.insertBefore(
            polygon({
              class: 'hour-tick',
              fillRule: 'nonzero',
              transform: `rotate(${minute * 6}, 300, 300)`,
              points: '289.43 35.91 310.56 35.91 310.56 100.61 289.43 100.61',
            }),
            hour
          )
        } else {
          assembly.insertBefore(
            polygon({
              class: 'minute-tick',
              fillRule: 'nonzero',
              transform: `rotate(${minute * 6}, 300, 300)`,
              points: '303.91 36.26 296.08 36.26 296.08 58.26 303.91 58.26',
            }),
            hour
          )
        }
      }

      this.update()
    }

    private killInterval() {
      if (this.interval) {
        clearInterval(this.interval)
        this.interval = null
      }
    }

    disconnectedCallback(): void {
      super.disconnectedCallback()

      this.killInterval
    }

    role = 'time'

    render() {
      super.render()

      this.update()
    }
  }

  return {
    type: SwissClock,
    styleSpec: {
      ':root': {
        _swissClockFaceStroke: '#D3D3D3',
        _swissClockFaceStrokeWidth: '16.9',
        _swissClockFaceFill: '#FFFFFF',
        _swissClockTickFill: '#404040',
        _swissClockHourFill: '#202020',
        _swissClockMinuteFill: '#202020',
        _swissClockSecondFill: '#D02020',
        _swissClockPinFill: '#707070',
        _swissClockSize: '256px',
      },
      ':host': {
        display: 'inline-block',
        position: 'relative',
        width: vars.swissClockSize,
        height: vars.swissClockSize,
      },
      ':host .face': {
        width: '100%',
        height: '100%',
        stroke: vars.swissClockFaceStroke,
        strokeWidth: vars.swissClockFaceStrokeWidth,
        fill: vars.swissClockFaceFill,
      },
      ':host .hour-tick, :host .minute-tick': {
        fill: vars.swissClockTickFill,
      },
      ':host .hour': {
        fill: vars.swissClockHourFill,
      },
      ':host .minute': {
        fill: vars.swissClockMinuteFill,
      },
      ':host .second': {
        fill: vars.swissClockSecondFill,
      },
      ':host .caption': {
        position: 'absolute',
        display: 'block',
        textAlign: 'center',
        left: 0,
        right: 0,
        top: '70%',
        transform: 'translateY(-50%)',
      },
      ':host .pin': {
        fill: vars.swissClockPinFill,
      },
    },
  }
}

export default swissClock
