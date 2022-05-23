import { useState } from 'react';
import chars from './CharsArray';

const Cards = (props) => {
  const [selected, setSelected] = useState('chars');
  return (
    <div>
      <div
        className="card"
        key={props.keys}
        style={{ backgroundImage: `url(${props.photo})` }}
        onClick={() => props.handleClick(props.name)}
      >
        <div className="nameTag">{props.name}</div>
      </div>
    </div>
  );
};

export default Cards;
