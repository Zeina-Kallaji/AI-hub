import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router';
import { paths } from '@/shared/config/paths';
import { AuthLayout } from '../components/AuthLayout';
import { LoginForm } from '../components/login-form';

// TODO(Phase 3): email + password form
export function LoginPage() {
  return (
    <AuthLayout title="Welcome back">
      <LoginForm/>
      <Typography variant="body2" sx={{ textAlign: 'center' }}>
        No account?{' '}
        <Link component={RouterLink} to={paths.register}>
          Sign up
        </Link>
      </Typography>
    </AuthLayout>
  );
}
