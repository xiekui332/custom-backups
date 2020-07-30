import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import LeftCon from './common/LeftWrapper'
import MiddleWrapper from './common/MiddleWrapper'
import RightWrapper from './common/RightWrapper'
import StickPage from '../stick/stick'
import { sessionGetItem } from '../../api'
import { actionCreators } from './store'
import { 
    ConWrapper,
    RightCon
 } from './style'

class Home extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            login:sessionGetItem('isLogin')
        }
    }
    render () {
        const { login } = this.state;
        let JSONUser = sessionStorage.getItem("user")
        if(login && JSONUser){
            let user = JSON.parse(JSONUser)
            if(user && user.userType === 1) {
                return <Redirect to="/user"></Redirect>
            }
            return (
                <ConWrapper>
                    <LeftCon />
                    <RightCon>
                        {
                            this.props.isStick?
                            <Fragment>
                                <StickPage />
                            </Fragment>
                            :
                            <Fragment>
                                <MiddleWrapper />
                                <RightWrapper />
                            </Fragment>
                        }
                        
                        
                    </RightCon>
                </ConWrapper>
            )
        }else{
            return <Redirect to="/login"></Redirect>
        }
        
    }


    componentDidMount() {
        let params = {
            isAdd:false
        }
        this.props.handleaddSatus(params)

        this.props.disShowDetail(false)
    }
    
}

const mapState = (state) => ({
    isStick:state.getIn(['left', 'isStick'])
})

const mapDispatch = (dispatch) => ({
    // 清除状态
    handleaddSatus(data) {
        
        const action = actionCreators.changeIsAdd(data)
        dispatch(action)
    },
    
    // 派发展示客户详情状态
    disShowDetail(bool) {
        let action = actionCreators.changeShowDetail(bool)
        dispatch(action)
    }
})

export default connect(mapState, mapDispatch)(Home) 