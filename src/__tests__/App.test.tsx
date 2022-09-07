import { render, /* screen, */ act } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from '../App'

describe('#sum', () => {
    it('returns a sum', () => {
        expect(1 + 2).toBe(3)
    })
})

// describe('#app', () => {
//     it('App', () => {
//         act(() => {
//             render(<App />)
//         })
//     })
// })
