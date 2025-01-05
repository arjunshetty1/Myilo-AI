"use client";
import { useState } from "react";
import { Button } from "@/components/UI/shadcn-ui/button";
import { Input } from "@/components/UI/shadcn-ui/input";
import { Textarea } from "@/components/UI/shadcn-ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Email is invalid";
    if (!formData.message.trim()) errors.message = "Message is required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // Here you would typically send the form data to your server
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-medium text-gray-900 text-center mb-8">
            Contact Us
          </h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Get in Touch
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    We'd love to hear from you. Please fill out this form and we
                    will get in touch with you shortly.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        contact@mylioai.com
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        +91 7892828917
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                       Bengaluru, India
                      </span>
                    </div>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={formErrors.name ? "border-red-500" : ""}
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-xs text-red-500">
                        {formErrors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={formErrors.email ? "border-red-500" : ""}
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-xs text-red-500">
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <Textarea
                      name="message"
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className={formErrors.message ? "border-red-500" : "" }
                    />
                    {formErrors.message && (
                      <p className="mt-1 text-xs text-red-500">
                        {formErrors.message}
                      </p>
                    )}
                  </div>
                  <Button type="submit">Send Message</Button>
                </form>
              </div>
              {isSubmitted && (
                <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
                  Thank you for your message. We'll get back to you soon!
                </div>
              )}
            </div>
          </div>
          <div className="mt-8 text-center">
            <Button asChild>
              {/* <Link href="/">Return to Home</Link> */}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
