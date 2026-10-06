import { expect, test } from '@playwright/test'

const baseUrl = process.env.JSONPLACEHOLDER_BASE_URL || 'https://jsonplaceholder.typicode.com'

test.describe('JSONPlaceholder API behavior checks', () => {
  test('POST with an excessively long title is accepted by the mock API', async ({ request }) => {
    const longTitle = 'A'.repeat(4000)
    const response = await request.post(`${baseUrl}/posts`, {
      data: {
        title: longTitle,
        body: 'Valid test body for long title scenario.',
        userId: 1,
      },
    })

    expect(response.status()).toBeGreaterThanOrEqual(200)
    expect(response.status()).toBeLessThan(300)

    const body = await response.json()
    expect(body).toHaveProperty('id')
    expect(body).toHaveProperty('title', longTitle)
    expect(body).toHaveProperty('body', 'Valid test body for long title scenario.')
    expect(body).toHaveProperty('userId', 1)
  })

  test('POST with special characters does not fail the mock API', async ({ request }) => {
    const payload = {
      title: '🚀 Launch & café — résumé / special chars: <>&"\'@#$',
      body: 'Line 1\nLine 2 with emoji 🚀 and accented text: äöü, and symbols <> & \"',
      userId: 2,
    }

    const response = await request.post(`${baseUrl}/posts`, { data: payload })
    expect(response.status()).toBeGreaterThanOrEqual(200)
    expect(response.status()).toBeLessThan(300)

    const body = await response.json()
    expect(body).toHaveProperty('id')
    expect(body).toHaveProperty('title', payload.title)
    expect(body).toHaveProperty('body', payload.body)
    expect(body).toHaveProperty('userId', 2)
  })

  test('POST without userId is accepted by JSONPlaceholder and does not produce a 5xx', async ({ request }) => {
    const response = await request.post(`${baseUrl}/posts`, {
      data: {
        title: 'Missing userId edge case',
        body: 'This payload intentionally omits userId to validate actual JSONPlaceholder behavior.',
      },
    })

    const body = await response.json()

    expect(response.status()).toBeGreaterThanOrEqual(200)
    expect(response.status()).toBeLessThan(500)
    expect(body).toHaveProperty('id')
    expect(body).toHaveProperty('title', 'Missing userId edge case')
    expect(body).toHaveProperty('body', 'This payload intentionally omits userId to validate actual JSONPlaceholder behavior.')
    if ('userId' in body) {
      expect(body.userId).toBeUndefined()
    }
  })
})
