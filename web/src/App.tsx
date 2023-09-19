import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import theme from '../config/mantine.config'

import { AuthProvider, useAuth } from './auth'

import './index.css'

const App = () => {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
  })

  return (
    <FatalErrorBoundary page={FatalErrorPage}>
      <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
        <AuthProvider>
          <ColorSchemeProvider
            colorScheme={colorScheme as ColorScheme}
            toggleColorScheme={() => {
              setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')
            }}
          >
            <MantineProvider
              withGlobalStyles
              withNormalizeCSS
              theme={{
                ...theme,
                colorScheme: colorScheme as ColorScheme,
              }}
            >
              <RedwoodApolloProvider useAuth={useAuth}>
                <Routes />
              </RedwoodApolloProvider>
            </MantineProvider>
          </ColorSchemeProvider>
        </AuthProvider>
      </RedwoodProvider>
    </FatalErrorBoundary>
  )
}

export default App
