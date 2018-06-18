/*
 *
 * ProductDetail
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectProductDetail from './selectors';
import CustomHeader from '../../components/CustomHeader'
import {
  requestProductDetail, requestRelatedProducts, postRequestComment, getRequestComment,
  getRequestReviews, getPopularProduct
} from './actions'
import Image from 'grommet/components/Image'
import Heading from 'grommet/components/Heading'
import Form from 'grommet/components/Form'
import FormField from 'grommet/components/FormField'
import TextInput from 'grommet/components/TextInput'
import Tiles from 'grommet/components/Tiles'
import Tile from 'grommet/components/Tile'
import Card from 'grommet/components/Card'
import Anchor from 'grommet/components/Anchor'
import List from 'grommet/components/List'
import ListItem from 'grommet/components/ListItem'
import RadioButton from 'grommet/components/RadioButton'
import Layer from 'grommet/components/Layer'
import Carousel from 'grommet/components/Carousel';
import Box from 'grommet/components/Box'
import Article from 'grommet/components/Article'
import defaultImage from '../../defaultimage.png'
import nonImagedPost from '../../non-imaged-post.png'


const manufacturer = {'CU': 'CU', 'GS': 'GS25', 'SE': 'SEVEN ELEVEN'}
export class ProductDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super()
    this.state = {
      relatedRequestDone: false,
      rating: null,
      reviewOn: false,
      reviewId: 0,
      imageError: []
    }
  }
  componentWillMount() {
    this.props.requestProductDetail(this.props.params.id)
    this.props.getPopularProduct()
    this.props.getRequestComment(this.props.params.id)
    this.props.getRequestReviews(this.props.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.params.id !== nextProps.params.id){
      nextProps.requestProductDetail(nextProps.params.id)
      nextProps.getPopularProduct()
      nextProps.getRequestComment(nextProps.params.id)
      nextProps.getRequestReviews(nextProps.params.id)
    }
    if (nextProps.productDetail && (!nextProps.relatedProducts)) {
      if (nextProps.productDetail.small_category || nextProps.productDetail.large_category) {
        nextProps.requestRelatedProducts(nextProps.productDetail.small_category, nextProps.productDetail.large_category)
      }
    }
    if(nextProps.relatedProducts) {
      this.setState({relatedRequestDone: true})
    }
  }

  render() {
    const productDetail = this.props.productDetail ? this.props.productDetail : ''
    const relatedProducts = this.props.relatedProducts ? this.props.relatedProducts.results: []
    const relatedProductsList = (relatedProducts.filter((obj) => (obj.manufacturer !== productDetail.manufacturer && obj.name !== productDetail.name)).concat(relatedProducts.filter((obj) => (obj.manufacturer === productDetail.manufacturer && obj.name !== productDetail.name))))
    const popularList = this.props.popularList ? this.props.popularList.results : []
    let relatedCard;
    if(relatedProductsList.length === 0) {
      relatedCard = popularList.slice(0,5).map((object, index) => {
        if(object.id === this.props.params.id) return;
        else return (
          <Tile pad='medium' key={index} style={{width: '20%'}}>
            <Card
              colorIndex = 'light-1'
              textSize = 'small'
              thumbnail = {
                <Image src={object.image} onError={(e) => e.target.src = defaultImage}/>
              }
              label={
                <span>{object.manufacturer}</span>
              }
              heading = {
                <h4 style={{whiteSpace: 'nowrap', fontSize: 20, overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 0}}>{object.name}</h4>
              }
              key = {index}
              onClick={() => {this.props.router.push(`/productDetail/${object.id}`); location.reload();}}
            />
          </Tile>
        );
      })
    }
    else {
      relatedCard = relatedProductsList.slice(0,5).map((object, index) => {
        if(object.id === this.props.params.id) return;
        else return (
          <Tile pad='medium' key={index} style={{width: '20%'}}>
            <Card
              colorIndex = 'light-1'
              textSize = 'small'
              thumbnail = {
                <Image src={object.image} onError={(e) => e.target.src = defaultImage}/>
              }
              label={
                <span>{object.manufacturer}</span>
              }
              heading = {
                <h4 style={{whiteSpace: 'nowrap', fontSize: 20, overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 0}}>{object.name}</h4>
              }
              key = {index}
              onClick={() => {this.props.router.push(`/productDetail/${object.id}`); location.reload();}}
            />
          </Tile>
        );
      })
    }

    var reviewDetail;
    if(this.state.reviewId != 0){
      this.props.reviewsList.find((obj, idx) => {
      if(obj.id == this.state.reviewId){
        reviewDetail = obj.post.map((o, i) => {
          return(
            <Box key={i} align='center' justify='center' style={{padding: '60px', height: '500px'}}>
              <h3 style={{lineHeight: '1', marginBottom: '20px'}}>{obj.title}</h3>
              <div style={{display: 'flex'}}>
                <Image
                  style={(this.state.imageError.indexOf(idx) !== -1) ? {display: 'none'} : {objectFit: 'contain'}}
                  src={'http://13.209.25.111:8000'+o.image}
                  onError={(e) => {
                    this.state.imageError.push(idx)
                    let newImageError = this.state.imageError
                    this.setState({imageError: newImageError})
                  }}
                />
              </div>
              <p style={{marginTop: '20px', marginBottom: '0px'}}>{o.content}</p>
            </Box>
          )
        })
      }
    })
    }
    if(productDetail) {
      return (
        <div style={{margin: '0 20px'}}>
          <div style={{flexDirection: 'row', display: 'flex', padding: '30px'}}>
            <div style={{width: '250px', justifyContent: 'center', display: 'flex'}}>
              <Image fit='contain' size='large' style={{maxHeight: '321px'}} src={productDetail.image} onError={(e) => e.target.src = defaultImage}/>
            </div>
            <div style={{padding: '20px 50px'}}>
              <h3>{manufacturer[productDetail.manufacturer]}</h3>
              <Heading style={{marginBottom: '100px'}}>{productDetail.name}</Heading>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{display: 'flex', flexDirection: 'column', marginRight: '30px'}}>
                  <h3 style={{marginBottom: '10px'}}>가격</h3>
                  <h3 style={{marginBottom: '0'}}>{'￦ ' + productDetail.price}</h3>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <h3 style={{marginBottom: '10px'}}>평점</h3>
                  {
                    productDetail.rating_avg ?
                      <h3 style={{marginBottom: '0'}}>{productDetail.rating_avg.toFixed(2)}</h3> :
                      productDetail ?
                        <h3 style={{marginBottom: '0'}}>평점이 매겨지지 않았습니다.</h3> :
                        <div></div>
                  }
                </div>
              </div>
            </div>
          </div>
          {
            (this.state && this.state.relatedRequestDone || (productDetail !== '' && !(productDetail.small_category || productDetail.large_category))) ?
              <h3>{relatedProducts.length === 0 ? '인기 상품' : '유사 상품'}</h3> : <div/>
          }
          <Tiles>{relatedCard}</Tiles>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <h3>리뷰</h3>
            <Anchor disabled={!this.props.loginResult} label='새 리뷰 쓰기'
                    href={this.props.loginResult && ('/newReview/' + this.props.params.id)}/>
          </div>
          <Tiles>
            {
              this.props.reviewsList &&
              this.props.reviewsList.slice(0, 3).map((object, index) => {
                return (
                  <Tile pad='medium' key={index} style={{width: '33%'}}>
                    <Card
                      colorIndex='light-1'
                      textSize='small'
                      thumbnail={
                        <Image fit='contain' style={{height: '24.7vw', backgroundColor: '#CCCCCC'}} src={'http://13.209.25.111:8000' + object.profile_image} onError={(e) => e.target.src = nonImagedPost}/>
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

          {
            this.state.reviewOn &&
            <Layer onClose={() => this.setState({reviewOn: false, reviewId: 0, imageError: []})} closer={true} align='center'
                   flush={true}>
              <Carousel persistentNav={false} autoplay={false}
                        style={{width: '800px', height: '500px', paddingBottom: '30px'}}>
                {reviewDetail}
              </Carousel>
            </Layer>
          }

          <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
            <Form style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: '1px solid rgba(0, 0, 0, 0.15)',
              padding: '10px',
              width: '80%'
            }}>
              <FormField label='짧은 상품평' style={{border: '0px', borderBottom: '1px solid rgba(0,0,0,0.15)'}}>
                <TextInput id='comment-input'/>
              </FormField>
              <div
                style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '20px 0px 10px 48px'}}>
                <RadioButton checked={this.state.rating >= 1} onChange={() => this.setState({rating: 1})}/>
                <RadioButton checked={this.state.rating >= 2} onChange={() => this.setState({rating: 2})}/>
                <RadioButton checked={this.state.rating >= 3} onChange={() => this.setState({rating: 3})}/>
                <RadioButton checked={this.state.rating >= 4} onChange={() => this.setState({rating: 4})}/>
                <RadioButton checked={this.state.rating >= 5} onChange={() => this.setState({rating: 5})}/>
              </div>
              <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Anchor
                  label='등록'
                  disabled={!this.props.loginResult}
                  onClick={() => {
                    if (this.props.loginResult)
                      this.props.postRequestComment(document.getElementById('comment-input').value, this.props.params.id, this.state.rating)
                  }}
                />
              </div>
            </Form>
          </div>
          <div style={{width: '100%', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
            <div style={{width: '80%', margin: '10px 0'}}>
              <h3 style={{width: '80%', marginBottom: '0'}}>댓글 목록</h3>
            </div>
            <List style={{width: '80%'}}>
              {
                this.props.commentList && this.props.commentList.map((comment) => {
                  return (
                    <ListItem>
                      <span>{comment.content}</span>
                    </ListItem>
                  )
                })
              }
            </List>
          </div>
        </div>
      );
    }
    else {
      return <div/>
    }
  }
}

const mapStateToProps = (state) => {
  return ({
    productDetail: state.get('productDetail').toJS().productDetail,
    loginResult: state.get('global').toJS().loginResult,
    relatedProducts: state.get('productDetail').toJS().relatedProducts,
    commentList: state.get('productDetail').toJS().commentList,
    reviewsList: state.get('productDetail').toJS().reviewsList,
    popularList: state.get('productDetail').toJS().popularList
  })}

function mapDispatchToProps(dispatch) {
  return {
    requestProductDetail: (id) => dispatch(requestProductDetail(id)),
    requestRelatedProducts: (smallCategory, largeCategory) => dispatch(requestRelatedProducts(smallCategory, largeCategory)),
    postRequestComment: (content, product, rating) => dispatch(postRequestComment(content, product, rating)),
    getRequestComment: (id) => dispatch(getRequestComment(id)),
    getRequestReviews: (id) => dispatch(getRequestReviews(id)),
    getPopularProduct: () => dispatch(getPopularProduct())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
