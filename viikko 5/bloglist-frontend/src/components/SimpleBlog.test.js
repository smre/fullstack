import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders correct content', () => {
    const blog = {
      title: "How to build a hut",
      author: "Dusty Shackleford",
      likes: 38,
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const titleDiv = blogComponent.find('.title');
    const likesDiv = blogComponent.find('.likes');

    expect(titleDiv.text()).toContain(blog.author);
    expect(titleDiv.text()).toContain(blog.title);
    expect(likesDiv.text()).toContain(blog.likes);
  })
})