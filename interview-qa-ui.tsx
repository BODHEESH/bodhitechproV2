import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

const QASection = ({ title, scenario, answer, subQuestions, example }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6 border rounded-lg shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50 rounded-lg"
      >
        <h2 className="text-xl font-semibold">{title}</h2>
        {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>
      
      {isOpen && (
        <div className="p-4 border-t">
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2 text-gray-700">Scenario</h3>
            <p className="text-gray-600">{scenario}</p>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2 text-gray-700">Solution</h3>
            <p className="text-gray-600">{answer}</p>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2 text-gray-700">Common Questions</h3>
            <div className="space-y-3">
              {subQuestions.map((q, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded">
                  <p className="font-medium mb-2">{q.question}</p>
                  <p className="text-gray-600">{q.answer}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2 text-gray-700">Real-world Example</h3>
            <p className="text-gray-600">{example}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const InterviewQA = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const qaData = [
    {
      title: "1. E-Commerce Cart Management",
      scenario: "In an e-commerce website, users can add items to their cart, update quantities, or remove items. The cart data should persist even after a page refresh.",
      answer: "To handle cart management, use React's useState or useReducer for local state management. For global state, use Redux or Context API. Data persistence can be achieved by saving the cart in localStorage.",
      subQuestions: [
        {
          question: "How would you structure the cart state?",
          answer: "The cart can be an array of objects, with each object representing an item containing id, name, price, and quantity."
        },
        {
          question: "How do you handle adding items to the cart?",
          answer: "When adding items, check if the item exists in the cart and update its quantity if it does, otherwise add it as a new item."
        }
      ],
      example: "Amazon's cart reflects changes in the cart badge, and refreshing the page doesn't clear the cart because it uses local storage or a backend service to persist data."
    },
    {
      title: "2. Dynamic Form Rendering",
      scenario: "An admin dashboard allows users to create surveys with different field types like text, dropdowns, or checkboxes. The form fields should render dynamically based on the survey configuration.",
      answer: "Dynamic forms can be created by mapping over a fields array containing field configurations.",
      subQuestions: [
        {
          question: "How do you handle form validation?",
          answer: "Use libraries like Formik or React Hook Form for validation, which provide hooks to validate fields and manage errors."
        },
        {
          question: "How do you conditionally render fields based on user input?",
          answer: "Use state to control the visibility of fields. For example, show a 'State' dropdown only if the selected country is 'USA'."
        }
      ],
      example: "Google Forms allows dynamic rendering of questions based on user input, showing additional questions if a user selects 'Yes' for a specific option."
    }
    // Add more QA items as needed
  ];

  const filteredQA = qaData.filter(qa => 
    qa.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    qa.scenario.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">React Interview Questions & Answers</h1>
      
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search questions..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredQA.map((qa, index) => (
          <QASection key={index} {...qa} />
        ))}
      </div>
    </div>
  );
};

export default InterviewQA;
