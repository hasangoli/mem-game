const Card = ({
  image,
  selected,
  onClick,
}: {
  image: string;
  selected: boolean | undefined;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div className='card' onClick={onClick}>
      <div className={selected ? 'selected' : ''}>
        <img className='card-face' src={image} alt='' />
        <img className='card-back' src='/assets/react.png' alt='' />
      </div>
    </div>
  );
};

export default Card;
