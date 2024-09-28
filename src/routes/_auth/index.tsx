import { useMeasure } from '@uidotdev/usehooks'
import { useEffect, useRef, useState } from 'react'
import { createFileRoute, invariant } from '@tanstack/react-router'

import { cn } from '@/lib/utils'
import { Card, CardHeader } from '@/components/ui/card'
import { ColumnJobList } from '@/features/jobs/job-list'
import { GetColumnResponseBody, useColumns } from '@/api/columns'
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'

const HomeComponent = () => {
  const columns = useColumns()
  const [ref, { height }] = useMeasure()
  return (
    <div
      ref={ref}
      className="flex flex-col sm:flex-row sm:gap-1 flex-1 sm:px-2"
    >
      {columns.data?.map((column) => (
        <Column className={`sm:h-[${height}px]`} key={column.id} {...column} />
      ))}
    </div>
  )
}

export const Route = createFileRoute('/_auth/')({
  component: HomeComponent,
})

type ColumnHeaderProps = React.HTMLAttributes<HTMLDivElement>
const ColumnHeader = (props: ColumnHeaderProps) => {
  return (
    <Card className="p-0">
      <CardHeader className="p-2 px-4" {...props} />
    </Card>
  )
}

type ColumnProps = GetColumnResponseBody & { className?: string }
const Column = ({ className, ...column }: ColumnProps) => {
  const ref = useRef(null)
  const [isDraggedOver, setIsDraggedOver] = useState(false)

  useEffect(() => {
    const el = ref.current
    invariant(el)

    return dropTargetForElements({
      element: el,
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
    })
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col flex-1 bg-muted p-1 sm:rounded gap-1',
        isDraggedOver && 'bg-gray-900',
        className,
      )}
    >
      <ColumnHeader>
        <h3>{column.name}</h3>
      </ColumnHeader>
      <ColumnJobList columnId={column.id} />
    </div>
  )
}
