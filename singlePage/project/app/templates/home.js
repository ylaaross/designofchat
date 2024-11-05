
export default class Home extends HTMLElement {
    constructor() {super()
        this.innerHTML = `<loading-page></loading-page>`
    }
    
    connectedCallback() {
        this.innerHTML = `
                <html>
                <head>
                    <link rel="stylesheet" href="../style/style.css">
                </head>
                <body>
                    <header>
                    <div id="data-container"></div>
                        <img class="logo" src="../images/SVGRepo_iconCarrier.svg" alt="">
                        <div class="header-right">
                            <a href="/" class="nav__link" data-link>Home</a>
                            <a   href="#about">About</a>
                            <a  href="/dashboard" class="nav__link" data-link>Dashboard</a>
                            <a href="/login" class="nav__link" data-link>login</a>
                        </div>
                    </header>
                    <div class="center">
                    <div>
                    
                    

                        <div class="first">
                            <div class="login">
                                <h1>PingPongParadise</h1>
                                <h3>Play it now</h3>
                                <a href="/login" class="nav__link" data-link >Login</a>
                                <div id="data-container"></div>
                            </div>
                            <div class="image">
                                <img src="../images/OBJECTS.svg" alt="" srcset="">
                            </div>
                        </div>
                        <div class="second">
                            <div class="login">
                                <h1>Know Us More</h1>
                                <input type="text" id="search-input" placeholder="Search users...">
                                <div id="data-containerss"></div>
                                <p>Hi , were <span>Aymane</span>, <span>Mehdi</span> and <span>rachid</span> and we are <br>
                                    software engineering students at 1337 coding school<br>
                                     and this is our projects.</p>
                                <div class="botton">
                                    <a id="one" href="#about">About Us</a>
                                    <a id="two" href="/dashboard" class="nav__link" data-link>Dashboard</a>
                                </div>
                            </div>
                        </div>
                        <div class="tree" id="about">
                            <div class="login">
                                <h1>About us</h1>
                                <h3>Welcome to PingPongPalace, where we've redefined the <br>game of ping pong for the digital age. Founded by a <br>passionate group of friends – Aachfenn, Eboulhou, and <br>Rennatiq – our platform offers a unique blend of <br>technology and ping pong excitement. Using cutting-<br>edge tech like Django and PostgreSQL, we've built a <br>seamless and intuitive experience for players of all <br>levels. With a commitment to performance and <br>reliability, we've embraced a microservices architecture <br>to ensure smooth gameplay and easy scalability. <br>Whether you're a seasoned pro or a newcomer, there's a <br>place for you on our virtual court. Join us today and <br>experience ping pong like never before!</h3>
                            </div>
                            <div class="image">
                                <img src="../images/tennis.svg" alt="" srcset="">
                            </div>
                        </div>
                        <div class="four">
                            <div class="login">
                                <h1>Let’s Work Together</h1>
                                <div class="our_image">
                                    <img src="../images/aymane.svg" alt="" srcset="">
                                    <img src="../images/mehdi.svg" alt="" srcset="">
                                    <img src="../images/rachid.svg" alt="" srcset="">
                                </div>
                                <div class="lien">
                                    <div>
                                        <h3>Aymane</h3>
                                        <div>
                                            <a href="https://github.com/ennatiqi"><img src="../images/github.svg" alt="" srcset=""></a>
                                            <a href=""><img src="../images/linkedin-svgrepo-com (1) 3.png" alt="" srcset=""></a>
                                        </div>
                                    </div>
                                    <div>
                                        <h3>Mehdi</h3>
                                        <div>
                                            <a href=""><img src="../images/github.svg" alt="" srcset=""></a>
                                            <a href=""><img src="../images/linkedin-svgrepo-com (1) 3.png" alt="" srcset=""></a>
                                        </div>
                                    </div>
                                    <div>
                                        <h3>Rachid</h3>
                                        <div>
                                            <a href=""><img src="../images/github.svg" alt="" srcset=""></a>
                                            <a href=""><img src="../images/linkedin-svgrepo-com (1) 3.png" alt="" srcset=""></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
        `;
        const searchInput = this.querySelector('#search-input');
        searchInput.addEventListener('input', this.searchUsers.bind(this));
        this.fetchUsers();
        this.fetchfriends();
    }
    fetchUsers() 
    {
        fetch ('http://127.0.0.1:8000/api/users/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.users = data; // Store fetched users in the variable
                this.displayUsers(this.users); // Display all users initially
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }
    fetchfriends() 
    {
        fetch ('http://127.0.0.1:8000/api/friendship/get/')
            .then(response => {
                if (!response.ok) 
                {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });


            fetch(`http://127.0.0.1:8000/api/friends/${userId}/`)
            .then(response => response.json())
            .then(data => {
            console.log(data.friends);
            })
            .catch(error => console.error('Error fetching friends:', error));
    }

    displayUsers(users) 
    {
        const container = this.querySelector('#data-containerss');
        container.innerHTML = '';
        users.forEach(user => 
            {
                const userDiv = document.createElement('div');
                userDiv.innerText = `ID: ${user.id}, Username: ${user.username}, Email: ${user.email}`;
                const submitButton = document.createElement('button');
                submitButton.innerText = 'Submit';
                submitButton.type = 'submit';
                submitButton.id = user.id;
                submitButton.addEventListener('click', () => 
                {
                    this.handleButtonClick(user.id,users[1].id);
                });
                userDiv.appendChild(submitButton);
                container.appendChild(userDiv);
            });
    }
    
    addFriendship(userId, friendId) 
    {
        
        fetch('http://127.0.0.1:8000/api/friendship/add/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: userId,   // ID of the user sending the request
                friend_id: friendId // ID of the user to be added as a friend
            })
        })
        .then(response => 
        {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => console.log('Friendship added:', data))
        .catch(error => console.error('Error:', error));
    }
    
    handleButtonClick(userId,friend_id) 
    {
        // console.log(userId,friend_id);
        this.addFriendship(userId, friend_id);
    }

    searchUsers() 
    {
        const searchInput = this.querySelector('#search-input').value.toLowerCase();
        const filteredUsers = this.users.filter(user =>
            user.username.toLowerCase().includes(searchInput)
        );
        this.displayUsers(filteredUsers); // Display filtered users
    }
}

customElements.define("home-page", Home);
