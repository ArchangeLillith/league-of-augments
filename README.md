<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/ArchangeLillith/knitters-fren">
    <img src="/public/screenshots/square-logo.png" alt="Logo" width="250" height="250" style="border-radius: 50px;">
  </a>

  <h3 align="center">League of Augments</h3>

  <p align="center">
    A site to track unique wins and make builds per champion in League of Legends. Build suggestion feature coming soon!
    <br />
    <a href="https://github.com/ArchangeLillith/knitters-fren"><strong>Explore the docs »</strong></a>
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ul>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#deployment">Deployment</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#gallery">Gallery</a></li>
    <li><a href="#for-developers">For Developers</a></li>
    <li><a href="#license">License</a></li>
  </ul>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<img src="/public/screenshots/loa-home.png" alt="home page screenshot" width="1000" height="500">

A small application that was created to help myself and friends track who they've won with visually for League of Legends Arena mode. 60 unique champion wins grants the title Arena God, and knowing that people were using everything from a napkin on their desk to private messages to themselves, I felt compelled to create an easier way to track wins. I also was unhappy with build websites displaying pick rate for the augments, so I added a build section where the user can select what augments are a priority for that champ. 

A user suggested a build helper, where one can input their augments and get back items that work with that augment. It's a work in progress currently, the data entry into the database is almost done!

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With
<div align="center">

[![React][React.js]][React-url]
[![nodejs][nodejs]][nodejs-url]
[![express][express]][express-url]
[![Passport][Passport]][Passport-url]
[![JWT][JSON-web-tokens]][JSON-web-tokens-url]
[![MySQL][MySQL]][MySQL-url]
[![S3][S3]][S3-url]
[![bcrypt][bcrypt]][bcrypt-url]
[![js-cookie][js-cookie]][js-cookie-url]
[![cors][cors]][cors-url]
[![esbuild][esbuild]][esbuild-url]
[![vite][vite]][vite-url]

</div>

This stack is my most used, though I did dabble in jest's testing suite to continue my pattern of adding a new tech or two everytime I start another project. I found quickly that it wasn't useful for my case, finding manual testing of the frontend faster than learning and writing the jest tests. I wanted to respect that Arena mode is only out for a period of time. All that said, I decided to only manually test and pause on learning jest, knowing I wanted this deployed asap, and have booked time after Arena is over to go through and write frontend test with jest. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Deployment
<div align="center">
To track you Arena God progress, go see the site in action: 
  <br/>
  <br/>
  
  [![loa][loa]][loa-url]
  
</div>


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

This was a fun project as I wanted to make the champ portraits drag and drop. I used a library to allow users to drag a champion from one category to another, and a search function to quickly show the user where a champ lived within the categories. The alphebetise button sorts all categories from A-Z within their box, helping users find champions faster. 

When a champion portrait is clicked instead of dragged, it opens a build page for that champ specifically! In that build page a user can select the augments they think work with that champ, and view the details of each augment on hover - more info than the game itself gives!
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap
- [x] Create the core tracking page
- [x] Hook into external API's for champ data
- [x] Add drag and drop functionality 
- [x] Add search functionality
- [x] Create build pages
- [x] Allow registration and user accounts
- [x] Style the pages
- [x] Tag items and augments
- [x] Add tags to the database
- [ ] Create the AugmentAlchemy page (build helper)
- [ ] Create a win tracking page where users can register wins and fun stats!
- [ ] Add a 404 page


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GALLERY -->
## Gallery
See the pages here!

<details open>
  <summary>Login Page</summary>
 <img src="/public/screenshots/loa-login-screen.png" alt="login page" width="1000" height="500">
</details>

<details>
  <summary>Home Page (champion tracking page)</summary>
 <img src="/public/screenshots/loa-home.png" alt="home page" width="1000" height="500">
</details>

<details>
  <summary>Build Page</summary>
  <img src="/public/screenshots/loa-champ-page.png" alt="build page per champ" width="1000" height="500">
</details>

<details>
  <summary>Augment Hover Example</summary>
 <img src="/public/screenshots/loa-augment-hover.png" alt="augment hover effect" width="300" height="500">
</details>

<details open>
  <summary>AugmentAlchemy Mock(build helper page)</summary>
  <img src="/public/screenshots/loa-augment-alchemy-mock.png" alt="augment alchemy build helper mock" width="1000" height="700">
</details>


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!--DEV -->
### For Developers

If you'd like to run a local copy of this project, please follow the steps below to do so!

1. Clone the repo
   ```sh
   git clone https://github.com/ArchangeLillith/knitters-fren
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Boot the project (backend lives on localhost:3000, frontend lives on localhost:8000)
    ```sh
   npm run dev
   ```



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[loa]: https://img.shields.io/badge/live_site!-183c66?style=for-the-badge
[loa-url]: https://league-of-augments-f529fd39ce55.herokuapp.com/
[vite]: https://img.shields.io/badge/vite-8A89FF?style=for-the-badge&logo=vite&logoColor=DAA520
[vite-url]: https://vite.dev/
[dayjs]: https://img.shields.io/badge/dayjs-FF6347?style=for-the-badge
[dayjs-url]: https://day.js.org/
[esbuild]: https://img.shields.io/badge/esbuild-F4C430?style=for-the-badge&logo=esbuild&logoColor=000000
[esbuild-url]: https://esbuild.github.io/
[cors]: https://img.shields.io/badge/CORS-E8A87C?style=for-the-badge&logo=c&logoColor=8B4000
[cors-url]: https://github.com/expressjs/cors
[js-cookie]: https://img.shields.io/badge/JS_Cookie-D2B48C?style=for-the-badge&logo=javascript&logoColor=8B4513
[js-cookie-url]: https://www.npmjs.com/package/js-cookie
[bcrypt]: https://img.shields.io/badge/bcrypt-90EE90?style=for-the-badge&logo=bloglovin&logoColor=2A9D8F
[bcrypt-url]: https://github.com/kelektiv/node.bcrypt.js
[nodejs]: https://img.shields.io/badge/node.js-d8e3db?style=for-the-badge&logo=nodedotjs&logoColor=#fffffff
[nodejs-url]: https://nodejs.org/en
[express]: https://img.shields.io/badge/express-c3c6c7?style=for-the-badge&logo=express&logoColor=##9ccce6
[express-url]:https://expressjs.com/
[Passport]: https://img.shields.io/badge/Passport-4e5052?style=for-the-badge&logo=passport&logoColor=#62e371
[Passport-url]: https://www.passportjs.org/
[JSON-web-tokens]:https://img.shields.io/badge/JSON_Web_Tokens-6fd1cb?style=for-the-badge&logo=jsonwebtokens&logoColor=#fffffff
[JSON-web-tokens-url]: https://jwt.io/
[MySQL]: https://img.shields.io/badge/MySQL-ffffff?style=for-the-badge&logo=mysql&logoColor=#fffffff
[MySQL-url]: https://www.mysql.com/
[S3]: https://img.shields.io/badge/Amazon_S3-e5e5e5?style=for-the-badge&logo=amazon-s3
[S3-url]: https://aws.amazon.com/pm/serv-s3/?gclid=EAIaIQobChMIzbHh-_XgiAMVci2tBh0TGjcJEAAYASAAEgL-KvD_BwE&trk=936e5692-d2c9-4e52-a837-088366a7ac3f&sc_channel=ps&ef_id=EAIaIQobChMIzbHh-_XgiAMVci2tBh0TGjcJEAAYASAAEgL-KvD_BwE:G:s&s_kwcid=AL!4422!3!536324434071!e!!g!!amazon%20s3!11346198420!112250793838
