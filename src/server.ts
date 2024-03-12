import app from './app'
import config from './config/constant'

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const port = config.app.PORT

app.listen(port, function() {
  return console.log(`Server is running on ${port}`)
})
