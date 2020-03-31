import React, {useCallback} from 'react';
import styled from 'styled-components'
import avatar from '../../assets/avatar.png';

const Container = styled.div`
  cursor: pointer;
  width: 48%;
  background-color: white;
  float: left;
  box-sizing: border-box;
  padding: 20px;
  margin: 1%;
  border-radius: 5px;
  box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
`;

const Item = styled.div`
  display: table;
`;

const Section = styled.div`
  display: table-cell;
  vertical-align: top;
  padding: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  padding: 10px;
  border-radius: 40px;
  border-color: black;
  box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
  object-fit: contain;
`;

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

  const handleClick = useCallback(() => {
    props.onClick(props.data.url);
  }, [props])

  if(props.data){
    return (
      <Container onClick={handleClick}>
          <Item>
            <Section>
              <Avatar className={'avatar'} 
                style={{backgroundColor: getColor(props.data.skin_color)}} 
                src={avatar} alt={props.data.name} />
            </Section>
            <Section>
              <div>Name: {props.data.name}</div>
              <div>Height: {props.data.height}</div>
              <div>Gender: {props.data.gender}</div>
              <div>Mass: {props.data.mass}</div>
            </Section>
          </Item>        
      </Container>
    );
  }
  else {
    return <div></div>
  }
}

export default ListItem;
