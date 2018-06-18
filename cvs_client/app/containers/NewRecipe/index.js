/*
 *
 * NewRecipe
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { requestProductList, sendRequestPost } from './actions'
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

export class NewRecipe extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)
    this.state = {
      selectedItem: null,
      searchText: '',
      selectedItems: [],
      recipeTitle:'',
      posts: [{
        image: undefined,
        content: undefined,
        imageURL: undefined
      }],
    }
    this.onSearchInputChange = this.onSearchInputChange.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
  }

  onSearchInputChange(event){
      this.props.requestProductList(event.target.value)
      this.setState({searchText: event.target.value, selectedItem: null})
  }

  onClickDelete(item){
    this.setState({selectedItems: this.state.selectedItems.filter(function(list) {
      return list !== item
  })});
  }

  componentWillReceiveProps (nextProps) {
    if(!this.props.isSuccessful && nextProps.isSuccessful){
      this.props.router.push('/recipeAll')
    }
  }

  render() {
    let searchSuggestion;
    if(this.props.productList !== undefined){
      searchSuggestion = this.props.productList.results && this.props.productList.results.slice(0,10).map((item) => item.name)
    }
    else{
      searchSuggestion=[];

    }
    return (
      <div style={{margin: '0px 20px'}}>
        <Heading tag='h2'>새 레시피 작성</Heading>
        <Title>레시피 제목</Title>
        <Form style={{width: '100%'}}>
          <FormField label="레시피 제목을 작성해주세요" style={{margin: '10px 20px', width: 'auto'}}>
            <TextInput value={this.state.recipeTitle} onDOMChange={(event) => this.setState({recipeTitle: event.target.value})}/>
          </FormField>
          <Title style={{marginTop: '30px'}}>재료 추가하기</Title>
          <div style={{margin: '20px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{display: 'flex', margin: '50px 20px 0 20px', justifyContent: 'center'}}>
              <Search inline={true}
                      value={(this.state.selectedItem) ? this.state.selectedItem[0].name : this.state.searchText}
                        onSelect={(item, selected) => {
                          if(selected)
                            this.setState({selectedItem: this.props.productList.results.filter((product) => product.name === item.suggestion)})
                      }}
                      onDOMChange={this.onSearchInputChange}
                      suggestions={searchSuggestion}
                      style={{width: '600px', display: 'flex'}}
              />
              <Button primary={true} plain={false} style={{ width: '100px', backgroundColor: !this.state.selectedItem && 'gray', border: '0px', boxShadow: '0 0 0 0' }} label={'ADD'} onClick={() => {
                if(this.state.selectedItem) {
                  const array = (this.state.selectedItems.concat(this.state.selectedItem))
                  this.setState({selectedItems: array.filter((item, i) => {
                    return array.findIndex((item2) => {
                      return item.id === item2.id;
                    }) === i;
                  })})}
              }}/>
            </div>
            <List style={{width: '700px', marginBottom: '50px'}}>
              {
                this.state.selectedItems.map((item, key) => {
                  return (
                    <ListItem key={key} separator='horizontal' style={{borderBottom: '1px solid rgba(0, 0, 0, 0.15)', padding: 3}}>
                      <Image style={{height: '50px', width: '50px'}} fit='contain' size='small' src={item.image}/>
                      <span>{item.name}</span>
                      <Button onClick={() => this.onClickDelete(item)}><FormTrashIcon/></Button>
                    </ListItem>
                  )
                })
              }
            </List>
          </div>
          <Title>만드는 법 작성</Title>
          {this.state.posts.map((item, key) => {
            return (
              <div key={key} style={{flexDirection: 'row', display: 'flex', margin: '10px 20px'}}>
                <label>
                  <div style={{width: '200px', height: '200px', backgroundColor: '#C0C0C0', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '20px'}}>
                    {this.state.posts[key].image ?
                      <img src={this.state.posts[key].imageURL}/>
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
                <FormField label="내용" >
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
              label='레시피 저장'
              onClick={() => {
                let ingredientsIDs = this.state.selectedItems.map((item) => {
                  return item.id
                });
                this.props.sendRequestPost({title: this.state.recipeTitle, ingredients: ingredientsIDs}, this.state.posts)
              }}
              type='button'
              style={{width: '50%', maxWidth: '90%', margin: '10px 20px'}}
              primary={true} />
          </div>
        </Form>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return ({
    productList: state.get('newRecipe').toJS().productList,
    isSuccessful: state.get('newRecipe').toJS().isSuccessful,
  })}

function mapDispatchToProps(dispatch) {
  return {
    requestProductList: (searchText) => dispatch(requestProductList(searchText)),
    sendRequestPost: (recipe, posts) => dispatch(sendRequestPost(recipe, posts))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewRecipe);
