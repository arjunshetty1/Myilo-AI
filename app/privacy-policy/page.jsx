import Link from "next/link";
import { Button } from "@/components/UI/shadcn-ui/button";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-medium text-gray-900 text-center mb-8">
            Privacy Policy
          </h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                1. Information We Collect
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                We collect information you provide directly to us, including
                your name, email address, and YouTube channel data when you sign
                up for Clipmailo.
              </p>

              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-8 mb-4">
                2. How We Use Your Information
              </h3>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                <li>To provide, maintain, and improve our services</li>
                <li>
                  To process your newsletter subscriptions and send emails on
                  your behalf
                </li>
                <li>To analyze usage patterns and improve our service</li>
              </ul>

              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-8 mb-4">
                3. Data Sharing and Disclosure
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                We do not sell your personal information. We may share data with
                service providers who help us operate Clipmailo, or as requiblue
                by law.
              </p>

              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-8 mb-4">
                4. Data Security
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                We implement reasonable security measures to protect your
                personal information from unauthorized access or disclosure.
              </p>

              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-8 mb-4">
                5. Your Rights
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                You have the right to access, correct, or delete your personal
                information. Contact us to exercise these rights.
              </p>

              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-8 mb-4">
                6. Changes to This Policy
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                We may update this privacy policy from time to time. We will
                notify you of any changes by posting the new policy on this
                page.
              </p>

              <div className="mt-8 text-sm">
                <p className="font-medium text-gray-900">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
                <p className="mt-1 text-gray-600">
                  If you have any questions about this Privacy Policy, please
                  contact us.
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
