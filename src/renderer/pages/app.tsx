import { useState, useContext } from 'react'
import { IconButton } from '@components/icon-button.jsx'
import { ArrowPathIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid'
import { MainAPIContext, urlUpdatedObservable } from '@renderer/app-context.js'
import { isURLString } from 'extra-utils'
import { go, toString } from '@blackglory/prelude'
import { useMount } from 'extra-react-hooks'

export function AppPage() {
  const mainAPI = useContext(MainAPIContext)
  const [url, setURL] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | undefined>()

  useMount(() => {
    const subscription = urlUpdatedObservable
      .subscribe(url => setURL(url))

    return () => subscription.unsubscribe()
  })

  return (
    <div className='w-screen h-screen overflow-hidden flex flex-col'>
      <nav className='px-2 py-1.5 flex gap-2 border-b'>
        <IconButton onClick={async () => {
          await mainAPI.goBack()
        }}>
          <ArrowLeftIcon className='w-5 h-5' />
        </IconButton>

        <IconButton onClick={async () => {
          await mainAPI.goForward()
        }}>
          <ArrowRightIcon className='w-5 h-5' />
        </IconButton>

        <IconButton onClick={async () => {
          await mainAPI.refresh()
        }}>
          <ArrowPathIcon className='w-5 h-5' />
        </IconButton>

        <input
          className='flex-1 rounded-l-full rounded-r-full px-4 bg-gray-100 focus:bg-white border border-gray-100 focus:border-gray-200'
          type='url'
          value={url}
          onChange={e => setURL(e.target.value)}
          onKeyUp={async e => {
            if (e.key === 'Enter') {
              const validURL = go(() => {
                const trimmedURL = url.trim()
                if (isURLString(trimmedURL)) return url
                if (trimmedURL.startsWith(':')) return 'http' + trimmedURL
                if (trimmedURL.startsWith('//')) return 'http:' + trimmedURL
                if (trimmedURL.startsWith('/')) return 'http:/' + trimmedURL
                if (/^\w+:\/\//.test(trimmedURL)) return trimmedURL
                return 'http://' + trimmedURL
              })
              setURL(validURL)

              try {
                await mainAPI.navigate(validURL)
              } catch (e) {
                setErrorMessage(toString(e))
              }
            }
          }}
        />
      </nav>

      <div className='flex-[1_0_0] flex items-center justify-center'>
        <pre>{errorMessage}</pre>
      </div>
    </div>
  )
}
