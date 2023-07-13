export interface Shakespeare {
  id: string
  parent: string | null
  size: number | null
}

export const data: Shakespeare[] = [
  {
    id: 'All Areas',
    parent: null,
    size: null,
  },
  {
    id: 'Infestation at company',
    parent: 'All Areas',
    size: 175,
  },
  {
    id: 'Booth: Win an iPad',
    parent: 'All Areas',
    size: 167,
  },
  {
    id: 'Session: How to run virtual events',
    parent: 'All Areas',
    size: 202,
  },
  {
    id: 'Session: How to raise funds for your start-up',
    parent: 'All Areas',
    size: 298,
  },
  {
    id: 'Networking',
    parent: 'All Areas',
    size: 112,
  },
  {
    id: 'Why avocado is the next thing',
    parent: 'All Areas',
    size: 104,
  },
  {
    id: 'Booth: Ms X Ventures',
    parent: 'All Areas',
    size: 77,
  },
]

export default data
