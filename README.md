# Stellar Burgers

#### [GitHub Pages](https://daryamakavchik.github.io/react-burger/)
#### [Figma](https://www.figma.com/file/ocw9a6hNGeAejl4F3G9fp8/React-_-%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%BD%D1%8B%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D1%87%D0%B8-(3-%D0%BC%D0%B5%D1%81%D1%8F%D1%86%D0%B0)_external_link?node-id=2974:2989) 

## Description
"Stellar Burgers" is a portfolio project created as an assignment for [Yandex.Practicum](https://practicum.yandex.com/web/ "Web Development Program"). It is an interactive application where a user can:

- create a unique burger by dragging items from left to right
- arrange the ingredients in the right order
- log in / register
- place an order
- get acquainted with the details of both orders and ingredients
- view the order history (all users' and his own)
- edit profile information
- log out of personal account
- recover a forgotten password


<img width="1396" alt="drag" src="https://github.com/daryamakavchik/react-burger/assets/90967822/96066dbe-5aeb-44ad-8009-616cfa752ec4">
</br>
<img width="1396" alt="login" src="https://github.com/daryamakavchik/react-burger/assets/90967822/21701ea3-723f-41cb-977b-0b3ed2799769">
</br>
<img width="1396" alt="order" src="https://github.com/daryamakavchik/react-burger/assets/90967822/27c33297-c277-4103-beb7-a83ddaaf989b">
</br>
<img width="1396" alt="account" src="https://github.com/daryamakavchik/react-burger/assets/90967822/6e0bc300-e67b-4864-a53b-dd98e7d4d697">
</br>
<img width="1396" alt="feed" src="https://github.com/daryamakavchik/react-burger/assets/90967822/e5b94445-021c-4888-8bb6-78f61d7067de">

## Tech Stack:
![HTML](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

## Implementation
* CSS Modules
* React DnD
* WebSocket

Backend, database and API were developed by Yandex Practicum team and are stored on the company's server separately from this project.
Some pages are protected by authorization, API data transfer passes through a secure connection.

## Installation

```bash
# Clone the repository
git clone https://daryamakavchik.github.io/react-burger/
# Enter the project directory
cd react-burger
# install dependencies
npm install
# build in production
npm run build
# start testing the application
npm run test
# run the server on localhost:3000
npm run start
```

## To Do
- [ ] fix login error page bug
- [ ] make the website responsive
- [ ] work on sorting in the Order history tab
