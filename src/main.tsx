import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('root')
if (!container) {
    throw new Error('Root container not found')
}
container.style.position = 'relative'
const root = createRoot(container)
root.render(<App></App>)

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
