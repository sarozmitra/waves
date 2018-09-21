import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

export default class Paypal extends Component {
  render() {

    const onSuccess = (payment) => {
        //console.log(JSON.stringify(payment))
        this.props.onSuccess(payment);
    }

    const onCancel = (data) => {
        console.log(JSON.stringify(data))
    }

    const onError = (er) => {
        console.log(JSON.stringify(er))
    }

    let env = 'sandbox';
    let currency = 'GBP';
    let total = this.props.toPay;

    const client = {
        sandbox:'AW7VbWu4hQ9XllbJy9tfoC65Cg2A3gLAt6GZYzGBQwiFBBGV5cvlXmNRkOKfpzPPZwsFFi0jPwB5F9pU',
        production:'' 
    }



    return (
        <div>
            <PaypalExpressBtn 
                env={env}
                client={client}
                currency={currency}
                total={total}
                onSuccess={onSuccess}
                onError={onError}
                onCancel={onCancel}
                style={{
                    size:'large',
                    color:'blue',
                    shape:'rect',
                    label:'checkout'
                }}
            />
        </div>
    )
  }
}
