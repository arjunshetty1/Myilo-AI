"use client";
import { Button } from "@/components/UI/shadcn-ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-medium text-gray-900 text-center mb-8">
            Contact Us
          </h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Get in Touch
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    We'd love to hear from you. Please reach us out via E-mail.
                    We will get in touch with you shortly.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        clipmailo@gmail.com
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        +91 7892828917 / +91 6361284091
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
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Button asChild></Button>
          </div>
        </div>
      </main>
    </div>
  );
}
