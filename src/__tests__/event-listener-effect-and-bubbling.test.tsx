import { screen, render, cleanup } from '@testing-library/react'
import { act, useEffect, useState } from 'react'
import { userEvent } from '@testing-library/user-event'

function App() {
    const [opened, setOpen] = useState(false)
    return (
        <>
            <button
                onClick={(e) => {
                    console.log('click')
                    setOpen(true)
                }}
            >
                CLICK
            </button>
            {opened && <Modal />}
        </>
    )
}
function Modal() {
    useEffect(() => {
        console.log('setup')
        const listener = () => console.log('click bubbling')
        window.addEventListener('click', listener)
        return () => {
            console.log('cleanup')
            window.removeEventListener('click', listener)
        }
    }, [])
    console.log('render')
    return <>Modal</>
}

const consoleLogs: string[] = []
jest.spyOn(console, 'log').mockImplementation((...args) => {
    consoleLogs.push(args.join(' '))
})
describe('event listener effect and bubbling', () => {
    beforeEach(() => {
        render(<App />)
    })
    afterEach(() => {
        cleanup()
    })
    it('should work', async () => {
        await act(async () => {
            await userEvent.click(screen.getByText('CLICK'))
        })
        expect(consoleLogs).toEqual(['click', 'render', 'setup']) // actually there is a click bubbling event running in browser
    })
})
