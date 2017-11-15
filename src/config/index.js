let baseUrl = null

if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://192.168.2.129:8090/test'
} else {
  baseUrl = 'http://192.168.2.129:8090/test'
}

export {
  baseUrl
}
