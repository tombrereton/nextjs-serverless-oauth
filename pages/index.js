import fetch from 'isomorphic-unfetch'



function Index({ cookie }) {
  return (
    <div>{`Cookie from response: ${cookie}`}</div>
  )
}



Index.getInitialProps = async (ctx) => {
  const response = await fetch('http://localhost:3000/api/cookies')
  let cookie = response.headers.get('set-cookie')

  if (cookie === null) {
    ctx.res.writeHead(302, { Location: '/login' });
    ctx.res.end();
    return {};
  }

  return { cookie }
}

export default Index
