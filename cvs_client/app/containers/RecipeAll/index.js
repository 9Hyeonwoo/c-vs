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
import Header from 'grommet/components/Header';
import Button from 'grommet/components/Button';
import Title from 'grommet/components/Title';
import User from 'grommet/components/icons/base/User';
import Section from 'grommet/components/Section';
import Article from 'grommet/components/Article';
import { Redirect } from 'react-router/lib';
import { getAllRecipes } from './actions'
import Image from 'grommet/components/Image'

export class RecipeAll extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);
    this.state={
      allRecipeList: [],
    };
  }

  componentWillMount(){
    this.props.getRecipeAll();
  }
  
  render() {
    var allCard;
    if(this.props.RecipeAll.recipesList == undefined){
      allCard = (<p>NO RESULT AVAILABLE NOW</p>);
    }
    else{
      console.log(this.props.RecipeAll.recipesList)
      allCard = this.props.RecipeAll.recipesList.map((object, index) => {
        return(
          <Tile
            pad='medium'
            style={{width: '20%', maxWidth: '20%'}}
            key={index}
          >
          <Card
              colorIndex = 'light-1'
              thumbnail = {<Image src={'http://13.209.25.111:8000'+object.profile_image} />}
              label={
                <span>{object.user_id.username}</span>
              }
              heading = {
                <h4 style={{whiteSpace: 'nowrap', fontSize: 20, overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 0}}>{object.title}</h4>
              }
              key = {index}
              onClick={() => {this.props.router.push(`/recipeDetail/${object.id}`); location.reload();}}
            />
          </Tile>
        )
      })

    }
    return (
      <div>
        <Article>
          <Section colorIndex='light-2'>
            <Tiles>
              { allCard }
            </Tiles>
          </Section>
        </Article>
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
    getRecipeAll: () => dispatch(getAllRecipes())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeAll);
