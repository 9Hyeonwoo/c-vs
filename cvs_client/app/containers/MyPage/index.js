/*
 *
 * MyPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getCommentsReviewsRecipes, requestRecipeDetail} from './actions'
import Table from 'grommet/components/Table'
import List from 'grommet/components/List'
import ListItem from 'grommet/components/ListItem'
import TableRow from 'grommet/components/TableRow'
import Tile from 'grommet/components/Tile'
import Tiles from 'grommet/components/Tiles'
import Card from 'grommet/components/Card'
import Image from 'grommet/components/Image'
import nonImagedPost from '../../non-imaged-post.png'
import Layer from 'grommet/components/Layer'
import Carousel from 'grommet/components/Carousel'
import Box from 'grommet/components/Box'
import Article from 'grommet/components/Article'


export class MyPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super()
    this.state = {
      reviewOn: false,
      reviewId: 0,
      recipeOn: false,
      imageError: [],
    }
  }

  componentWillMount() {
    if(this.props.loginResult){
      this.props.getCommentsReviewsRecipes(this.props.loginResult.comment_set, this.props.loginResult.review_set, this.props.loginResult.recipe_set)
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.recipeDetail !== nextProps.recipeDetail){
      this.setState({recipeOn: true})
    }
  }

  render() {
    console.log(this.props.commentsList)
    console.log(this.props.reviewsList)
    console.log(this.props.recipesList)
    console.log(this.props.loginResult)

    let reviewDetail = [];
    if (this.state.reviewId != 0) {
      this.props.reviewsList.find((obj, idx) => {
        if (obj.id == this.state.reviewId) {
          reviewDetail = obj.post.map((o, i) => {
            return (
              <Box key={i} align='center' justify='center' style={{padding: '60px', height: '500px'}}>
                <h3 style={{lineHeight: '1', marginBottom: '20px'}}>{obj.title}</h3>
                <div style={{display: 'flex'}}>
                  <Image style={{objectFit: 'contain'}} src={'http://13.209.25.111:8000' + o.image}/>
                </div>
                <p style={{marginTop: '20px', marginBottom: '0px'}}>{o.content}</p>
              </Box>
            )
          })
        }
      })
    }

    let recipeCard;
    if(this.props.recipesList == undefined){
      recipeCard = (<div/>);
    }
    else {
      recipeCard = this.props.recipesList.map((object, index) => {
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
      recipePostList = this.props.recipeDetail.post.map((obj, idx) => {
        return(
          <Box key={idx} align='center' basis='full' justify='center' style={{margin: '30px', display: 'flex', width: '100%', height: '440px'}}>
            {
              <Image src={'http://13.209.25.111:8000'+obj.image}
                     style={(this.state.imageError.indexOf(idx) !== -1) ? {display: 'none'} : {display: 'flex'}}
                     onError={(e) => {
                       console.log(this.state.imageError)
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
              this.props.recipeDetail.ingredients.map((obj, idx) => {
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

    if(this.props.commentsList && this.props.reviewsList && this.props.loginResult) {
      return (
        <div style={{margin: '0 25px'}}>
          {
            this.state.reviewOn &&
            <Layer onClose={() => this.setState({reviewOn: false, reviewId: 0})} closer={true} align='center'
                   flush={true}>
              <Carousel persistentNav={false} autoplay={false}
                        style={{width: '800px', height: '500px', paddingBottom: '30px'}}>
                {reviewDetail}
              </Carousel>
            </Layer>
          }
          {
            this.state.recipeOn &&
            <Layer onClose={() => this.setState({recipeOn: false, imageError: []})} closer={true} align='center' flush={true}>
              <Carousel persistentNav={false} autoplay={false} style={{width: '800px', height: '500px'}}>
                {recipePostList}
              </Carousel>
            </Layer>
          }
          <Article>
            <h2 style={{marginBottom: '0px', fontWeight: 'bold'}}>I N F O R M A T I O N</h2>
            <div
              style={{padding: '30px 0px', display: 'flex', flexDirection: 'row', borderBottom: '1px solid #CCCCCC'}}>
              <div style={{marginRight: '30px'}}>
                <h3 style={{marginBottom: '10px'}}>USER NAME</h3>
                <h2 style={{marginBottom: '0px'}}>{this.props.loginResult.username}</h2>
              </div>
              <div>
                <h3 style={{marginBottom: '10px'}}>USER E-MAIL</h3>
                <h2 style={{marginBottom: '0px'}}>{this.props.loginResult.email}</h2>
              </div>
            </div>
            <div style={{
              padding: '30px 0px',
              display: 'flex',
              flexDirection: 'column',
              borderBottom: '1px solid #CCCCCC'
            }}>
              <h2 style={{marginBottom: '0px', fontWeight: 'bold'}}>R E V I E W S</h2>
              <Tiles>
                {
                  this.props.reviewsList &&
                  this.props.reviewsList.map((object, index) => {
                    return (
                      <Tile pad='medium' key={index} style={{width: '20%'}}>
                        <Card
                          colorIndex='light-1'
                          textSize='small'
                          thumbnail={
                            <Image fit='contain' style={{height: '17vw', backgroundColor: '#CCCCCC'}}
                                   src={'http://13.209.25.111:8000' + object.profile_image}
                                   onError={(e) => e.target.src = nonImagedPost}/>
                          }
                          label={
                            <span style={{
                              whiteSpace: 'nowrap',
                              fontSize: 20,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              marginBottom: 0
                            }}>{object.title}</span>
                          }
                          heading={
                            <h4 style={{
                              whiteSpace: 'nowrap',
                              fontSize: 20,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              marginBottom: 0
                            }}>{object.profile_content}</h4>
                          }
                          key={index}
                          onClick={() => {
                            this.setState({reviewOn: true, reviewId: object.id})
                          }}
                        />
                      </Tile>
                    )
                  })
                }
              </Tiles>
            </div>
            <div style={{
              padding: '30px 0px',
              display: 'flex',
              flexDirection: 'column',
              borderBottom: '1px solid #CCCCCC'
            }}>
              <h2 style={{marginBottom: '0px', fontWeight: 'bold'}}>R E C I P E S</h2>
              <Tiles>
                {recipeCard}
              </Tiles>
            </div>
            <div style={{
              padding: '30px 0px',
              display: 'flex',
              flexDirection: 'column',
              borderBottom: '1px solid #CCCCCC'
            }}>
              <h2 style={{marginBottom: '0px', fontWeight: 'bold'}}>C O M M E N T S</h2>
              <Table style={{marginTop: '20px'}}>
                <thead>
                <tr>
                  <th>제품</th>
                  <th>내용</th>
                </tr>
                </thead>
                <tbody>
                {
                  this.props.commentsList &&
                  this.props.commentsList.map((comment, id) => {
                    return (
                      <TableRow key={id}>
                        <td>{comment.product.name}</td>
                        <td>{comment.content}</td>
                      </TableRow>
                    )
                  })
                }
                </tbody>
              </Table>
            </div>
          </Article>
        </div>
      );
    }
    else {
      return <div/>
    }
  }
}

MyPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return ({
    loginResult: state.get('global').toJS().loginResult,
    commentsList: state.get('myPage').toJS().commentsList,
    reviewsList: state.get('myPage').toJS().reviewsList,
    recipesList: state.get('myPage').toJS().recipesList,
    recipeDetail: state.get('myPage').toJS().recipeDetail
  })}

function mapDispatchToProps(dispatch) {
  return {
    getCommentsReviewsRecipes: (commentSet, reviewSet, recipeSet) => dispatch(getCommentsReviewsRecipes(commentSet, reviewSet, recipeSet)),
    requestRecipeDetail: (id) => dispatch(requestRecipeDetail(id))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
