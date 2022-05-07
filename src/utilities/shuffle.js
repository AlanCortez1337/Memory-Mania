const shuffle = () => {

    const images = [
    { image: './images/image1.jpg' },
    { image: './images/image2.jpg' },
    { image: './images/image3.jpg'},
    { image: './images/image4.jpg' },
    { image: './images/image5.jpg' },
    { image: './images/image6.jpg' },
    { image: './images/image7.jpg'},
    { image: './images/image8.jpg' },
  ];


  return [...images, ...images]
  .sort(Math.floor((Math.random() * 8)))
  .map((card) => ({...card, id:Math.random()}));
};

export default shuffle;