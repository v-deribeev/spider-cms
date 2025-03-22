import { describe, it, expect, vi } from 'vitest'
import { useMatchData } from '../useMatchData'

// Replace the actual imports with our stubs
vi.mock('../../boot/axios.js', () => ({
  api: {
    get: () =>
      Promise.resolve({
        data: {
          result: [
            {
              stadium: { name: 'Test Stadium' },
              referee: { name: 'Test Referee' },
              teamA: [{ name: 'Player 1' }],
              teamB: [{ name: 'Player 2' }],
            },
          ],
        },
      }),
  },
}))

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key) => key,
  }),
}))

describe('useMatchData', () => {
  it('should fetch and process match data', async () => {
    const { matchData, loading, isError, fetchData } = useMatchData()

    await fetchData()

    expect(matchData.value).toBeDefined()
    expect(loading.value).toBe(false)
    expect(isError.value).toBe(false)
  })
})
