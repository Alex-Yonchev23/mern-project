import { useSelector } from 'react-redux';

import lightBackground from '../images/white-marble.jpg'; 
import darkBackground from '../images/O5X8IV0.jpg'; 
export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  const backgroundImage = theme === 'light' ? lightBackground : darkBackground; 

  return (
    <div className={theme} > {/* Apply background image dynamically */}
      <div className='text-gray-700 dark:text-gray-200  min-h-screen bg-no-repeat bg-fixed bg-cover ' style={{ backgroundImage: `url(${backgroundImage})` }}>
        {children}
      </div>
    </div>
  );
}
