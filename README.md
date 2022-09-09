# Node and MongoDB Boilerplate

Boilerplate code for setting up a Node and MongoDB project with Tailwind and Pug. Local authentication via Passport.

## How It's Made:

**Built with:** Node, Express, MongoDB, Passport, TailwindCSS, and Pug

This is a pretty straightforward MVC skeleton for a Node + MongoDB project. I used Mongoose for the models, and passport-local-mongoose takes case of the authentication fields (username, hash, and salt) automatically so the model doesn't even need any fields.

I added a small middleware to pass logged in status to the views automatically, and a second small middleware to make flash messages possible. The auth controllers perform server-side validation and return flash messages on both failure and success. 

I chose Pug because I like how clean it keeps the views, and Tailwind makes the CSS much easier to track and manage.

## Optimizations

- style flash messages
- client side validation
- error feedback on specific inputs
- other auth options (facebook, google, github)

## Lessons Learned:

This wasn't really a new project to me, I recently built a very similar project from scratch, and I have used Tailwind and Pug in the past. I did learn one thing, though: you don't always need a pre-built solution. I initially looked at express-flash for flash messages, but it hasn't been updated in years. After some quick Googling, I discovered it's an easy feature to implement.

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2022-present, Laura Abro









