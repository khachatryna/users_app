export  async function fetchCommunity(list) {
     const data =  await Promise.all(list.map( async (username) => {
        const resp  = await fetch(`https://api.github.com/users/${username}`);
        const body =  resp.json()
        if (!resp.ok) {
            const error = (body && body.message) || body.status;
            return Promise.reject(error);
        }
        return body;
      }))
      return data
}