import cookies from '../../utils/cookies'

const handler = (req, res) => {
  res.cookie('Next.js', 'api-middleware!')
  res.end()
}

export default cookies(handler)
