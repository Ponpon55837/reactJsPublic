import React, { useRef } from 'react'
import { DropTargetMonitor, XYCoord, useDrag, useDrop } from 'react-dnd'
import styled from 'styled-components'

const Wrapper = styled('div')<{ isDragging: number }>`
  opacity: ${(props: any) => (props.isDragging ? 0.3 : 1)};
`

interface DraggableProps {
  handleMove: (dragIndex: number, hoverIndex: number) => void
  index: number
  id: number | string
  children: React.ReactNode
  handleStop: () => void
}

interface DragItem {
  index: number
  id: string
  type: string
}

const Draggable = ({ children, handleMove, index, id, handleStop }: DraggableProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const [, drop] = useDrop({
    accept: 'todoItem',
    hover: (item: DragItem, monitor: DropTargetMonitor) => {
      if (!ref.current) {
        return
      }

      const dragIndex: number = item.index
      const hoverIndex: number = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect: DOMRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY: number = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset: XYCoord = monitor.getClientOffset()!
      const hoverClientY: number = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      handleMove(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'todoItem',
    item: () => {
      return { id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
    end: () => {
      handleStop()
    },
  })
  drag(drop(ref))

  return (
    <Wrapper ref={ref} isDragging={isDragging ? 1 : 0}>
      {children}
    </Wrapper>
  )
}

export default React.memo(Draggable)
