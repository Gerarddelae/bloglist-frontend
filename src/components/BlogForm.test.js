import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let component
  const mockHandler = jest.fn()
  beforeEach(() => {
    component = render(
      <BlogForm 
        addBlog={mockHandler}
        newBlog='valid title'  
        newAuthor='valid author'
        newUrl='valid url'
        setNewAuthor={() => {}}
        setNewBlog={() => {}}
        setNewUrl={() => {}}
      />
    )
  })

  test('blogform have the right props and calls the controller', () => {
    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')
    const submit = component.getByText('save')

    fireEvent.submit(submit)
    
    expect(author).toHaveValue('valid author')
    expect(title).toHaveValue('valid title')
    expect(url).toHaveValue('valid url')

    expect(mockHandler.mock.calls).toHaveLength(1)
  })    
})