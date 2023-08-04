const Card = ({
  image,
  selected,
}: {
  image: string;
  selected: boolean | undefined;
}) => {
  return (
    <div className='card'>
      <div className={selected ? 'selected' : ''}>
        <img className='card-face' src={image} alt='' />
        <img className='card-back' src='/assets/react.png' alt='' />
      </div>
    </div>
  );
};

export default Card;
