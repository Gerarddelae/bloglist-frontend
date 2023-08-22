import React from 'react'
import "@testing-library/jest-dom";
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders by default blog title and author', () => {
  const blog = {
    title: 'valid title',
    author: 'valid author',
    url: 'valid url',
    likes: 0
  }
  
  const component = render(
    <Blog blog={blog}/>
  )

  expect(component.container).toHaveTextContent('valid title')
  expect(component.container).toHaveTextContent('valid author')
  //expect(component.container).not.toHaveTextContent('valid url')
})