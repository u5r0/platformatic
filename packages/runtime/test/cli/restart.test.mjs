import assert from 'node:assert'
import { on } from 'node:events'
import { test } from 'node:test'
import { join } from 'desm'
import { request } from 'undici'
import getPort from 'get-port'
import { start } from './helper.mjs'

test('restart in case of a crash', async () => {
  process.env.PORT = await getPort()
  const config = join(import.meta.url, '..', '..', 'fixtures', 'restart-on-crash', 'platformatic.runtime.json')
  const { child, url } = await start('-c', config)

  {
    const res = await request(url + '/crash', {
      method: 'POST'
    })

    assert.strictEqual(res.statusCode, 200)
  }

  let found = false
  let foundListening = false
  child.stdout.setEncoding('utf8')
  for await (const messages of on(child.stdout, 'data')) {
    for (const message of messages) {
      if (/Error: Crash/.test(message)) {
        found = true
      }

      if (/listening/i.test(message)) {
        foundListening = true
      }
    }

    if (foundListening) {
      break
    }
  }

  assert.ok(found)

  {
    const res = await request(url + '/')
    assert.strictEqual(res.statusCode, 200)
  }

  child.kill('SIGINT')
  await child.catch(() => {})
})

test('restart in case of a crash before startup is completed', async () => {
  process.env.PORT = await getPort()
  const config = join(import.meta.url, '..', '..', 'fixtures', 'botched-start', 'platformatic.runtime.json')
  const { child } = await start('-c', config)

  let found = 0
  let foundListening = 0
  child.stdout.setEncoding('utf8')
  for await (const messages of on(child.stdout, 'data')) {
    for (const message of messages) {
      if (/Error: Crash/.test(message)) {
        found++
      }

      if (/listening/i.test(message)) {
        foundListening++
      }
    }

    if (foundListening === 2) {
      break
    }
  }

  assert.equal(found, 2)

  child.kill('SIGINT')
  await child.catch(() => {})
})
