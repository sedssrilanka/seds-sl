# SEDS SL Website

This is the official repository for the SEDS Sri Lanka website, built with Next.js, TypeScript, and Tailwind CSS.

## Getting Started

Follow these instructions to set up the project on your local machine for development and testing purposes.

### Prerequisites

Make sure you have [pnpm](https://pnpm.io/installation) installed on your system.

### Installation

1. **Clone/Fork the repository:**

    ```bash
    git clone https://github.com/sedssrilanka/seds_sl.git
    cd seds_sl
    ```

2. **Install dependencies:**

    ```bash
    pnpm install
    ```

### Running the Development Server

To start the development server, run the following command:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Code Style and Formatting

This project uses [Biome](https://biomejs.dev/) for code formatting and linting to ensure code consistency.

### Formatting

Before committing your changes, make sure to format the code by running:

```bash
pnpm format
```

This command will format all the necessary files in the project.

### Linting

To check for any linting errors, run:

```bash
pnpm lint
```

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

For more detailed information, please check out our [Contributing Guide](.github/CONTRIBUTING.md).

### Contribution Workflow

1. **Fork the Project:** Click the 'Fork' button at the top right of the main repository page.
2. **Create your Feature Branch:**

    ```bash
    git checkout -b feature/AmazingFeature
    ```

3. **Commit your Changes:**

    ```bash
    git commit -m 'Add some AmazingFeature'
    ```

4. **Push to the Branch:**

    ```bash
    git push origin feature/AmazingFeature
    ```

5. **Open a Pull Request:** Go to the repository on GitHub and open a new pull request.

### Pull Request Guidelines

- Ensure your code adheres to the project's code style. Run `pnpm format` and `pnpm lint` before submitting.
- Provide a clear and descriptive title for your pull request.
- In the pull request description, explain the changes you have made and why.
- If your pull request addresses an open issue, please link it in the description.

### Requesting New Components or Features

If you need a new component or want to request a new feature, please do so by creating an issue on GitHub.

1. Go to the **Issues** tab of the repository.
2. Click on **New Issue**.
3. Choose the appropriate template (e.g., "Feature request" or "Component request").
4. Fill out the template with as much detail as possible.

This helps us track requests and allows for discussion before implementation.
