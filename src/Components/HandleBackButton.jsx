import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HandleBackButton = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBackButton = (event) => {
      // Prevent the default back navigation
      event.preventDefault();
      // Navigate to the Home page
      navigate('/', { replace: true });
    };

    // Listen for back button events
    window.onpopstate = handleBackButton;

    // Cleanup the event listener on component unmount
    return () => {
      window.onpopstate = null;
    };
  }, [navigate]);

  return null; // This component only handles logic, no UI
};

export default HandleBackButton;