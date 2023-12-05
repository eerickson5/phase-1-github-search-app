//Accept: application/vnd.github.v3+json

handleFormSubmission = (event) => {
    event.preventDefault();
    const form = event.target;
    searchInput = form.childNodes[1].value
    fetch(`https://api.github.com/search/users?q=${searchInput}`,{
        headers:{
            "Accept": "application/vnd.github.v3+json"
        }
    })
    .then(res => res.json())
    .then(usersData => {
        usersData.items.forEach( user => createUserCard(user) )
    })
    form.reset();
}

createUserCard = (user) => {
    console.log(user);

    const card = document.createElement('div');
    card.classList.add("user-card");

    const nameHeader = document.createElement("h2")
    nameHeader.textContent = user.login;
    card.appendChild(nameHeader);

    const avatar = document.createElement("img")
    avatar.src = user.avatar_url;
    avatar.classList.add("avatar");
    card.appendChild(avatar);

    const linkWrap = document.createElement("a")
    const button = document.createElement("button")
    linkWrap.href = user.html_url;
    button.textContent = "See Profile"
    linkWrap.appendChild(button);
    card.appendChild(linkWrap);

    console.log(card);

    document.getElementById("user-list").appendChild(card);
}

fetchUserRepos = (user) => {
    
}

document.addEventListener('DOMContentLoaded', () => init())
init = () => {
    document.getElementById("github-form").addEventListener("submit", event => handleFormSubmission(event));
}