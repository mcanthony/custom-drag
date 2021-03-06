export default class Monitor {
  constructor(deTarget) {
    this._deTarget = deTarget
    this.reset()
  }

  reset() {
    this.data = Object.freeze({})
    this._lastEvent = undefined
    this._firstEvent = undefined
    this._moved = false
    this._over = false
    this._drag = false
  }

  addEvent(nativeEvent) {
    if (!nativeEvent) {
      return
    }

    const {type} = nativeEvent
    const event = {
      nativeEvent,
      clientX: nativeEvent.clientX,
      clientY: nativeEvent.clientY,
    }

    if (!this._firstEvent) {
      this._firstEvent = event
    }
    this._lastEvent = event

    if(type === 'mousemove') {
      this._moved = true
    }
  }

  getFirstEvent() {
    return this._firstEvent
  }

  getLastEvent() {
    return this._lastEvent
  }

  setData(newData) {
    this.data = Object.freeze({...this.data, ...newData})
  }

  getData() {
    return this.data
  }

  getClientOffset() {
    return this._getClientOffsetByEvent(this.getLastEvent())
  }

  getSourceClientOffset() {
    return this._getSourceClientOffsetByEvent(this.getLastEvent())
  }

  getInitialClientOffset() {
    return this._getClientOffsetByEvent(this.getFirstEvent())
  }

  getInitialSourceClientOffset() {
    return this._getSourceClientOffsetByEvent(this.getFirstEvent())
  }

  getDifferenceFromInitialOffset() {
    var first = this.getInitialSourceClientOffset()
    var last = this.getSourceClientOffset()

    return {
      x: last.x - first.x,
      y: last.y - first.y
    }
  }

  startDrag() {
    this._drag = true
  }

  stopDrag() {
    this._drag = false
  }

  isMoved() {
    return !!this._moved
  }

  setOver(over) {
    this._over = over
  }

  isOver() {
    return !!this._over
  }

  isDrag() {
    return !!this._drag
  }

  _getClientOffsetByEvent(event) {
    var {clientX, clientY} = event
    return {x: clientX, y: clientY}
  }

  _getSourceClientOffsetByEvent(event) {
    var {left, top} = this._deTarget.getBoundingClientRect()
    return {
      x: event.clientX - left,
      y: event.clientY - top
    }
  }
}
