// Import all images
import chair from '../images/chair.webp';
import coffee_machine from '../images/coffee_machine.webp';
import watch from '../images/watch.webp';
import headphones from '../images/headphones.webp';

// Image mapping
const imageMap: { [key: string]: string } = {
  '/images/chair': chair,
  '/images/coffee_machine': coffee_machine,
  '/images/watch': watch,
  '/images/headphones': headphones,
};

export const getImageUrl = (imagePath: string): string => {
  try {
    // Remove leading slash if present
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    
    // Use require to get the image from the src directory
    return require(`../images/${cleanPath.replace('images/', '')}`);
  } catch (error) {
    console.error(`Error loading image: ${imagePath}`, error);
    return 'https://via.placeholder.com/400';
  }
}; 