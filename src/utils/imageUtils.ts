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