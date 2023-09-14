import { render } from '@redwoodjs/testing/web'

import MainLayout from './MainLayout'
import { ColorSchemeProvider } from '@mantine/core'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MainLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
      <ColorSchemeProvider colorScheme={'light'}
      toggleColorScheme={() => {}}>
        <MainLayout />
      </ColorSchemeProvider>
      )
    }).not.toThrow()
  })
})
