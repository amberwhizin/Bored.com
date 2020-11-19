const Credentials = () => {
    // console.log(process.env.REACT_APP_clientID)
  return {
      
    clientSecret: process.env.REACT_APP_clientSecret,
    clientID: process.env.REACT_APP_clientID

  }
  
}

export { Credentials }
