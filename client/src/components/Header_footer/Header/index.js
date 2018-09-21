import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';


import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/user_actions';

class Header extends Component {
    state = {
        page:[
            {
                name:'Home',
                linkto:'/',
                public: true
            },
            {
                name:'Guitars',
                linkto:'/shop',
                public: true
            }
        ],
        user:[
            {
                name:'My Cart',
                linkto:'/user/cart',
                public: false
            },
            {
                name:'My Account',
                linkto:'/user/dashboard',
                public: false
            },
            {
                name:'Login',
                linkto:'/register_login',
                public: true
            },
            {
                name:'Logout',
                linkto:'/user/logout',
                public: false
            }
        ]
    }
    
    logoutHandler = () => {
        this.props.dispatch(logoutUser()).then(response => {
            if(response.payload.success){
                this.props.history.push('/')
            }
        })
    }
    
    defaultLink = (item, i) => (
        item.name === 'Logout' ?
            <div className="log_out_link"
                key={i}
                onClick={()=> this.logoutHandler()}
            >
                {item.name}
            </div>
        :
        <Link to={item.linkto} key={i}>
            {item.name}
        </Link>
    )    

    cartLink = (item,i) => {
        const user = this.props.user.userData;

        return (
            <div className="cart_link" key={i}>
                <span>{user.cart ? user.cart.length:0}</span>
                <Link to={item.linkto}>
                    {item.name}
                </Link>
            </div>
        )
    }

    showLinks = (type) => {
        let list = [];
        if(this.props.user.userData){
            type.forEach((item)=>{
                if(!this.props.user.userData.isAuth){
                    if(item.public){
                        list.push(item)
                    }
                } else {
                    if(item.name !== 'Login'){
                        list.push(item)
                    }
                }
            })
        }

        return list.map((item, i) => {
            if(item.name !== 'My Cart'){
                return this.defaultLink(item,i)
            } else {
                return this.cartLink(item,i)
            }
           
        });

    }



    render() {
        return (
            <header className="bck_b_light">
                <div className="container">
                    <div className="left">
                        <div className="logo">
                            WAVES
                        </div>
                    </div>
                    <div className="right">
                        <div className="top">
                            {this.showLinks(this.state.user)}
                        </div>
                        <div className="bottom">
                            {this.showLinks(this.state.page)}
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(withRouter(Header));