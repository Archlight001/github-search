var username = window.location.search.slice(10);

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
        login
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

fetchData(query, { username: github_data["username"] }).then((data) => {
  console.log(data);

  //var avatarUrl = data.user.avatarUrl;
  const {
    avatarUrl,
    bio,
    login,
    status,
    name,
    followers,
    following,
    repositories,
    location,
    email,
    twitterUsername,
  } = data.data.user;

  var body = document.getElementsByClassName("body")[0]
  var navbar__avatar__image = document.getElementsByClassName("js_navbar__avatar__image");
  for(var i=0;i<navbar__avatar__image.length;i++){
    navbar__avatar__image[i].src = avatarUrl;
  }
  
  var js_username = document.getElementsByClassName("js_username");
  for(var i=0;i<js_username.length;i++){
    js_username[i].innerHTML = login;
  }
  
  var js_fullname = document.getElementsByClassName("js_fullname");
  for(var i=0;i<js_fullname.length;i++){
    js_fullname[i].innerHTML = name;
  }
  
  var js_description = document.getElementsByClassName("js_description")[0];
  js_description.innerHTML = bio;

  var js_followers = document.getElementsByClassName("js_followers")[0];
  var js_following = document.getElementsByClassName("js_following")[0];
  
  js_followers.innerHTML =followers.totalCount;
  js_following.innerHTML =following.totalCount;

  var js_location = document.getElementsByClassName("js_location")[0];
  js_location.innerHTML = location;

  var js_mail = document.getElementsByClassName("js_mail")[0];
  js_mail.innerHTML =email;
  js_mail.href=`mailto:${email}`;

  var js_twitterusername = document.getElementsByClassName("js_twitterusername")[0];
  js_twitterusername.innerHTML = twitterUsername;
  js_twitterusername.href = `https://twitter.com/${twitterUsername}`

  var js_status = document.getElementsByClassName("js_status")[0]
  if(status === null){
    js_status.style.display = "none";
  }else{
    var status__emoji = document.getElementsByClassName("status__emoji")[0]
    status__emoji.innerHTML = `${status.emojiHTML}`
    
    var status__info = document.getElementsByClassName("status__info")[0]
    status__info.innerHTML = status.message
  }
  
  body.style.display="block"

});
