import Link from "next/link";
import { Button } from "@/components/UI/shadcn-ui/button";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl text-gray-900 text-center mb-8">
            Privacy Policy
          </h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              {/* Introduction */}
              <p className="text-sm text-gray-600 mb-8">
                This Privacy Policy explains how ClipMailo ("we," "us," or "our") collects, uses, and protects information for two main groups: (1) <strong>Creators</strong> who use our platform to create newsletters, and (2) <strong>Subscribers</strong> who sign up for newsletters created by our creators. By using our services, you agree to the practices described in this policy.
              </p>

              {/* Section for Creators */}
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                For Creators
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    1. Information We Collect
                  </h4>
                  <p className="text-sm text-gray-600">
                    When you sign up as a creator on ClipMailo, we collect:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
                    <li>Your name, email address, and contact information</li>
                    <li>Your YouTube channel data (if connected)</li>
                    <li>Payment information for subscription plans</li>
                    <li>Analytics data about your newsletter performance</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    2. How We Use Your Information
                  </h4>
                  <ul className="list-disc pl-5 text-sm text-gray-600">
                    <li>To provide and improve our platform services</li>
                    <li>To process payments and manage your account</li>
                    <li>To send you platform updates and support communications</li>
                    <li>To analyze usage patterns and improve our tools</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    3. Data Sharing
                  </h4>
                  <p className="text-sm text-gray-600">
                    We do not sell your personal information. We may share data with:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
                    <li>Payment processors for transaction handling</li>
                    <li>Service providers who assist in platform operations</li>
                    <li>Legal authorities if required by law</li>
                  </ul>
                </div>
              </div>

              {/* Section for Subscribers */}
              <h3 className="text-xl font-semibold text-gray-900 mt-10 mb-4">
                For Subscribers
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    1. Information We Collect
                  </h4>
                  <p className="text-sm text-gray-600">
                    When you subscribe to a newsletter created on ClipMailo, we collect:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
                    <li>Your email address</li>
                    <li>Your interaction data (e.g., opens, clicks)</li>
                    <li>Optional information provided by the creator (e.g., name)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    2. How We Use Your Information
                  </h4>
                  <ul className="list-disc pl-5 text-sm text-gray-600">
                    <li>To deliver newsletters from creators</li>
                    <li>To provide analytics to creators about newsletter performance</li>
                    <li>To improve the quality and relevance of newsletters</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    3. Your Rights
                  </h4>
                  <p className="text-sm text-gray-600">
                    As a subscriber, you have the right to:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
                    <li>Unsubscribe from any newsletter at any time</li>
                    <li>Request access to or deletion of your data</li>
                  </ul>
                </div>
              </div>

              {/* General Section */}
              <h3 className="text-xl font-semibold text-gray-900 mt-10 mb-4">
                General Information
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    1. Data Security
                  </h4>
                  <p className="text-sm text-gray-600">
                    We implement industry-standard security measures to protect your data, including encryption, secure servers, and access controls.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    2. Changes to This Policy
                  </h4>
                  <p className="text-sm text-gray-600">
                    We may update this policy from time to time. Any changes will be posted on this page, and we will notify you via email if significant changes occur.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    3. Contact Us
                  </h4>
                  <p className="text-sm text-gray-600">
                    If you have questions about this Privacy Policy or your data, please contact us at <a href="mailto:clipmailo@gmail.com" className="text-indigo-500 hover:underline">clipmailo</a>.
                  </p>
                </div>
              </div>

              {/* Last Updated */}
              <div className="mt-8 text-sm">
                <p className="font-medium text-gray-900">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Return to Home Button */}
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