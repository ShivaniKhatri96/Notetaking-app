# Noteworthy: A Notetaking-app: V2

## I will add version 2 updates in this branch

> Ready to embark on a note-taking journey? Create `noteworthy notes` with `Noteworthy`. Note is shared among all the users. However, only the note's creator can edit and delete it.

### Recent updates

- Navigation bar context menu (for large screens) issue fixed
- Navigation image logo now has animation on hover to make it clear that you can click and go back to home page

### Currently working on

- Navigation bar for mobile version

### Things I want to add and improve in version 2

- Allow a note's creator to make it private.
  > The idea is to show the private notes in `MyNotesView` page. I will do it in `version2`
- Be accessible from a public url
- Fix bug related to context menu I created. It tends to overflow from the window
- Navigation bar for mobile version: different style basically

### Tools used

> Frontend

- `Vue 3` used as a Frontend Framework
- `Vue-router` used for routing
- `Pinia` used for managing global states
- `Vanilla CSS` used for styling
- `Font awesome` used for icons
  > I didn't use CSS framework because I am working with a new javascript Framework. So, I wanted to keep things as simple as possible to make learning Vue.js smoother.

> Backend

- `Node.js`
- `Express.js`
- `MongoDB (cloud)`
  > I didn't spent too much time on `backend`. So, it might not be perfect. My focus was to make `frontend` better.

### Responsive Design

- The website is responsive and it works on all devices
  > I will improve the responsiveness in `version2` and make it even better.
  > Here, you can see examples for `small` and `large` screens
  >
  > ![welcome small screen](./frontend/public/readmeAssets/welcomeMobile.png) > ![Home small screen](./frontend/public/readmeAssets/homeMobile.png) > ![welcome large screen](./frontend/public/readmeAssets/welcome.png) > ![Home large screen](./frontend/public/readmeAssets/home.png)

### Functionalities

- Requires a login to access
- It allows for more than one user. Each user have a username and an individual password
- The app allows the user to create and read notes
- Created notes are saved and retrieved on next visit
- It shows which user created a note
- It allows only note's creator to edit and delete it
  > Basically, POC and MVP are completed.

### Links used

- [Adobe express](https://new.express.adobe.com/) used for creating logo
- [css-box-shadow-examples](https://getcssscan.com/css-box-shadow-examples) used for Box-shadow
- [font awesome](https://fontawesome.com/) used for icons
- [Microsoft copilot](https://copilot.microsoft.com/) used to generate animated drawings
- [animista](https://animista.net/), CSS animations library, used for animations

### Final Notes

> It was really fun working on this project. Even though the final design is my own, I did took a lot of inspiration from [Google keep](https://keep.google.com/), [Dribbble](https://dribbble.com/) and [Facebook Posts](https://www.facebook.com/).

### Opening/ Running the file

#### Backend

> `npm run dev` or `npm run start`

#### Frontend

> `npm run dev`
