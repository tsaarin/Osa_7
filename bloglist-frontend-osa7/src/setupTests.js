import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    console.log('setting storage mock:', key, ', ', item)
    savedItems[key] = item
  },
  getItem: (key) => savedItems[key],
  /* getItem: (key) => {
    console.log('getting storage mock for', key)
    console.log('found:', savedItems[key])
    console.log('all items:', savedItems)
    return savedItems[key]
  }, */
  clear: savedItems = {}
}

window.localStorage = localStorageMock