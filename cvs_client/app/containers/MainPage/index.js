/*
 *
 * MainPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import {bindActionCreators} from 'redux';
import makeSelectMainPage from './selectors';
import messages from './messages';
import App from 'grommet/components/App';
import Title from 'grommet/components/Title';
import Article from 'grommet/components/Article';
import Button from 'grommet/components/Button';
import Section from 'grommet/components/Section';
import User from 'grommet/components/icons/base/User';
import Search from 'grommet/components/Search';
import Footer from 'grommet/components/Footer';
import Heading from 'grommet/components/Heading';
import Hero from 'grommet/components/Hero';
import Image from 'grommet/components/Image';
import Box from 'grommet/components/Box';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';
import CustomHeader from '../../components/CustomHeader';
import MediaQuery from 'react-responsive';
import { getPopularProduct } from './actions';

// How to load image?


export class MainPage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      term: ''
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onEnter = this.onEnter.bind(this);
  }

  componentWillMount(){
    this.props.getPopularProducts();
  }

  onInputChange(event){
    this.setState({term: event.target.value});
    console.log(event.target.value);
  }

  onEnter(item, selected){
    if(!selected){
      this.props.router.push(`/search/${this.state.term}`)
    }
  }

  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <App style={{maxWidth: 'none'}}>
        <Article>
          <Hero background={<Image src='https://images.pexels.com/photos/811108/pexels-photo-811108.jpeg' fit='cover' full={true} />}
            backgroundColorIndex='dark' size='small'>
            <Box direction='row' justify='center' align='center'>
              <Section align='center' style={{alignItems: 'center', justifyContent: 'center', height: 300}}>
              <Heading margin='none' strong = {true} tag = 'h2'>제품 및 레시피 검색</Heading>
                <Box colorIndex='light-1' style={{margin: '20px 0px'}}>
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
          </Hero>

          <Box colorIndex='light-2'>
          <Heading align = 'start' tag='h2' style={{margin: '40px 40px 20px', color: '#383838'}}>인기 제품</Heading>
          <Tiles fill={false} flush={false} size='small'>
          <Tile> <Card thumbnail='http://cdn2.bgfretail.com/bgfbrand/files/product/5D8998FE3B78430B99641CCA0C3F3506.jpg'
                label='Sample Label' heading='Sample Heading' description='Sample description providing more details.' onClick = {() => alert("clicked")} colorIndex = 'light-1'
                /> </Tile>
          </Tiles>
          <Anchor align='end' label='Label' primary={true} reverse={true} path='/productAll' style={{margin : '20px 40px', color: '#383838'}}>전체 제품 보기</Anchor>
          </Box>
        </Article>
      </App>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  MainPage: makeSelectMainPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getPopularProducts: () => dispatch(getPopularProduct())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
