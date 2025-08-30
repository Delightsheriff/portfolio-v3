# Portfolio v3

This is a personal portfolio website built with Next.js, Sanity.io, and Tailwind CSS. It showcases projects, experience, and skills.

## Technologies Used

*   **Next.js:** A React framework for building server-side rendered and statically generated web applications.
*   **Sanity.io:** A headless CMS for managing structured content.
*   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
*   **Framer Motion:** A React library for creating animations.
*   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v20 or later)
*   npm

### Installation

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/Delightsheriff/portfolio-v3
    cd portfolio-v3
    ```
2.  **Install NPM packages:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and add the following environment variables:
    ```env
    NEXT_PUBLIC_SANITY_PROJECT_ID="your_sanity_project_id"
    NEXT_PUBLIC_SANITY_DATASET="your_sanity_dataset"
    NEXT_PUBLIC_SANITY_API_VERSION="your_sanity_api_version"
    # Add any other environment variables required by your project
    ```
    Replace `"your_sanity_project_id"`, `"your_sanity_dataset"`, and `"your_sanity_api_version"` with your actual Sanity.io project details. You can find these in your Sanity.io project settings.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

*   `app/`: Contains the core application code, including pages, layouts, and components.
    *   `app/api/`: API routes.
    *   `app/project/[slug]/`: Dynamic page for individual projects.
    *   `app/projects/`: Page for listing all projects.
    *   `app/resume/`: Page for displaying the resume.
    *   `app/studio/`: Sanity Studio for content management.
*   `components/`: Reusable UI components.
    *   `components/animations/`: Animation components.
    *   `components/ui/`: Basic UI elements like buttons.
*   `interface/`: TypeScript interfaces.
*   `lib/`: Utility functions and libraries.
*   `public/`: Static assets like images and fonts.
*   `sanity/`: Sanity.io client and configuration.
*   `schemaTypes/`: Sanity.io schema definitions.

## Sanity Studio

To manage the content of your portfolio, you can use Sanity Studio. It's accessible at `http://localhost:3000/studio` in the development environment. You can define your content models in the `schemaTypes/` directory and manage content through the Studio.

## Deployment

This project can be easily deployed on [Vercel](https://vercel.com/), the creators of Next.js. Follow the Vercel deployment guide for Next.js applications. Ensure that you have set up the necessary environment variables in your Vercel project settings.

## Contributing

Contributions are welcome! If you have any suggestions or find any issues, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details (if applicable).
