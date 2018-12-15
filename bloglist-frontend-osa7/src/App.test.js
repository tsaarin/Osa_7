import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app

  describe('when user is not logged in', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('should render only login form', () => {
      app.update()
      //const loginComponent = app.find(Togglable)
      //console.log(loginComponent.debug())

      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(0)
    })
  })

  // TODO FIX THIS SOMEHOW!!!!!!! EXERCISE 5.16 NOT DONE!!!!!
  describe('when user is logged in', () => {
    beforeEach(() => {
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      }
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      app = mount(<App />)
    })

    it.only('should render blogs when user is logged in', () => {
      app.update()
      console.log(app.find(App).debug())

      console.log('Test user:', window.localStorage.getItem('loggedBlogAppUser'))

      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(blogService.blogs.length)
    })

    afterAll(() => {
      window.localStorage.clear
    })
  })

})