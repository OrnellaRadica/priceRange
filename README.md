# Price Range Component

This project is built with [Next.js](https://nextjs.org/) to display a price range custom component.

Click here to see the project: https://pricerange-ornella-radica.vercel.app/

## Features

- **Draggable Bullets:** Users can manipulate two draggable bullets along the range line to define their desired price range.
  
- **Boundaries Enforcement:** The selected price range is constrained within the boundaries defined by the minimum and maximum prices. This ensures that the selected value will never fall below the minimum or exceed the maximum prices.

- **Crossing Prevention:** The component prevents the minimum and maximum values from being crossed within the range. This means the minimum value will always remain on the left side of the maximum value.

## Exercise-Specific Functionalities

### Exercise 1:

- **Clickable Currency Labels:** Users have the additional functionality of clicking on either the minimum or maximum currency number label values to set a new value. This provides an alternative method for users to define their desired price range.

### Exercise 2:

- **Restricted Range Selection:** In this exercise, users are presented with a predefined range of values. The component restricts the selection to only those values within the given range. This ensures that users can only select values that are valid and relevant to the context.


## Getting Started

To get started with the development server, run the following command:

```bash
npm run dev
```

To see excercise 1 open [http://localhost:8080/excercise1](http://localhost:8080/excercise1)

To see excercise 2 open [http://localhost:8080/excercise2](http://localhost:8080/excercise2)

## Technologies

- React
- Next Js
- Typescript
- Tailwind
- Jest
- React testing library
