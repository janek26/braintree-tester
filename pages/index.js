// @ts-nocheck
import React from 'react'
import dynamic from 'next/dynamic'

const BraintreeWithoutSSR = dynamic(
  () => import('braintree-web-drop-in-react'),
  {
    ssr: false,
  },
)

export default class Store extends React.Component {
  instance

  state = {
    clientToken: '',
  }

  buy = async () => {
    const { nonce } = await this.instance.requestPaymentMethod()
    console.log(nonce)
  }

  render() {
    const { clientToken } = this.state
    return (
      <div>
        <input
          value={clientToken}
          placeholder="clientToken"
          onChange={e => this.setState({ clientToken: e.target.value })}
        />
        {clientToken.length > 10 && (
          <BraintreeWithoutSSR
            options={{
              authorization: clientToken,
              locale: 'de_DE',
              paypal: {
                flow: 'vault',
              },
            }}
            onInstance={instance => (this.instance = instance)}
          />
        )}
        <button onClick={this.buy}>Buy</button>
      </div>
    )
  }
}
