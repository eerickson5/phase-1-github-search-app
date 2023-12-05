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
        document.getElementById("user-list").textContent = '';
        usersData.items.forEach( user => createUserCard(user) )
    })
    form.reset();
}

createUserCard = (user) => {
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
    const profileButton = document.createElement("button")
    linkWrap.href = user.html_url;
    profileButton.textContent = "See Profile"
    linkWrap.appendChild(profileButton);
    card.appendChild(linkWrap);

    const repoButton = document.createElement("button")
    repoButton.textContent = "Repos"
    repoButton.addEventListener("click", () => fetchUserRepos(user))
    card.appendChild(repoButton);

    document.getElementById("user-list").appendChild(card);
}

createRepoCard = (repo) => {
    console.log(repo)
    const card = document.createElement('div');
    card.classList.add("repo-card");

    const nameHeader = document.createElement("h3")
    nameHeader.textContent = repo.name;
    card.appendChild(nameHeader);

    const description = document.createElement("p")
    description.textContent = repo.description;
    description.style.maxHeight = "170px";
    card.appendChild(description);

    const linkWrap = document.createElement("a")
    const button = document.createElement("button")
    linkWrap.href = repo.html_url;
    button.textContent = "See Repo"
    linkWrap.appendChild(button);
    card.appendChild(linkWrap);

    document.getElementById("repos-list").appendChild(card);
}

fetchUserRepos = (user) => {
    const repoList = document.getElementById("repos-list")
    repoList.textContent = '';

    fetch(`https://api.github.com/users/${user.login}/repos`, {
        headers: {
            "Accept": "application/vnd.github.v3+json"
        }
    })
    .then(res => res.json())
    .then(repoData => {
        repoData.forEach( repo => createRepoCard(repo))
    })

    const nameHeader = document.createElement("h2")
    nameHeader.textContent = user.login;
    repoList.appendChild(nameHeader);
}

document.addEventListener('DOMContentLoaded', () => init())
init = () => {
    document.getElementById("github-form").addEventListener("submit", event => handleFormSubmission(event));
}