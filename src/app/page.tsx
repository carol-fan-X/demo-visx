'use client'
import { ParentSize } from '@visx/responsive'
import TreemapDemo from './Treemapeg'
import ThreshHoldExample from './Thresholdeg'
import TemiTreemapDemo from './Treemapeg2'
import ClickExample from './checkOnclick'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div style={{ width: '1000px', height: '700px' }}>
        <ParentSize>
          {({ width, height }) => (
            <TemiTreemapDemo height={height} width={width} />
          )}
        </ParentSize>
      </div>
      <div style={{ width: '1000px', height: '700px', paddingTop: '40px' }}>
        <ThreshHoldExample />
      </div>

      <div style={{ width: '1000px', height: '500px', paddingTop: '40px' }}>
        <ParentSize>
          {({ width, height }) => (
            <ClickExample width={width} height={height} />
          )}
        </ParentSize>
      </div>

      <div style={{ width: '1000px', height: '500px', paddingTop: '40px' }}>
        <ParentSize>
          {({ width, height }) => <TreemapDemo height={height} width={width} />}
        </ParentSize>
      </div>
    </main>
  )
}
