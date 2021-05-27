var username = window.location.search.slice(10);

const github_data = {
  token: atob("Z2hwX0JYSHdrWXk4WFBkQnRZdmdteFg2TmU2aFpmeEFjUDB0dVVGcg=="),
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
            resourcePath
            languages(last:10){
              totalCount
              nodes{name,color}
            }
          }
        }
        
      } 
  }
`;

//Fetch data from api and add to DOM

fetchData(query, { username: github_data["username"] }).then((data) => {
  console.log(data);

  if (data.data.user === null) {
    alert("User not found");
    window.history.back();
  } else {
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

    var general__container =
      document.getElementsByClassName("general__container")[0];
    var loading__logo = document.getElementsByClassName("loading__logo")[0];

    var navbar__avatar__image = document.getElementsByClassName(
      "js_navbar__avatar__image"
    );
    for (var i = 0; i < navbar__avatar__image.length; i++) {
      navbar__avatar__image[i].src = avatarUrl;
    }

    var js_username = document.getElementsByClassName("js_username");
    for (var i = 0; i < js_username.length; i++) {
      js_username[i].innerHTML = login;
    }

    var js_fullname = document.getElementsByClassName("js_fullname");
    for (var i = 0; i < js_fullname.length; i++) {
      js_fullname[i].innerHTML = name;
    }

    var js_description = document.getElementsByClassName("js_description")[0];
    js_description.innerHTML = bio;

    var js_followers = document.getElementsByClassName("js_followers")[0];
    var js_following = document.getElementsByClassName("js_following")[0];

    js_followers.innerHTML = followers.totalCount;
    js_following.innerHTML = following.totalCount;

    var js_location = document.getElementsByClassName("js_location")[0];
    js_location.innerHTML = location;

    var js_mail = document.getElementsByClassName("js_mail")[0];
    js_mail.innerHTML = email;
    js_mail.href = `mailto:${email}`;

    var js_twitterusername =
      document.getElementsByClassName("js_twitterusername")[0];
    js_twitterusername.innerHTML = twitterUsername;
    js_twitterusername.href = `https://twitter.com/${twitterUsername}`;

    var js_status = document.getElementsByClassName("js_status")[0];
    if (status === null) {
      js_status.style.display = "none";
    } else {
      var status__emoji = document.getElementsByClassName("status__emoji")[0];
      status__emoji.innerHTML = `${status.emojiHTML}`;

      var status__info = document.getElementsByClassName("status__info")[0];
      status__info.innerHTML = status.message;
    }

    var repository__group =
      document.getElementsByClassName("repository__group")[0];

    for (var i = 0; i < repositories.nodes.length; i++) {
      var repository = document.createElement("div");
      repository.className = "repository";

      var project__title = document.createElement("a");
      project__title.href = `https://github.com${repositories.nodes[i].resourcePath}`;
      project__title.target = "_blank";
      project__title.innerHTML = `${repositories.nodes[i].name}`;

      var project__description = document.createElement("p");
      if (repositories.nodes[i].description === null) {
        project__description.innerHTML = "";
      } else {
        project__description.innerHTML = `${repositories.nodes[i].description}`;
      }

      var repository__details = document.createElement("div");
      repository__details.className = "repository__details";
      repository__details.appendChild(project__title);
      repository__details.appendChild(project__description);

      var repository__languages = document.createElement("div");
      repository__languages.className = "repository__languages";

      var language__container = document.createElement("div");
      language__container.className = "language__container";

      console.log(repositories.nodes[i].languages);
      for (var x = 0; x < repositories.nodes[i].languages.nodes.length; x++) {
        if (language__container.children.length === 3) {
          break;
        }

        var language = document.createElement("div");
        language.className = "language";

        var language__color = document.createElement("div");
        language__color.className = "language__color";
        language__color.style.backgroundColor =
          repositories.nodes[i].languages.nodes[x].color;

        var language__name = document.createElement("span");
        language__name.className = "language__name";
        language__name.innerHTML = `${repositories.nodes[i].languages.nodes[x].name}`;

        language.appendChild(language__color);
        language.appendChild(language__name);

        language__container.appendChild(language);
      }

      repository__languages.appendChild(language__container);

      repository.appendChild(repository__details);
      repository.appendChild(repository__languages);

      repository__group.append(repository);
    }

    loading__logo.style.display = "none";
    general__container.style.display = "flex";
  }
});
