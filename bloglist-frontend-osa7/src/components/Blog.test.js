import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
  it('after clicking name the details are displayed', () => {
    const blog = {
      title: 'Test',
      author: 'Tommi',
      url: 'testurl',
      likes: 9,
      user: {
        username: 'Test',
        name: 'theonewhoadded'
      }
    }

    const mockHandler = jest.fn()

    const blogInfoDiv = shallow(<Blog blog={blog} toggleInfo={mockHandler}/>)
    expect(blogInfoDiv.text()).toContain(blog.title)
    expect(blogInfoDiv.text()).toContain(blog.author)

    blogInfoDiv.simulate('click')

    const blogDetailsDiv = blogInfoDiv.find('.blogDetails')
    expect(blogDetailsDiv.text()).toContain(blog.url)
    expect(blogDetailsDiv.text()).toContain(blog.likes)
    expect(blogDetailsDiv.text()).toContain(blog.user.name)
  })
})
