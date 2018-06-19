/*
 *
 * RecipeAll
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectRecipeAll from './selectors';
import messages from './messages';
import App from 'grommet/components/App';
import Card from "grommet/components/Card";
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Anchor from 'grommet/components/Anchor';
import Heading from 'grommet/components/Heading';
import User from 'grommet/components/icons/base/User';
import Section from 'grommet/components/Section';
import Article from 'grommet/components/Article';
import Carousel from 'grommet/components/Carousel';
import Layer from 'grommet/components/Layer';
import Box from 'grommet/components/Box';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import { Redirect } from 'react-router/lib';
import { getAllRecipes, requestRecipeDetail } from './actions'
import Image from 'grommet/components/Image'
import nonImagedPost from '../../non-imaged-post.png'
import defaultImage from '../../defaultimage.png'


export class RecipeAll extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);
    this.state={
      allRecipeList: [],
      recipeOn: false,
      imageError: [],
    };
  }

  componentWillMount(){
    this.props.getRecipeAll();
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.RecipeAll.recipeDetail !== nextProps.RecipeAll.recipeDetail){
      this.setState({recipeOn: true})
    }
  }

  render() {
    var allCard;
    if(this.props.RecipeAll.recipesList == undefined){
      allCard = (<div/>);
    }
    else {
      allCard = this.props.RecipeAll.recipesList.map((object, index) => {
        return(
          <Tile
            pad='medium'
            style={{width: '20%', maxWidth: '20%'}}
            key={index}
          >
          <Card
              colorIndex = 'light-1'
              thumbnail = {<Image fit='contain' style={{height: '17vw', backgroundColor: '#CCCCCC'}} src={'http://13.209.25.111:8000'+object.profile_image} onError={(e) => e.target.src = nonImagedPost}/>}
              label={
                <span>{object.user_id.username}</span>
              }
              heading = {
                <h4 style={{whiteSpace: 'nowrap', fontSize: 20, overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 0}}>{object.title}</h4>
              }
              key = {index}
              onClick={() => {this.props.requestRecipeDetail(object.id)}}
            />
          </Tile>
        )
      })
    }
    let recipePostList = []
    if(this.state.recipeOn){
      recipePostList = this.props.RecipeAll.recipeDetail.post.map((obj, idx) => {
        return(
          <Box key={idx} align='center' basis='full' justify='center' style={{margin: '30px', display: 'flex', width: '100%', height: '440px'}}>
            {
              <Image src={'http://13.209.25.111:8000'+obj.image}
                     style={(this.state.imageError.indexOf(idx) !== -1) ? {display: 'none'} : {display: 'flex', maxHeight: '90%', objectFit: 'contain'}}
                     onError={(e) => {
                       this.state.imageError.push(idx)
                       let newImageError = this.state.imageError
                       this.setState({imageError: newImageError})
                      }}
              />
            }

            <p style={(this.state.imageError.indexOf(idx) !== -1) ? {fontSize: '20px'} : {}}>{obj.content}</p>
          </Box>
        )
      })
      recipePostList.unshift(
        <Box align='center' basis='full' justify='center' style={{margin: '30px', padding: '0px 70px', display: 'flex', width: '100%', height: '440px'}}>
          <span style={{fontSize: '20pt', marginBottom: '50px'}}>INGREDIENTS</span>
          <List style={{width: '100%'}}>
            {
              this.props.RecipeAll.recipeDetail.ingredients.map((obj, idx) => {
                return (
                  <ListItem justify='between'
                            separator='horizontal' style={{borderBottom: '1px solid rgba(0, 0, 0, 0.15)', padding: 3}}>
                    <Image style={{height: '50px', width: '50px'}} fit='contain' size='small' src={obj.image}/>
                    <span>{obj.name}</span>
                  </ListItem>
                )
              })
            }
          </List>
        </Box>
      )
    }

    return (
      <div>
        <Article>
          <Section colorIndex='light-2'>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <Heading align = 'start' tag='h2' style={{margin: '10px 40px 10px', color: '#383838'}}>레시피 목록</Heading>
              <Anchor align='end' primary={true} reverse={true} onClick={() => {this.props.router.push(`/newRecipe`); this.setState({recipeOn: false})}} style={{paddingTop: '5px', margin : '20px 40px', color: '#383838'}}>새 레시피 작성하기</Anchor>
            </div>
            <Tiles responsive='false'>
              { allCard }
            </Tiles>
          </Section>
        </Article>
        {
          this.state.recipeOn &&
          <Layer onClose={() => this.setState({recipeOn: false, imageError: []})} closer={true} align='center' flush={true}>
            <Carousel persistentNav={false} autoplay={false} style={{width: '800px', height: '500px'}}>
              {recipePostList}
            </Carousel>
          </Layer>
        }
      </div>
    );
  }
}

// RecipeAll.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  RecipeAll: makeSelectRecipeAll(),
});

function mapDispatchToProps(dispatch) {
  return {
    getRecipeAll: () => dispatch(getAllRecipes()),
    requestRecipeDetail: (id) => dispatch(requestRecipeDetail(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeAll);
