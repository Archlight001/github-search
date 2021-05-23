username = window.location.search.slice(10);

const github_data = {
  token: "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",
  username: username,
};

function fetchData(query, variables) {
  const baseUrl = "https://api.github.com/graphql";
  const headers = {
    "Content-Type": "application/json",
    Authorization: "token " + github_data["token"],
  };

  return fetch(baseUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(JSON.stringify(err)));
}

const query = `query getDetails($username:String!) { 
    user(login:$username){
        avatarUrl
        status{emojiHTML,message}
        name
        location
        email
        bio
        twitterUsername
        followers{
          totalCount
        }
        following{
          totalCount
        }
        repositories(last:20,orderBy:{field:CREATED_AT,direction:ASC}){
          nodes{
            id,
            name,
            description,
              languages(last:10){
              totalCount
                nodes{name}
            }
          }
        }
        
      } 
  }
`;

// fetchData(query, { username: github_data["username"] }).then((data) =>
//   console.log(data)
// );
