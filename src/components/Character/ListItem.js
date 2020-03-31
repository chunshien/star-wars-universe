import React, {useCallback, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
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
  @media (max-width: 600px) {
    width: 98%;
  }
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

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function ListItem(props) {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowDimensions]);

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

  let TextOverflowStyle = {
    textOverflow: 'ellipsis',
    overflow: 'hidden',     
    whiteSpace: 'nowrap'
  }

  if(windowDimensions.width > 600) {
    TextOverflowStyle.maxWidth = windowDimensions.width * 0.25
  }

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
              <div style={TextOverflowStyle}>Name: {props.data.name}</div>
              <div style={TextOverflowStyle}>Height: {props.data.height}</div>
              <div style={TextOverflowStyle}>Gender: {props.data.gender}</div>
              <div style={TextOverflowStyle}>Mass: {props.data.mass}</div>
            </Section>
          </Item>        
      </Container>
    );
  }
  else {
    return <div></div>
  }
}
ListItem.propTypes = {
  data: PropTypes.object
};
export default ListItem;
