/*
 *
 * RecipeDetail
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectRecipeDetail from './selectors';
import messages from './messages';
import {requestRecipeDetail} from './actions'
import Heading from 'grommet/components/Heading'
import Image from 'grommet/components/Image'
import Tiles from 'grommet/components/Tiles'
import Tile from 'grommet/components/Tile'
import Card from 'grommet/components/Card'
import Layer from 'grommet/components/Layer'
import Carousel from 'grommet/components/Carousel'
import Button from 'grommet/components/Button'
import List from 'grommet/components/List'
import ListItem from 'grommet/components/ListItem'
import Box from 'grommet/components/Box'

export class RecipeDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props)

    this.state = {
      recipeOn: false
    }
  }

  componentWillMount(){
    this.props.getRecipeDetail(this.props.params.id)
  }

  render() {
    var recipeDetail = this.props.RecipeDetail.recipeDetail ? this.props.RecipeDetail.recipeDetail : ''

    var ingredients;

    if(this.props.RecipeDetail.recipeDetail == undefined) {
      ingredients = (<p>NO RESULT AVAILABLE</p>);
    }
    else {
        ingredients = recipeDetail.ingredients.map((obj, idx) => {
          return(

            <ListItem justify='between'
              separator='horizontal' style={{width: '700px', borderBottom: '1px solid rgba(0, 0, 0, 0.15)', padding: 3}}>
              <Image style={{height: '50px', width: '50px'}} fit='contain' size='small' src={obj.image}/>
              <span>
                {obj.name}
              </span>
            </ListItem>

          )})
          }



    let recipeList
    if(this.props.RecipeDetail.recipeDetail == undefined) {
      recipeList= (<p>NO RESULT AVAILABLE</p>);
    }
    else{
      recipeList = recipeDetail.post.map((obj, idx) => {
          return(
            <Box key={idx} align='center' basis='full' style={{margin: '30px'}}>
              <Image src={'http://13.209.25.111:8000'+obj.image}/>
              <p>{obj.content}</p>
            </Box>
          )
      })
    }



    console.log(this.props.RecipeDetail.recipeDetail)
    return (
      <div>
        <div style={{flexDirection: 'row', display: 'flex', padding: '30px'}}>
          <div style={{width: '250px', justifyContent: 'center', display: 'flex'}}>
            <Image fit='contain' size='large' src={'http://13.209.25.111:8000'+recipeDetail.profile_image}/>
          </div>
          <div style={{padding: '20px 50px'}}>
            <Heading style={{marginBottom: '100px'}}>{recipeDetail.title}</Heading>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <div style={{display: 'flex', flexDirection: 'column', marginRight: '30px'}}>
                <h3 style={{marginBottom: '10px'}}>전체가격</h3>
                <h3 style={{marginBottom: '0'}}>{'￦ '+recipeDetail.price_all}</h3>
              </div>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <h3 style={{marginBottom: '10px'}}>작성자</h3>
                {
                  recipeDetail.user_id ?
                    <h3 style={{marginBottom: '0'}}>{recipeDetail.user_id.username}</h3>:
                    <h3 style={{marginBottom: '0'}}>LOADING</h3>
                }
              </div>
            </div>
          </div>
        </div>
        <Box align = 'center' style={{width: '100%', display: 'flex', justifyContent: 'center'}} >
        <Button label='레시피 보기'
          onClick={() => {this.setState({recipeOn: true})}} style={{width: '100%', margin: '30px 0px'}} colorIndex='light-1'/>
        </Box>
        {
          this.state.recipeOn &&
          <Layer onClose={() => this.setState({recipeOn: false})} closer={true} align='center' flush={true}>
            <Carousel persistentNav={false} autoplay={false} style={{width: 'auto', height: 'auto'}}>
              {/* {<Box align='center' style={{width:'800px', height:'500px', margin: '30px'}}>
              <Heading tag='h2' style={{margin: '10px'}}>재료</Heading>
                <List style={{width: '700px'}}>{ingredients}</List>
              </Box>} */}
              {recipeList}
            </Carousel>
          </Layer>
        }


      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  RecipeDetail: makeSelectRecipeDetail(),
});

function mapDispatchToProps(dispatch) {
  return {
    getRecipeDetail: (id) => dispatch(requestRecipeDetail(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);
