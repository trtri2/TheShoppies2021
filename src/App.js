import './App.css';
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Amazon Ember',
      'Roboto',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#E8EDDF'
    },
    secondary: {
      main: '#F5CB5C',
    },
  }
});

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header/>
        <Main/>
      </ThemeProvider>
    </div>
  );
}

export default App;
