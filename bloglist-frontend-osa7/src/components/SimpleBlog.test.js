import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  it('renders title, author and the amount of likes', () => {
    const blog = {
      title: 'Test',
      author: 'Tommi',
      likes: 9
    }

    const simpleBlogComponent = shallow(<SimpleBlog blog={blog} />)

    const basicBlogInfoDiv = simpleBlogComponent.find('.basicBlogInfo')
    expect(basicBlogInfoDiv.text()).toContain(blog.title)
    expect(basicBlogInfoDiv.text()).toContain(blog.author)

    const blogLikesDiv = simpleBlogComponent.find('.blogLikes')
    expect(blogLikesDiv.text()).toContain(blog.likes)
  })
  it('clicking the button twice calls event handler twice', () => {
    const blog = {
      title: 'Test',
      author: 'Tommi',
      likes: 9
    }
  
    const mockHandler = jest.fn()
  
    const simpleBlogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler}/>)
  
    const button = simpleBlogComponent.find('button')
    button.simulate('click')
    button.simulate('click')    
  
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})