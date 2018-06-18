import React from 'react';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Button from 'grommet/components/Button';
import Anchor from 'grommet/components/Anchor';
import User from 'grommet/components/icons/base/User';
import Search from 'grommet/components/icons/base/Search';
import { withRouter } from 'react-router';
import Menu from 'grommet/components/Menu'
import Tip from 'grommet/components/Tip'
import ClickOutside from 'react-click-outside'


class CustomHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(){
    super()
    this.state = {
      tipVisible: false
    }
  }
  render() {
    return (
      <Header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0px 15px'}}>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Title onClick={() => this.props.router.push('/')}>C:VS</Title>
          <Button plain={true} label='제품' href='/productAll'/>
          <Button plain={true} label='레시피' href='/recipeAll'/>
        </div>
        <div style={{display: 'flex'}}>
          <Anchor icon={<Search size='small'/>} label={<h4 style={{margin: '0px'}}>검색</h4>} href='/search' animateIcon={false} style={{margin : '0px 20px', display: 'flex', alignItems: 'center'}}/>
          {
            !this.props.loginResult ?
              <Anchor icon={<User size='small'/>} label={<h4 style={{margin: '0px'}}>로그인</h4>} href='/login' animateIcon={false} style={{margin : '20px 20px 21px 0px', display: 'flex', alignItems: 'center'}}/> :
              <Anchor style={{display: 'flex', alignItems: 'center', marginBottom: '2.5px'}} animateIcon={false} label={<h4 style={{margin: '0px'}}>{this.props.loginResult.username}</h4>} onClick={() => this.setState({tipVisible: !this.state.tipVisible})} id='menu'icon={<User size='small'/>}/>
          }
          {
            this.state.tipVisible ? (
                <Tip target={'menu'} colorIndex={'accent-2'}>
                  <ClickOutside onClickOutside={() => this.setState({tipVisible: false})}>
                    <div style={{flexDirection: 'row', display: 'flex'}}>
                      <Anchor onClick={
                        () => {
                          this.props.router.push('/myPage')
                          this.setState({tipVisible: false})
                        }
                      } style={{padding: '0px', textAlign: 'right', color: 'white'}} label={'마이페이지'}/>
                      <div style={{backgroundColor: 'white', width: '1px', margin: '0px 10px'}}/>
                      <Anchor style={{padding: '0px', textAlign: 'right', color: 'white'}} label='로그아웃'
                              onClick={() => {
                                this.setState({tipVisible: false}, () => {
                                  this.props.loginRequest()
                                })
                              }} animateIcon={false}/>
                    </div>
                  </ClickOutside>
                </Tip>
            ) : <div/>
          }
        </div>
      </Header>
    );
  }
}

export default withRouter(CustomHeader);
