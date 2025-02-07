import { isFileAccessible } from '../cli.mjs'
import { moveToTmpdir } from './helper.js'
import { test, after } from 'node:test'
import { equal } from 'node:assert'
import { join } from 'path'
import * as desm from 'desm'
import { execa } from 'execa'
import { promises as fs } from 'fs'
import { readFile } from 'fs/promises'

const testName = 'optional-body'
test(testName, async (t) => {
  const openapi = desm.join(import.meta.url, 'fixtures', testName, 'openapi.json')
  const dir = await moveToTmpdir(after)

  const pltServiceConfig = {
    $schema: 'https://schemas.platformatic.dev/@platformatic/service/1.52.0.json',
    server: {
      hostname: '127.0.0.1',
      port: 0
    },
    plugins: {
      paths: ['./plugin.js']
    }
  }

  await fs.writeFile('./platformatic.service.json', JSON.stringify(pltServiceConfig, null, 2))

  // Checking props-optional param
  await execa('node', [desm.join(import.meta.url, '..', 'cli.mjs'), openapi, '--name', testName, '--full', '--props-optional'])
  equal(await isFileAccessible(join(dir, testName, `${testName}.cjs`)), false)

  const typeFile = join(dir, testName, `${testName}.d.ts`)
  const data = await readFile(typeFile, 'utf-8')
  equal(data.includes(`
  export type PostHelloRequest = {
    body: {
      'name'?: string;
      'userId'?: string;
    }
  }`), true, 'properties are optional')

  // Checking default behavior
  await execa('node', [desm.join(import.meta.url, '..', 'cli.mjs'), openapi, '--name', 'defaulted', '--full'])
  equal((await readFile(join(dir, 'defaulted', 'defaulted.d.ts'), 'utf-8')).includes(`
  export type PostHelloRequest = {
    body: {
      'name': string;
      'userId': string;
    }
  }`), true, 'properties are required')
})
