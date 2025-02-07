'use strict'

const { Readable, Writable } = require('node:stream')
const { kITC } = require('./symbols')

const noop = () => {}

class RemoteCacheStore {
  #onRequest
  #onCacheHit
  #onCacheMiss
  #logger

  constructor (opts = {}) {
    this.#onRequest = opts.onRequest ?? noop
    this.#onCacheHit = opts.onCacheHit ?? noop
    this.#onCacheMiss = opts.onCacheMiss ?? noop
    this.#logger = opts.logger
  }

  async get (request) {
    try {
      this.#onRequest(request)
    } catch (err) {
      this.#logger.error(err, 'Error in onRequest http cache hook')
    }

    const itc = globalThis[kITC]
    if (!itc) return

    const cachedValue = await itc.send('getHttpCacheValue', {
      request: this.#sanitizeRequest(request)
    })
    if (!cachedValue) {
      try {
        this.#onCacheMiss(request)
      } catch (err) {
        this.#logger.error(err, 'Error in onCacheMiss http cache hook')
      }
      return
    }

    const readable = new Readable({ read () {} })
    readable.push(cachedValue.payload)
    readable.push(null)

    try {
      this.#onCacheHit(request, cachedValue.response)
    } catch (err) {
      this.#logger.error(err, 'Error in onCacheHit http cache hook')
    }

    return {
      ...cachedValue.response,
      body: readable
    }
  }

  createWriteStream (request, response) {
    const itc = globalThis[kITC]
    if (!itc) throw new Error('Cannot write to cache without an ITC instance')

    let payload = ''

    request = this.#sanitizeRequest(request)

    return new Writable({
      write (chunk, encoding, callback) {
        payload += chunk
        callback()
      },
      final (callback) {
        itc.send('setHttpCacheValue', { request, response, payload })
          .then(() => callback())
          .catch((err) => callback(err))
      }
    })
  }

  delete (request) {
    const itc = globalThis[kITC]
    if (!itc) throw new Error('Cannot delete from cache without an ITC instance')

    request = this.#sanitizeRequest(request)
    itc.send('deleteHttpCacheValue', { request })
    // TODO: return a Promise
  }

  #sanitizeRequest (request) {
    return {
      origin: request.origin,
      method: request.method,
      path: request.path,
      headers: request.headers
    }
  }
}

module.exports = RemoteCacheStore
