// Combine and shuffle two arrays
const shuffle = () => {
  const assets = [
    { image: '/assests/image1.jpg' },
    { image: '/assests/image2.jpg' },
    { image: '/assests/image3.jpg'},
    { image: '/assests/image4.jpg' },
    { image: '/assests/image5.jpg' },
    { image: '/assests/image6.jpg' },
    { image: '/assests/image7.jpg'},
    { image: '/assests/image8.jpg' },
  ];
  return [...assets, ...assets]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }));
};

export default shuffle;
