import React from 'react'
import "@testing-library/jest-dom";
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  beforeEach(() => {
    const blog = {
      title: 'valid title',
      author: 'valid author',
      url: 'valid url',
      likes: 0
    }
    
    component = render(
      <Blog blog={blog} handleDelete={() => ''} handleLike={() => ''}/>
    )
  })
  
  test('renders by default blog title and author', () => {
    
  
    const div1 = component.container.querySelector('.showByDefault')
    expect(div1).toHaveTextContent('valid title')
    expect(div1).toHaveTextContent('valid author')
  
  
    const div2 = component.container.querySelector('.hiddenByDefault')
    expect(div2).toHaveStyle('display: none')
  })
})
