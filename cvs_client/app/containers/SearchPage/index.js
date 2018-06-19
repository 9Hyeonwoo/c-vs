/*
 *
 * SearchPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import {bindActionCreators} from 'redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectSearchPage from './selectors';
import messages from './messages';
import CustomHeader from '../../components/CustomHeader'
import Box from 'grommet/components/Box';
import Search from 'grommet/components/Search';
import MediaQuery from 'react-responsive';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import { searchProduct, receivedSearchResult } from './actions';
import Heading from 'grommet/components/Heading';
import Card from 'grommet/components/Card';
import Tile from 'grommet/components/Tile';
import Tiles from 'grommet/components/Tiles';
import Image from 'grommet/components/Image';
import defaultImage from '../../defaultimage.png';

export class SearchPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);

    this.state = {term: '', result: []};
    this.onInputChange = this.onInputChange.bind(this);
    this.onEnter = this.onEnter.bind(this);
  }

  componentWillMount(){
    if(this.props.params.id === undefined){
    }
    else{
      this.props.searchProduct(this.props.params.id);
    }

  }

  onInputChange(event){
    this.setState({term: event.target.value});
  }

  onEnter(item, selected){
    if(!selected){
      this.props.router.push(`/search/${this.state.term}`)
      location.reload();
    }
  }

  render() {
    var resultCard;
    if(this.props.searchResult) {
      if (this.props.searchResult.results.length === 0) {
        resultCard = (
          <div style={{display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
            <span>검색 결과가 없습니다.</span>
          </div>
        );
      }
      else {
        resultCard = this.props.searchResult.results.map((object, index) => {
          return (
            <Tile
              pad='medium'
              style={{width: '20%', maxWidth: '20%'}}
              key={index}
            >
              <Card
                colorIndex='light-1'
                thumbnail={<Image src={object.image} style={{height: '17vw', objectFit: 'contain'}} onError={(e) => e.target.src = defaultImage}/>}
                label={
                  <span>{object.manufacturer}</span>
                }
                heading={
                  <h4 style={{
                    whiteSpace: 'nowrap',
                    fontSize: 20,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    marginBottom: 0
                  }}>{object.name}</h4>
                }
                key={index}
                onClick={() => {
                  this.props.router.push(`/productDetail/${object.id}`);
                  location.reload();
                }}
              />
            </Tile>
          );
        })
      }
    }

    return (
      <div>
        <Article>
          <Box direction='row' justify='center' align='center'>
            <Section align='center' style={{alignItems: 'center', justifyContent: 'center'}}>
              <Box colorIndex='light-1' style={{margin: '20px 0px', display: 'flex', alignItems: 'center'}}>
                <Heading strong = {true} tag = 'h3'>제품 및 레시피 검색</Heading>
                <MediaQuery query="(min-device-width: 1024px)">
                  <Search style={{width: '700px'}} inline={true} placeHolder='검색' value={this.state.term} onDOMChange={this.onInputChange}
                          onSelect={this.onEnter} suggestions={[]}/>
                </MediaQuery>
                <MediaQuery query="(max-device-width: 1023px)">
                  <Search inline={true} placeHolder='검색' />
                </MediaQuery>
              </Box>
            </Section>
          </Box>
        </Article>
        <Box colorIndex='light-2' style={{marginTop: 10}}>
          <Tiles responsive='false'>{resultCard}</Tiles>
        </Box>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return ({
    searchResult: state.get('searchPage').toJS().searchResult
  })
}


function mapDispatchToProps(dispatch) {
  return { searchProduct: (searchKey) => dispatch(searchProduct(searchKey))}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
