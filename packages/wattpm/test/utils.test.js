import { test } from 'node:test'
import { strictEqual } from 'node:assert'
import { getPackageManager } from '../lib/utils.js'
import { join } from 'node:path'
import { mkdtemp, rmdir, unlink, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'

test('getPackageManager - should return the right package manager, depending on the cases', async () => {
  const tmpDir = await mkdtemp(join(tmpdir(), 'wattpm-tests-'))
  strictEqual(getPackageManager('wrong'), 'npm', 'path is wrong, default to npm')

  const tmpYarnFile = join(tmpDir, 'yarn.lock')
  await writeFile(tmpYarnFile, '-')
  strictEqual(getPackageManager(tmpDir), 'yarn', 'path is correct, and we identify yarn')
  await unlink(tmpYarnFile)

  const tmpPnpmFile = join(tmpDir, 'pnpm-lock.yaml')
  await writeFile(tmpPnpmFile, '-')
  strictEqual(getPackageManager(tmpDir), 'pnpm', 'path is correct, and we identify pnpm')
  await unlink(tmpPnpmFile)

  strictEqual(getPackageManager(tmpDir), 'npm', 'path is correct, but no file are found, so we default to npm')
  await rmdir(tmpDir)
})