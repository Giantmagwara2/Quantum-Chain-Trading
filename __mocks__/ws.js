class MockWebSocket {
  constructor(url) {
    this.url = url
    this.readyState = MockWebSocket.CONNECTING
    this.onopen = null
    this.onclose = null
    this.onmessage = null
    this.onerror = null

    // Simulate connection opening
    setTimeout(() => {
      this.readyState = MockWebSocket.OPEN
      if (this.onopen) {
        this.onopen({ type: "open" })
      }
    }, 10)
  }

  send(data) {
    if (this.readyState === MockWebSocket.OPEN) {
      // Simulate message echo for testing
      setTimeout(() => {
        if (this.onmessage) {
          this.onmessage({
            type: "message",
            data: `Echo: ${data}`,
          })
        }
      }, 5)
    }
  }

  close() {
    this.readyState = MockWebSocket.CLOSED
    if (this.onclose) {
      this.onclose({ type: "close" })
    }
  }

  addEventListener(event, handler) {
    if (event === "open") this.onopen = handler
    if (event === "close") this.onclose = handler
    if (event === "message") this.onmessage = handler
    if (event === "error") this.onerror = handler
  }

  removeEventListener(event, handler) {
    if (event === "open" && this.onopen === handler) this.onopen = null
    if (event === "close" && this.onclose === handler) this.onclose = null
    if (event === "message" && this.onmessage === handler) this.onmessage = null
    if (event === "error" && this.onerror === handler) this.onerror = null
  }
}

MockWebSocket.CONNECTING = 0
MockWebSocket.OPEN = 1
MockWebSocket.CLOSING = 2
MockWebSocket.CLOSED = 3

module.exports = MockWebSocket
