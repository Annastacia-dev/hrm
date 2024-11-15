import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import errorIcon from '@/assets/icons/error-alert.png';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import BreadcrumbComponent from './BreadcrumbComponent';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col space-y-6">
      <BreadcrumbComponent
        items={[
          { name: 'Home', href: '/' },
          { name: 'Error', href: '' },
        ]}
      />

      <Card className="min-w-[90vw] min-h-[80vh] max-w-4xl flex flex-col items-center justify-center">
        <CardHeader>
          <CardTitle>
            <img src={errorIcon} alt="error-icon" />
          </CardTitle>
          <CardContent>
            <p>The page you are looking for does not exist.</p>
          </CardContent>
          <Link to="/">
            <Button onClick={() => navigate(-1)}>Go Back</Button>
          </Link>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Error;
