# Pokemon

The app provides the following features:

1. *Search Pokémon by name*: Users can easily search for Pokémon by entering their names, making it convenient to find specific Pokémon within the application.

2. *Pagination functionality*: The app incorporates pagination, allowing users to navigate through multiple pages of Pokémon listings efficiently. This feature enhances the user experience by organizing Pokémon data into manageable sections.

3. *Detailed Pokémon information*: Users can access comprehensive information about each Pokémon, including their characteristics, abilities, statistics, and more. This feature enables users to delve deeper into the Pokémon universe and learn more about their favorite characters.

Overall, the app offers a user-friendly interface with robust functionalities that cater to Pokémon enthusiasts, providing a seamless experience for exploring and learning about various Pokémon.


### Technology Stack

The app's front-end will be built using modern web technologies like:
1. Front-end:
   - HTML5
   - CSS3
   - React
   - Redux
   - Next.js
2. Testing:
   - Jest (for unit testing)
3. Additional Tools:
   - Vite (for bundling the front-end code)
   - ESLint (for code linting)
   - Prettier (for code formatting)
   - Git (for version control)

Realized logics such as:
 - Redux is integrated to the app with the help of Redux Toolkit
 - Search is saved in the store
 - Items per page is saved in the store
 - Loading indicators are shown, loading flags are saved in the store
 - When either search or items per page is changed, application makes a new call using RTK Query to fetch the data
 - Tests had been modified to test the functionality using Redux and RTK Query
