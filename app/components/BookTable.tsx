"use client";

import { Key,  useState } from "react";
import { useQuery } from "react-query";

type Book = {
  id: Key;
  createdTime: string;
  fields: BookFields;
};

type BookFields = {
  Status: string;
  Author: string;
  Title: string;
  Category: string;
};

export default function BookTable() {
  const progressColors = {
    "To Read": "bg-white",
    "In Progress": "bg-blue-100 text-blue-800",
    "Finished": "bg-green-100 text-green-800",
    "Won't Finish": "bg-red-100 text-red-800",
  }
  
  const { isSuccess, data, isLoading, isError } = useQuery({
    queryKey: "books",
    queryFn: async () => {
      console.log("before fetch");
      const response = await fetch("/api");
      console.log("after fetch");
      if (!response.ok) {
        console.log("response not ok");
        throw new Error("Network response was not ok");
      }
      console.log("before json");
      return await response.json();
    },
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300 table-fixed">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8"
                  >
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data &&
                  data.books.records.map((book: Book) => (
                    <tr
                      key={book.id}
                      className={`${progressColors[book.fields.Status]}`}
                    >
                      <td className="max-w-xs  py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                        {book.fields.Title}
                      </td>
                      <td className=" px-3 py-4 text-sm text-gray-500">
                        {book.fields.Author}
                      </td>
                      <td className=" px-3 py-4 text-sm text-gray-500">
                        {book.fields.Status}
                      </td>
                      <td className=" px-3 py-4 text-sm text-gray-500">
                        {book.fields.Category}
                      </td>
                      <td className="relative  py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                          <span className="sr-only">, {book.fields.Title}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
