import { makeStyles } from '@material-ui/core/styles';

const AuthStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logoContainer: {
    backgroundColor: theme.palette.primary.light,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 5,
  },
  logo: {
    width: 50,
  },
  title: {
    fontSize: '3rem',
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
    marginLeft: theme.spacing(2)
  },
  quote: {
    color: theme.palette.grey[600],
    marginBottom: theme.spacing(1)
  }
}));

export default AuthStyles;