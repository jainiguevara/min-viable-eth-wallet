import React, { useEffect, useState } from 'react'
import { AsyncStorage } from 'react-native'
import eth from 'ethereumjs-wallet'
import ICAP from 'ethereumjs-icap'

let UserContext
UserContext = React.createContext()
const { Provider } = UserContext

const UserProvider = ({ children }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const address = ICAP.fromAsset({
    asset: 'ETH',
    institution: 'XREG',
    client: '010530667' //sample only
  })

  const loadWallets = async email => {
    const arr = await AsyncStorage.getItem(email)
    return JSON.parse(arr)
  }

  const loadKeys = async (email, password) => {
    setLoading(true)
    const arr = await AsyncStorage.getItem(email);
    const newArr = JSON.parse(arr).reduce((acc, value) => {
      const wallet = eth.fromV3(value, password)
      const keys = {
        private: wallet.getPrivateKeyString(),
        public: wallet.getPublicKeyString()
      }
      acc.push(keys)
      return acc;
    }, []);
    setLoading(false)
    return newArr
  }

  const handleEmailChange = text => {
    setMessage('')
    setEmail(text.toLowerCase())
  }

  const handlePasswordChange = text => {
    setMessage('')
    setPassword(text)
  }

  const submitForm = async () => {
    setMessage('')
    setLoading(true)
    if (email === '' || password === '') {
      setMessage('Email and Password required')
      setLoading(false)
      setSuccess(false)
    } else {

      if (!isEmailFormatValid(email)) {
        setMessage('Wrong Email format')
        setLoading(false)
        setSuccess(false)
      } else {
        const userWallet = eth.generate(address)
        const input = userWallet.toV3(password)
        const wallet = await loadWallets(email)
        const newArr = wallet === null ? [] : wallet
        newArr.push(input)
        await AsyncStorage.setItem(email, JSON.stringify(newArr))
        setMessage(`Wallet created!`)
        setEmail('')
        setPassword('')
        setLoading(false)
        setSuccess(true)
      }
    }
  }

  return (
    <Provider value={{
      submitForm,
      handleEmailChange,
      handlePasswordChange,
      loadKeys,
      email,
      password,
      message,
      loading,
      success,
    }}>
      {children}
    </Provider>
  )
}

export { UserProvider, UserContext }


function isEmailFormatValid(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}