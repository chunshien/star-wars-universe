import React from 'react';
import './ListItem.css';
import avatar from '../../assets/avatar.png';

function ListItem(props) {
  const getColor = (skinType) => {
    if (skinType.indexOf('fair') >= 0) {
      return '#ffe0bd';
    } 
    else if (skinType.indexOf('pale') >= 0) {
      return '#fdf5e2';
    }
    else if (skinType.indexOf('light') >= 0) {
      return '#ffd6a4';
    }
    else if (skinType.indexOf('green') >= 0) {
      return 'green';
    }
    else if (skinType.indexOf('brown') >= 0) {
      return 'brown';
    }
    else {
      return skinType;
    }
  }

  const handleClick = () => {
    props.onClick(props.data.url);
  }

  return (
    <div className={'container'} onClick={handleClick}>
        <div className={'item'}>
          <div className={'section'}>
            <img className={'avatar'} 
              style={{backgroundColor: getColor(props.data.skin_color)}} 
              src={avatar} alt={props.data.name} />
          </div>
          <div className={'section'}>
            <div>Name: {props.data.name}</div>
            <div>Height: {props.data.height}</div>
            <div>Gender: {props.data.gender}</div>
            <div>Mass: {props.data.mass}</div>
          </div>
        </div>        
    </div>
  );
}

export default ListItem;
