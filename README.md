# RecipeRave
RecipeRave is a web application where users can discover various food recipes, write about their recipes and share it to other people around the world.

This is a robust web app that properly formats user input and displays them in a blog format that ensures visibility and makes it easy to read for others. Secured and simplified user authentication using JWT tokens for better user experience. It uses an algorithm that displays recipes that have more interactions, based on user comments and likes for a certain period and reshuffles the recipe post for better reach and more visibility for all recipes accross all categories.  

## Technologies
* **Back-end:** JavaScript(ES6), Node.js, Express.js
* **Front-end:** HTML/CSS
* **Database:** MongoDB

### Libraries used:
* Quill.js (text editor for accepting user article input. [Learn more...](https://quilljs.com/))
* Multer.js (For file/image uploads. [Learn more...](https://www.freecodecamp.org/news/simplify-your-file-upload-process-in-express-js/))
* Passport.js (For user session and authentication. [Learn more...](https://www.passportjs.org/))
* moment.js (For recording date and time. [Learn more...](https://momentjs.com/))

## Setup and Installation

1. **Prerequisites:**
    - Node.js (version 20.x.x)
    - MongoDB (Running on default port 27017 or set via environment variables)
    - Git

2. **Clone the repository:**
    ```sh
    git clone https://github.com/your-github-username/RecipeRave-web-app.git
    cd RecipeRave-web-app
    ```

3. **Install dependencies:**
    ```sh
    npm install
    ```

4. **Environment Variables:**
    Create a `.env` file in the root directory and set the following variables:
    - `PORT`: Port for the server (default: 5000)  
    - `DB_HOST`: MongoDB host (default: localhost)
    - `DB_PORT`: MongoDB port (default: 27017)
    - `DB_DATABASE`: Database name (default: recipe_rave)
    - `SECRET_KEY`: Randomly generated key to be used for session security(you can use `UUID4` to generate a random key)

5. **Running the application:**
    - Start the server:
        ```sh
        npm run start-server
        ```
    - To view the application on your browser:
        ```sh
        http//:localhost:`PORT`
        ```
        Copy that above and implement the port used to access the application