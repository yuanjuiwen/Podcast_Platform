import React from 'react'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { FolderSearch } from "lucide-react"
import { Button } from '@/components/ui/button'

const EmptyState = () => {
  return (
    <div >
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FolderSearch />
          </EmptyMedia>
            <EmptyTitle>No results found</EmptyTitle>
        </EmptyHeader>
      </Empty>
    </div>
  )
}

export default EmptyState
