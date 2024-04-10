import Link from "next/link";
import React from "react";

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Price Range Component</h1>
      <p className="mb-4">
        This project is built with{" "}
        <Link
          href="https://nextjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Next.js
        </Link>{" "}
        to display a price range custom component.
      </p>
      <section className="pb-4">
        <h2 className="text-xl font-semibold mb-2">Features</h2>
        <ul className="list-disc pl-4 mb-4">
          <li>
            <strong>Draggable Bullets:</strong> Users can manipulate two
            draggable bullets along the range line to define their desired price
            range.
          </li>
          <li>
            <strong>Boundaries Enforcement:</strong> The selected price range is
            constrained within the boundaries defined by the minimum and maximum
            prices. This ensures that the selected value will never fall below
            the minimum or exceed the maximum prices.
          </li>
          <li>
            <strong>Crossing Prevention:</strong> The component prevents the
            minimum and maximum values from being crossed within the range. This
            means the minimum value will always remain on the left side of the
            maximum value.
          </li>
        </ul>
      </section>
      <section className="pb-4">
        <h2 className="text-xl font-semibold mb-2">
          Exercise-Specific Functionalities
        </h2>
        <h3 className="text-lg font-semibold mb-2">Exercise 1:</h3>
        <ul className="list-disc pl-4 mb-4">
          <li>
            <strong>Clickable Currency Labels:</strong> Users have the
            additional functionality of clicking on either the minimum or
            maximum currency number label values to set a new value. This
            provides an alternative method for users to define their desired
            price range.
          </li>
          <Link
            href="/excercise1"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline mb-4"
          >
            Click here to see it
          </Link>
        </ul>
        <h3 className="text-lg font-semibold mb-2">Exercise 2:</h3>
        <ul className="list-disc pl-4 mb-4">
          <li>
            <strong>Restricted Range Selection:</strong> In this exercise, users
            are presented with a predefined range of values. The component
            restricts the selection to only those values within the given range.
            This ensures that users can only select values that are valid and
            relevant to the context.
          </li>
          <Link
            href="/excercise2"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Click here to see it
          </Link>
        </ul>
      </section>

      <section className="pb-4">
        <h2 className="text-xl font-semibold mb-2">Technologies</h2>
        <ul className="list-disc pl-4">
          <li>React</li>
          <li>Next.js</li>
          <li>Typescript</li>
          <li>Tailwind</li>
          <li>Jest</li>
          <li>React Testing Library</li>
        </ul>
      </section>

      <section className="pt-4">
        <Link
          href="https://curriculum-ornellaradica.vercel.app/"
          target="_blank"
          className="flex justify-end text-slate-600"
        >
          By Ornella Radica - Frontend Developer
        </Link>
      </section>
    </div>
  );
}
