// theme.js

import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#ffd3b9'
      },
      textSecondary: {
        main: '#815d92'
      },
      secondary: {
        main: '#815d92'
      }
    },
    typography: {
      fontSize: 16,
      color: '#ffd3b9',
      h3: {
        fontWeight: 700,
        fontSize: '2.2rem'
      },
      h4: {
        fontWeight: 700,
        fontSize: '1.75rem'
      },
      h5: {
        fontWeight: 500
      },
      h6: {
        fontWeight: 500
      }
    }
  })

  export default theme;