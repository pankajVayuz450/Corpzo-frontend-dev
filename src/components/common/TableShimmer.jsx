import React from 'react'
import { ShimmerTable } from 'shimmer-effects-react'

const TableShimmer = ({row=10, col=5}) => {
  return (
    <div>
        <ShimmerTable mode="light" row={row} col={col} border={1} borderColor={"#cbd5e1"} rounded={0.25} rowGap={16} colPadding={[10, 5, 10, 5]} />
    </div>
  )
}

export default TableShimmer