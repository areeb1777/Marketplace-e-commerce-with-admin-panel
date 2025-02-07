"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { FaUser, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import emailjs from "@emailjs/browser";

type FormData = {
  name: string;
  email: string;
  message: string;
};

function ContactForm() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("submit formData=", formData);

    emailjs
      .send(
        process.env.NEXT_PUBLIC_SERVICE_ID!,
        process.env.NEXT_PUBLIC_TEMPLATE_ID!,
        formData,
        process.env.NEXT_PUBLIC_USER_ID!
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setSubmitted(true);
        },
        (error) => {
          console.log("FAILED...", error);
        }
      );
  };

  return isClient ? (
    <section
      id="contact"
      className="p-8 max-w-lg mx-auto text-center bg-gray-100"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-blue-600">Contact Us</h2>

        <p className="mb-6 text-gray-600">
          If you&apos;d like to connect, feel free to reach out via our social
          media links or send us a message using the form below:
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative">
            <textarea
              name="message"
              placeholder="Your Message"
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:ring-2 focus:ring-blue-500"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="flex items-center justify-center px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <FaPaperPlane className="mr-2" /> Send Message
            </button>
          </div>
        </form>

        {submitted && (
          <p className="mt-4 text-green-500">Thank you for your message!</p>
        )}
      </div>
    </section>
  ) : (
    <div>Loading...</div>
  );
}

export default ContactForm;
