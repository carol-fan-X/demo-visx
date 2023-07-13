import React from 'react'
import { useRef } from 'react'
import { Group } from '@visx/group'
import { Text } from '@visx/text'
import { useTooltip, Tooltip } from '@visx/tooltip'
import { Treemap, hierarchy, stratify, treemapSquarify } from '@visx/hierarchy'
import data, { Shakespeare } from '../datas/data'
import './styles.css'
import { scaleLinear } from '@visx/scale'
import { localPoint } from '@visx/event'

const margin = { top: 0, right: 0, left: 0, bottom: 0 }

const filteredData = data.filter((d) => d.size != null)
const minValue = Math.min(...filteredData.map((d) => d.size!))
const maxValue = Math.max(...filteredData.map((d) => d.size!))
const color1 = '#BDD2FF'
const color2 = '#153780'

// trying to see if I can split the min-max values into 10, so the values
// into any of the 10 colors but it did not work
const createvalues10 = (min: number, max: number) => {
  const avg = (max - min) / 8

  const arr = [min]
  let i
  for (i = 1; i < 9; i++) {
    arr.push(min + avg * i)
  }

  arr.push(max)

  console.log(arr, avg, max, min)
}

const domain = createvalues10(minValue, maxValue)

export const graphColor10 = '#ECF2FF'
export const graphColor20 = '#D6E3FF'
export const graphColor30 = '#BDD2FF'
// export const graphColor40 = '#8DB5FF'
export const graphColor50 = '#6491FC'
export const graphColor60 = '#175FFF'
export const graphColor70 = '#1555E3'
// export const graphColor80 = '#154CC4'
export const graphColor40 = 'grey'
export const graphColor80 = '#ECF2FF'

export const graphColor90 = '#1642A2'
export const graphColor100 = '#153780'

export const graphColorsArray2 = [
  graphColor10,
  graphColor20,
  graphColor30,
  graphColor40,
  graphColor50,
  graphColor60,
  graphColor70,
  graphColor80,
  graphColor90,
  graphColor100,
]

const colorScale = scaleLinear({
  domain: [minValue, maxValue],
  range: [graphColor80, graphColor40],
  clamp: true,
})

console.log('filt', minValue, 'data', maxValue)

// I added this just now. An hack for the text overlap thing
// I mentioned. Seems to work
const getLineLength = (sentence: string, width: number) => {
  let sum = 0
  let res = 0
  const words = sentence.split(' ')
  for (let i = 0; i < words.length; i++) {
    const word = words[i]
    const l = word.length * 6 + 6

    sum += l
    if (sum > width) {
      res += 1
      sum = l
    }
  }

  return res + 1
}

// implementation starts here
const TemiTreemapDemo = ({
  width,
  height,
  events = false,
}: {
  width: number
  height: number
  events?: boolean
}) => {
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip()
  console.log(tooltipOpen, tooltipData)
  const svgRef = useRef<SVGSVGElement>(null)

  let tooltipTimeout
  //   const sdata = stratify()
  //     .id((d) => d.are)
  //     .parentId((d) => d.parent)(data)
  //     .sum((d) => d.size || 0)

  const sdata = stratify<Shakespeare>()
    .id((d) => d.id)
    .parentId((d) => d.parent)(data)
    .sum((d) => d.size ?? 0)

  const root = hierarchy(sdata).sort((a, b) => (b.value || 0) - (a.value || 0))

  return width < 10 ? null : (
    <div>
      <svg width={width} height={height} ref={svgRef}>
        <rect width={width} height={height} rx={12} fill={'#114b5f'} />
        <Treemap
          top={margin.top}
          root={root}
          size={[width, height]}
          tile={treemapSquarify}
          round
        >
          {(treemap) => (
            <Group>
              {treemap
                .descendants()
                .reverse()
                .map((node, i) => {
                  const nodeWidth = node.x1 - node.x0
                  const nodeHeight = node.y1 - node.y0
                  const nodeLines = getLineLength(node.data.id!, nodeWidth - 30)

                  return (
                    <Group
                      id={`node-${i}`}
                      key={`node-${i}`}
                      top={node.y0 + margin.top}
                      left={node.x0 + margin.left}
                    >
                      {node.depth === 1 && (
                        <>
                          <rect
                            width={nodeWidth}
                            height={nodeHeight}
                            stroke={'#ffffff'}
                            fill={colorScale(node.value!)}
                            onClick={() => {
                              console.log(node)
                            }}
                            onMouseMove={() => {
                              if (tooltipTimeout!) clearTimeout(tooltipTimeout)
                              const top = node.y1 - nodeHeight / 4
                              const left = node.x1 - nodeWidth / 4
                              showTooltip({
                                tooltipData: {
                                  name: node.data.id,
                                  value: node.data.value,
                                  percent: node.data.value,
                                },
                                tooltipTop: top,
                                tooltipLeft: left,
                              })
                            }}
                            onMouseLeave={() => {
                              tooltipTimeout = window.setTimeout(() => {
                                hideTooltip()
                              }, 300)
                            }}
                          />

                          <Text
                            x={'10'}
                            y={'20'}
                            fill={'blue'}
                            width={nodeWidth}
                            verticalAnchor={'start'}
                            fontWeight={400}
                            fontFamily={'Inter'}
                            fontSize={'14px'}
                            lineHeight={'20px'}
                          >
                            {node.data.id}
                          </Text>
                          <Text
                            x={'10'}
                            y={'40'}
                            dx={'3em'}
                            dy={nodeLines * 20}
                            fill={'green'}
                            fontSize={'18px'}
                            fontWeight={700}
                            fontFamily={'Inter'}
                          >
                            {node.data.value}
                          </Text>
                          <Text
                            x={'10'}
                            y={'70'}
                            dx={'3em'}
                            dy={nodeLines * 20}
                            fill={'#e41010'}
                            fontSize={'18px'}
                            fontWeight={700}
                            fontFamily={'Inter'}
                          >
                            {node.data.value! / 500}
                          </Text>
                        </>
                      )}
                    </Group>
                  )
                })}
            </Group>
          )}
        </Treemap>
      </svg>

      {tooltipOpen && tooltipData && (
        <Tooltip
          top={tooltipTop}
          left={tooltipLeft}
          className="treemap-tooltip"
        >
          <div>
            <p>titleXXXX</p>
          </div>
          <div className="treemap-tooltip-content" style={{ paddingTop: 8 }}>
            <span>Number of custom</span>
            <br />
          </div>
          <div className="treemap-tooltip-content" style={{ paddingTop: 8 }}>
            <span>
              <strong>100000人</strong>
            </span>
          </div>
        </Tooltip>
      )}
    </div>
  )
}

export default TemiTreemapDemo
