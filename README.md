# Wanderlust Project

Wanderlust is a full stack web application inspired by Airbnb where users can create and explore travel listings.


## 🚀 Features

- Create new listings
- View all listings
- Edit existing listings
- Delete listings
- Image display for listings
- Responsive UI using Bootstrap

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS
- Bootstrap

## 📂 Project Structure
```
wanderlust-project/
├── models/
│   └── listing.js
├── views/
│   ├── listings/
│   ├── layouts/
│   └── index.ejs
├── public/
│   ├── css/
│   ├── js/
│   └── images/
├── routes/
│   └── listings.js
├── controllers/
│   └── listings.js
├── app.js
├── package.json
├── package-lock.json
└── .gitignore
```


## ▶️ How to Run the Project

1. Clone the repository
2. Install dependencies

   npm install

3. Start the server

     nodemon app.js

4. Open browser

http://localhost:8080


# Work In Progress
These features are currently being developed:

- User authentication and authorization
- Advanced search and filtering
- User reviews and ratings
- Booking system
- Payment integration
- Map integration for location display
- Email notifications
- User profile management


## 🛠️ Create Project Structure

From terminal in `wanderlust-project`:

- `mkdir -p models views/listings views/layouts public/css public/js public/images routes controllers`
- `touch app.js package.json .gitignore`
- `touch models/listing.js routes/listings.js controllers/listings.js`
- `touch views/index.ejs views/listings/index.ejs views/listings/new.ejs views/listings/edit.ejs views/layouts/main.ejs`

Optional file layout command:

- `tree -a` (Windows: `tree /F`)

Use these folders/files as a starting scaffold before adding code.

## 🤝 Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch for your feature.
3. Make your changes and test thoroughly.
4. Submit a pull request with a clear description.

Please follow the existing code style and include tests if applicable.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions or support, reach out to the project maintainer at [abhishekshinde5805@example.com] or open an issue on GitHub.

## 🙏 Acknowledgments

- Inspired by Airbnb.
- Thanks to the open-source community for tools like Node.js, Express, and Bootstrap.