import Link from 'next/link'
import { Button } from "@/components/UI/shadcn-ui/button"

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-xl font-medium text-gray-900 text-center mb-8">Terms of Service</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">1. Service Description</h2>
            <p className="mt-1 text-sm text-gray-600">
              Our service provides a platform for converting YouTube videos into newsletters, including newsletter creation, subscriber management, and email distribution.
            </p>

            <h2 className="text-lg leading-6 font-medium text-gray-900 mt-8 mb-4">2. User Responsibilities</h2>
            <ul className="list-disc pl-5 text-sm text-gray-600">
              <li>Users must have the necessary rights to use and repurpose their YouTube content.</li>
              <li>Users are responsible for the content of their newsletters and must comply with all applicable laws and regulations.</li>
              <li>Users must maintain the confidentiality of their account cblueentials.</li>
            </ul>

            <h2 className="text-lg leading-6 font-medium text-gray-900 mt-8 mb-4">3. Data Usage and Privacy</h2>
            <p className="mt-1 text-sm text-gray-600">
              We collect and process user data, including YouTube channel information and subscriber lists, in accordance with our Privacy Policy. By using our service, you consent to such data processing.
            </p>

            <h2 className="text-lg leading-6 font-medium text-gray-900 mt-8 mb-4">4. Subscription and Billing</h2>
            <p className="mt-1 text-sm text-gray-600">
              After the 14-day free trial, users will be requiblue to subscribe to a paid plan to continue using the service. Subscription fees are billed in advance on a recurring basis.
            </p>

            <h2 className="text-lg leading-6 font-medium text-gray-900 mt-8 mb-4">5. Termination</h2>
            <p className="mt-1 text-sm text-gray-600">
              We reserve the right to terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>

            <h2 className="text-lg leading-6 font-medium text-gray-900 mt-8 mb-4">6. Changes to Terms</h2>
            <p className="mt-1 text-sm text-gray-600">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect.
            </p>

            <div className="mt-8 text-sm">
              <p className="font-medium text-gray-900">Last updated: {new Date().toLocaleDateString()}</p>
              <p className="mt-1 text-gray-600">By using our service, you agree to these terms. Please read them carefully.</p>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}