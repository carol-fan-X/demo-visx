import { Shakespeare } from './data'

const shakespeare: Shakespeare[] = [
  {
    id: 'Shakespeare',
    parent: null,
    size: 0,
  },
  {
    id: 'Comedies',
    parent: 'Shakespeare',
    size: null,
  },
  {
    id: 'Tragedies',
    parent: 'Shakespeare',
    size: null,
  },
  {
    id: 'Histories',
    parent: 'Shakespeare',
    size: null,
  },
  {
    id: 'As You Like It',
    parent: 'Comedies',
    size: null,
  },
  {
    id: 'Adam',
    parent: 'As You Like It',
    size: 10,
  },
  {
    id: 'Amiens',
    parent: 'As You Like It',
    size: 10,
  },
  {
    id: 'Audrey',
    parent: 'As You Like It',
    size: 12,
  },
  {
    id: 'Celia',
    parent: 'As You Like It',
    size: 18,
  },
  {
    id: 'Charles',
    parent: 'As You Like It',
    size: 8,
  },
  {
    id: 'Corin',
    parent: 'As You Like It',
    size: 24,
  },
  {
    id: 'Dennis',
    parent: 'As You Like It',
    size: 12,
  },
  {
    id: 'Duke',
    parent: 'As You Like It',
    size: 32,
  },
  {
    id: 'Frederick',
    parent: 'As You Like It',
    size: 20,
  },
]
export default shakespeare
