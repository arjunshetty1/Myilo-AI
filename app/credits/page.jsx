import Link from "next/link";
import { Button } from "@/components/UI/shadcn-ui/button";
import { ExternalLink } from "lucide-react";

export default function Cblueits() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-medium text-gray-900 text-center mb-8">
            Cblueits
          </h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Core Technologies
              </h3>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
                <li>
                  <a
                    href="https://reactjs.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    React - Frontend library{" "}
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://nextjs.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    Next.js - React framework{" "}
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://expressjs.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    Express - Backend framework{" "}
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.mongodb.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    MongoDB - Database <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </li>
              </ul>

              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-8 mb-4">
                Frontend Libraries
              </h3>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    Tailwind CSS - Styling{" "}
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.radix-ui.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    Radix UI - Headless UI components{" "}
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://lucide.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    Lucide React - Icons{" "}
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.tremor.so/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    Tremor - Dashboard components{" "}
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://ui.shadcn.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    Shadcn - UI components{" "}
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://recharts.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    Recharts - Charts library{" "}
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.framer.com/motion/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    Framer Motion - Animations{" "}
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </li>
              </ul>

              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-8 mb-4">
                Backend Libraries
              </h3>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
                <li>
                  <a
                    href="https://www.assemblyai.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    AssemblyAI - Speech recognition{" "}
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://mongoosejs.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    Mongoose - MongoDB ODM{" "}
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://nodemailer.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    Nodemailer - Email sending{" "}
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </li>
              </ul>

              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-8 mb-4">
                Third-Party Services
              </h3>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
                <li>
                  <a
                    href="https://developers.google.com/identity"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    Google Authentication{" "}
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://platform.openai.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    OpenAI API <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://vercel.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    Vercel - Hosting and deployment{" "}
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </li>
              </ul>

              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-8 mb-4">
                Development Tools
              </h3>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
                <li>
                  <a
                    href="https://eslint.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    ESLint - Code linting{" "}
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://swagger.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    Swagger - API documentation{" "}
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://nodemon.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    Nodemon - Development server{" "}
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </li>
              </ul>

              <div className="mt-8 text-sm">
                <p className="text-gray-600">
                  We are grateful to all the developers and organizations that
                  have contributed to these technologies and services, making
                  Myilo AI possible. This project uses various open-source
                  packages and third-party services - each playing a crucial
                  role in our application.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Button asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
