'use client'

import { useCallback } from 'react'
import { useMyPresence, useOthers } from '@/liveblocks.config'

import LiveCursors from './cursor/LiveCursors'

const Live = () => {
  const others = useOthers()
  const [{ cursor }, updateMyPresence] = useMyPresence() as any

  const handlePointerMove = useCallback(
    (event: React.PointerEvent) => {
      event.preventDefault()
      const x = event.clientX - event.currentTarget.getBoundingClientRect().x
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y

      updateMyPresence({ cursor: { x, y } })
    },
    [updateMyPresence]
  )

  const handlePointerLeave = useCallback(
    (event: React.PointerEvent) => {
      event.preventDefault()
      updateMyPresence({ cursor: null, message: null })
    },
    [updateMyPresence]
  )

  const handlePointerDown = useCallback(
    (event: React.PointerEvent) => {
      const x = event.clientX - event.currentTarget.getBoundingClientRect().x
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y

      updateMyPresence({ cursor: { x, y } })
    },
    [updateMyPresence]
  )

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      className='h-[100vh] w-full flex justify-center items-center text-center'>
      <h1 className='text-2xl text-white'>Figma Clone</h1>
      <LiveCursors others={others} />
    </div>
  )
}

export default Live
