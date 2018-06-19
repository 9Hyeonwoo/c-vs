/*
 *
 * NewReview
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { sendRequestPost } from './actions'
import Search from 'grommet/components/Search'
import Button from 'grommet/components/Button'
import Anchor from 'grommet/components/Anchor'
import List from 'grommet/components/List'
import ListItem from 'grommet/components/List'
import Image from 'grommet/components/Image'
import Heading from 'grommet/components/Heading'
import Title from 'grommet/components/Title'
import Form from 'grommet/components/Form'
import FormField from 'grommet/components/FormField'
import TextInput from 'grommet/components/TextInput'
import FormTrashIcon from 'grommet/components/icons/base/FormTrash'
import Edit from 'grommet/components/icons/base/Edit'
import Add from 'grommet/components/icons/base/Add'
import RadioButton from 'grommet/components/RadioButton'

export class NewReview extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)
    this.state = {
      title:'',
      posts: [{
        image: undefined,
        content: undefined,
        imageURL: undefined
      }],
    }
  }
  componentWillReceiveProps (nextProps) {
    if(!this.props.isSuccessful && nextProps.isSuccessful){
      this.props.router.push('/productDetail/' + this.props.params.id)
    }
  }
  render() {
    return (
      <div style={{margin: '0px 20px'}}>
        <Heading tag='h2'>새 리뷰 작성</Heading>
        <Title>평점 매기기</Title>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '20px 0px 10px 48px'}}>
          <RadioButton checked={this.state.rating >= 1} onChange={() => this.setState({rating: 1})}/>
          <RadioButton checked={this.state.rating >= 2} onChange={() => this.setState({rating: 2})}/>
          <RadioButton checked={this.state.rating >= 3} onChange={() => this.setState({rating: 3})}/>
          <RadioButton checked={this.state.rating >= 4} onChange={() => this.setState({rating: 4})}/>
          <RadioButton checked={this.state.rating >= 5} onChange={() => this.setState({rating: 5})}/>
        </div>
        <Form style={{width: '100%'}}>
          <Title>리뷰 작성</Title>
          <FormField label="제목"  style={{margin: '10px 20px', width: 'auto'}}>
            <TextInput style={{width: '100%'}} value={this.state.title} onDOMChange={(event) => this.setState({title: event.target.value})}/>
          </FormField>
          {this.state.posts.map((item, key) => {
            return (
              <div key={key} style={{flexDirection: 'row', display: 'flex', margin: '10px 20px'}}>
                <label>
                  <div style={{width: '200px', height: '200px', backgroundColor: '#C0C0C0', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '20px'}}>
                    {this.state.posts[key].image ?
                      <img style={{height: '200px', width: '200px', objectFit: 'contain'}} src={this.state.posts[key].imageURL}/>
                      : <Add style={{width: '50px', height: '50px'}}/>
                    }

                    <input id='image-input'  accept='image/*' type='file' onChange={(e) => {
                      if(e.target.files[0]) {
                        let newPosts = this.state.posts
                        let encodedImage = new File([e.target.files[0]], escape(e.target.files[0].name))
                        newPosts[key].imageURL = URL.createObjectURL(encodedImage)
                        newPosts[key].image = encodedImage
                        this.setState({posts: newPosts})
                      }
                    }} style={{display: 'none'}}/>
                  </div>
                </label>
                <FormField label="내용" style={{width: '100%'}}>
                  <div style={{display: 'flex', height: '150px'}}>
                    <textarea
                      value={this.state.posts[key].content}
                      onChange={(e) => {
                        let newPosts = this.state.posts
                        newPosts[key].content = e.target.value
                        this.setState({posts: newPosts})
                      }}
                      style={{width: '100%', resize: 'none', border: 'none'}}/>
                  </div>
                </FormField>
              </div>
            )
          })}
          <Anchor
            label='이미지/텍스트 추가하기'
            onClick={() => {
              let newPosts = this.state.posts
              newPosts.push({image: undefined, content: undefined})
              this.setState({posts: newPosts})
            }}
          />
          <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <Button
                    label='리뷰 저장'
                    style={{width: '50%', maxWidth: '90%', margin: '10px 20px'}}
                    onClick={() => {
                      this.props.sendRequestPost({title: this.state.title, rating: this.state.rating, product: this.props.params.id}, this.state.posts)
                    }}
                    type='button'
                    primary={true}/>
          </div>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    isSuccessful: state.get('newReview').toJS().isSuccessful,
  })}

function mapDispatchToProps(dispatch) {
  return {
    sendRequestPost: (review, posts) => dispatch(sendRequestPost(review, posts))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewReview);
