// "use client";
// import { useRouter } from "next/router";
// import Head from "next/head";
// import Link from "next/link";
// import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react";

// // This would be replaced with your actual data fetching
// const getBlogPost = (id) => {
//   // Mock data for demonstration
//   const BLOG_POSTS = [
//     {
//       id: 1,
//       title: "Getting Started with Email Newsletters: A Beginner's Guide",
//       excerpt: "Learn how to launch your first newsletter campaign and build your subscriber base from scratch.",
//       content: `
//         <h2>Introduction to Email Newsletters</h2>
//         <p>Email newsletters remain one of the most effective marketing channels in 2025. With direct access to your audience's inbox, you have an unprecedented opportunity to build relationships, establish authority, and drive conversions.</p>
        
//         <p>In this comprehensive guide, we'll walk through everything you need to know to launch your first newsletter campaign successfully.</p>
        
//         <h2>Why Start an Email Newsletter?</h2>
//         <p>Before diving into the technical aspects, it's important to understand the value proposition of email newsletters:</p>
        
//         <ul>
//           <li><strong>Ownership</strong>: Unlike social media, your email list is an asset you own completely</li>
//           <li><strong>Direct communication</strong>: No algorithms limiting your reach</li>
//           <li><strong>Higher conversion rates</strong>: Email consistently outperforms social media for conversions</li>
//           <li><strong>Personalization opportunities</strong>: Segment and tailor your messaging to specific audience groups</li>
//         </ul>
        
//         <h2>Setting Up Your Newsletter Infrastructure</h2>
//         <p>The first step is choosing the right email service provider (ESP). Here are some popular options in 2025:</p>
        
//         <ul>
//           <li><strong>Mailchimp</strong>: Great for beginners with user-friendly templates</li>
//           <li><strong>ConvertKit</strong>: Designed specifically for creators and content publishers</li>
//           <li><strong>Substack</strong>: Ideal if you're planning to monetize through subscriptions</li>
//           <li><strong>Beehiiv</strong>: Newer platform with powerful analytics and growth tools</li>
//         </ul>
        
//         <h2>Building Your Subscriber Base</h2>
//         <p>Starting from zero subscribers can feel daunting, but everyone begins somewhere. Here are proven strategies to build your initial subscriber base:</p>
        
//         <ol>
//           <li><strong>Leverage your existing audience</strong>: Start by inviting friends, colleagues, and current customers</li>
//           <li><strong>Create dedicated sign-up landing pages</strong>: Optimize these pages for conversions</li>
//           <li><strong>Offer a lead magnet</strong>: Provide valuable free content in exchange for email addresses</li>
//           <li><strong>Add sign-up forms to your website</strong>: Place them strategically on your highest-traffic pages</li>
//           <li><strong>Promote on social media</strong>: Share snippets of your newsletter content to attract subscribers</li>
//         </ol>
        
//         <h2>Crafting Compelling Newsletter Content</h2>
//         <p>The success of your newsletter ultimately depends on the value you provide to subscribers. Here are content principles to follow:</p>
        
//         <ul>
//           <li><strong>Focus on your audience's needs</strong>: What problems can you help them solve?</li>
//           <li><strong>Maintain a consistent schedule</strong>: Whether it's weekly, bi-weekly, or monthly</li>
//           <li><strong>Develop a distinctive voice</strong>: Your personality should shine through</li>
//           <li><strong>Mix content formats</strong>: Include text, images, videos, and interactive elements</li>
//         </ul>
        
//         <h2>Measuring Success and Iterating</h2>
//         <p>Track these key metrics to gauge the performance of your newsletter:</p>
        
//         <ul>
//           <li><strong>Open rate</strong>: Percentage of subscribers who open your emails</li>
//           <li><strong>Click-through rate</strong>: Percentage who click on links within your newsletter</li>
//           <li><strong>Growth rate</strong>: Net increase in subscribers over time</li>
//           <li><strong>Conversion rate</strong>: Subscribers who take desired actions (purchases, sign-ups, etc.)</li>
//         </ul>
        
//         <h2>Common Pitfalls to Avoid</h2>
//         <p>As you begin your newsletter journey, watch out for these common mistakes:</p>
        
//         <ul>
//           <li>Inconsistent sending schedule</li>
//           <li>Overly promotional content without providing value</li>
//           <li>Neglecting mobile optimization</li>
//           <li>Ignoring subscriber feedback</li>
//           <li>Failing to segment your audience as it grows</li>
//         </ul>
        
//         <h2>Conclusion</h2>
//         <p>Starting an email newsletter requires initial effort, but the long-term benefits for your brand or business are substantial. Begin with clear goals, focus on providing value, and consistently engage with your audience. As your subscriber base grows, so will your opportunities for deepening relationships and driving meaningful results.</p>
        
//         <p>Ready to start your newsletter journey? The best time to begin is now.</p>
//       `,
//       author: "Arjun Shetty",
//       authorBio: "Arjun is a digital marketing specialist with over 8 years of experience helping businesses build effective email strategies.",
//       authorImage: "/images/authors/arjun-shetty.jpg",
//       date: "February 25, 2025",
//       readTime: "6 min read",
//       category: "Newsletter Basics",
//       image: "/images/blog/newsletter-start.jpg",
//       tags: ["email marketing", "newsletters", "lead generation", "content strategy"]
//     },
//     // Other blog posts would be defined here
//   ];

//   return BLOG_POSTS.find(post => post.id === parseInt(id));
// };

// export default function BlogPost({ postId }) {
//   const router = useRouter();
//   const id = postId || router.query.id;
//   const post = getBlogPost(id);

//   // This would handle the case when data is still loading or not found
//   if (!post) {
//     return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
//   }

//   return (
//     <div className="bg-white min-h-screen">
//       <Head>
//         <title>{post.title} | Your SaaS Platform</title>
//         <meta name="description" content={post.excerpt} />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       {/* Header with featured image */}
//       <div className="relative h-80 sm:h-96 md:h-[500px] w-full bg-gray-100">
//         <img 
//           src={post.image} 
//           alt={post.title} 
//           className="w-full h-full object-cover" 
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
//       </div>

//       {/* Content Container */}
//       <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//         {/* Back to Blog Link */}
//         <div className="pt-8">
//           <Link href="/blog" className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to all articles
//           </Link>
//         </div>

//         {/* Category Badge */}
//         <div className="mt-8">
//           <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
//             {post.category}
//           </span>
//         </div>

//         {/* Article Title */}
//         <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
//           {post.title}
//         </h1>

//         {/* Article Meta */}
//         <div className="mt-6 flex items-center flex-wrap">
//           <div className="flex items-center">
//             <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
//               <img 
//                 src={post.authorImage} 
//                 alt={post.author}
//                 className="h-full w-full object-cover"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.parentNode.classList.add('bg-indigo-100');
//                 }}
//               />
//             </div>
//             <div className="ml-3">
//               <p className="text-sm font-medium text-gray-900">
//                 {post.author}
//               </p>
//             </div>
//           </div>
//           <div className="ml-6 flex space-x-4 text-sm text-gray-500">
//             <div className="flex items-center">
//               <Calendar className="w-4 h-4 mr-1" />
//               <time dateTime={post.date}>{post.date}</time>
//             </div>
//             <div className="flex items-center">
//               <Clock className="w-4 h-4 mr-1" />
//               <span>{post.readTime}</span>
//             </div>
//           </div>
//           <div className="ml-auto">
//             <button className="flex items-center text-gray-500 hover:text-indigo-600">
//               <Share2 className="w-5 h-5" />
//             </button>
//           </div>
//         </div>

//         {/* Article Content */}
//         <div className="mt-10 prose prose-indigo prose-lg max-w-none">
//           <div dangerouslySetInnerHTML={{ __html: post.content }} />
//         </div>

//         {/* Tags */}
//         <div className="mt-12">
//           <h3 className="text-sm font-medium text-gray-500">Tags</h3>
//           <div className="mt-2 flex flex-wrap gap-2">
//             {post.tags.map(tag => (
//               <Link 
//                 key={tag} 
//                 href={`/blog/tag/${tag}`}
//                 className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200"
//               >
//                 {tag}
//               </Link>
//             ))}
//           </div>
//         </div>

//         {/* Author Bio */}
//         <div className="mt-12 p-6 bg-gray-50 rounded-xl">
//           <div className="flex items-start">
//             <div className="flex-shrink-0">
//               <div className="h-14 w-14 rounded-full bg-gray-200 overflow-hidden">
//                 <img 
//                   src={post.authorImage} 
//                   alt={post.author} 
//                   className="h-full w-full object-cover"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.parentNode.classList.add('bg-indigo-100');
//                   }}
//                 />
//               </div>
//             </div>
//             <div className="ml-4">
//               <h3 className="text-lg font-medium text-gray-900">About {post.author}</h3>
//               <p className="mt-1 text-gray-600">{post.authorBio}</p>
//             </div>
//           </div>
//         </div>

//         {/* Newsletter Subscription - Consistent with Blog Home Page */}
//         <div className="mt-16 bg-indigo-50 rounded-2xl p-8">
//           <div className="max-w-xl mx-auto text-center">
//             <h2 className="text-2xl font-bold text-gray-900">
//               Enjoyed this article?
//             </h2>
//             <p className="mt-3 text-lg text-gray-500">
//               Subscribe to get our latest articles, feature updates, and industry insights delivered to your inbox.
//             </p>
//             <form className="mt-6 sm:flex sm:max-w-md sm:mx-auto">
//               <label htmlFor="email-address" className="sr-only">
//                 Email address
//               </label>
//               <input
//                 type="email"
//                 name="email-address"
//                 id="email-address"
//                 autoComplete="email"
//                 required
//                 className="w-full px-5 py-3 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs border-gray-300 rounded-md"
//                 placeholder="Enter your email"
//               />
//               <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
//                 <button
//                   type="submit"
//                   className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   Subscribe
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>

//         {/* Related Articles */}
//         <div className="mt-16">
//           <h2 className="text-2xl font-bold text-gray-900">You might also like</h2>
//           <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
//             {[2, 5].map((relatedId) => {
//               const relatedPost = getBlogPost(relatedId);
//               if (!relatedPost) return null;
              
//               return (
//                 <article
//                   key={relatedPost.id}
//                   className="flex flex-col overflow-hidden rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
//                 >
//                   <div className="flex-shrink-0">
//                     <img
//                       className="h-48 w-full object-cover"
//                       src={relatedPost.image}
//                       alt={relatedPost.title}
//                     />
//                   </div>
//                   <div className="flex-1 p-6 flex flex-col justify-between">
//                     <div className="flex-1">
//                       <p className="text-sm font-medium text-indigo-600">
//                         {relatedPost.category}
//                       </p>
//                       <Link href={`/blog/${relatedPost.id}`} className="block mt-2">
//                         <h3 className="text-xl font-semibold text-gray-900 hover:text-indigo-600">
//                           {relatedPost.title}
//                         </h3>
//                       </Link>
//                     </div>
//                     <div className="mt-6 flex items-center">
//                       <div className="flex-shrink-0">
//                         <div className="h-8 w-8 rounded-full bg-gray-200"></div>
//                       </div>
//                       <div className="ml-3">
//                         <p className="text-sm font-medium text-gray-900">
//                           {relatedPost.author}
//                         </p>
//                         <div className="flex space-x-1 text-sm text-gray-500">
//                           <time dateTime={relatedPost.date}>{relatedPost.date}</time>
//                           <span aria-hidden="true">&middot;</span>
//                           <span>{relatedPost.readTime}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </article>
//               );
//             })}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client"

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const ModernBlogComingSoon = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: { 
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut'
      }
    }
  };

  const pulseVariants = {
    initial: { scale: 1, opacity: 0.5 },
    animate: { 
      scale: [1, 1.05, 1],
      opacity: [0.5, 0.7, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut'
      }
    }
  };

  const rotateVariants = {
    initial: { rotate: 0 },
    animate: { 
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  };

  const categories = [
    { title: "AI Content Tips", icon: "rocket" },
    { title: "Design Insights", icon: "sliders" },
    { title: "Audience Growth", icon: "users" },
    { title: "Success Metrics", icon: "chart" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-blue-600 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div
          variants={pulseVariants}
          initial="initial"
          animate="animate"
          className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"
        ></motion.div>
        <motion.div
          variants={pulseVariants}
          initial="initial"
          animate="animate"
          className="absolute top-20 right-20 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl"
          style={{ animationDelay: '1s' }}
        ></motion.div>
        <motion.div
          variants={pulseVariants}
          initial="initial"
          animate="animate"
          className="absolute -bottom-40 left-20 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl"
          style={{ animationDelay: '2s' }}
        ></motion.div>
      </motion.div>
      
      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <motion.div 
          className="max-w-6xl w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="backdrop-blur-xl bg-white/10 rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
            whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="md:flex">
              {/* Left Content Section */}
              <motion.div 
                className="md:w-1/2 p-8 md:p-12 lg:p-16"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants} className="flex items-center space-x-2 mb-6">
                  <motion.div 
                    className="h-3 w-3 bg-blue-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  ></motion.div>
                  <p className="uppercase text-blue-300 tracking-widest text-sm font-medium">Coming Soon</p>
                </motion.div>
                
                <motion.h1 
                  variants={itemVariants} 
                  className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
                >
                  ClipMailo Blog
                </motion.h1>
                
                <motion.p variants={itemVariants} className="text-xl text-blue-100 mb-8 leading-relaxed">
                  A premium destination for innovative ideas, newsletter mastery, and AI-powered content creation.
                </motion.p>
                
                {/* <motion.div 
                  variants={containerVariants}
                  className="grid grid-cols-2 gap-6 mb-8"
                >
                  {categories.map((category, index) => (
                    <motion.div 
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                      className="p-5 backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 transition-all"
                    >
                      {category.icon === "rocket" && (
                        <motion.svg whileHover={{ rotate: 15 }} className="h-7 w-7 text-blue-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </motion.svg>
                      )}
                      {category.icon === "sliders" && (
                        <motion.svg whileHover={{ rotate: 15 }} className="h-7 w-7 text-blue-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </motion.svg>
                      )}
                      {category.icon === "users" && (
                        <motion.svg whileHover={{ rotate: 15 }} className="h-7 w-7 text-blue-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </motion.svg>
                      )}
                      {category.icon === "chart" && (
                        <motion.svg whileHover={{ rotate: 15 }} className="h-7 w-7 text-blue-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </motion.svg>
                      )}
                      <h3 className="font-semibold text-white text-lg">{category.title}</h3>
                    </motion.div>
                  ))}
                </motion.div> */}
                
                <motion.div variants={itemVariants}>
                  {/* <motion.button 
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white font-semibold shadow-lg flex items-center space-x-2"
                  >
                    <span>Go Home</span>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button> */}
                </motion.div>
              </motion.div>
              
              {/* Right Content - Visual Elements */}
              <div className="md:w-1/2 p-6 md:p-0 relative flex items-center justify-center overflow-hidden">
                <motion.div 
                  className="w-full h-full absolute md:top-0 md:right-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  {/* Large Abstract Circle */}
                  <motion.div 
                    className="absolute top-0 right-0 w-full h-full flex items-center justify-center"
                    variants={rotateVariants}
                    initial="initial"
                    animate="animate"
                  >
                    <div className="w-4/5 h-4/5 rounded-full border-4 border-white/10"></div>
                  </motion.div>
                  
                  {/* Middle Circle */}
                  <motion.div 
                    className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-3/5 h-3/5 rounded-full border-2 border-white/20"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  ></motion.div>
                  
                  {/* Inner Circle */}
                  <motion.div 
                    className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-2/5 h-2/5 rounded-full border border-white/30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  ></motion.div>
                  
                  {/* Floating Elements */}
                  <motion.div 
                    className="absolute top-1/4 right-1/4 w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl shadow-lg"
                    variants={floatingVariants}
                    initial="initial"
                    animate="animate"
                    style={{ animationDelay: '0s' }}
                  ></motion.div>
                  
                  <motion.div 
                    className="absolute bottom-1/3 right-1/3 w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-lg"
                    variants={floatingVariants}
                    initial="initial"
                    animate="animate"
                    style={{ animationDelay: '1s' }}
                  ></motion.div>
                  
                  <motion.div 
                    className="absolute top-1/3 left-1/4 w-12 h-12 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg shadow-lg transform rotate-45"
                    variants={floatingVariants}
                    initial="initial"
                    animate="animate"
                    style={{ animationDelay: '1.5s' }}
                  ></motion.div>
                  
                  {/* Center Content */}
                  <motion.div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1, type: "spring" }}
                  >
                    {/* <motion.div 
                      className="rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 p-6 w-56 shadow-xl"
                      whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
                    > */}
                      {/* <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                        className="flex justify-center"
                      >
                        <svg className="h-16 w-16 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </motion.div> */}
                      {/* <div className="text-center mt-4">
                        <motion.h3 
                          className="text-xl font-bold text-white mb-1"
                          animate={{ opacity: [0.8, 1, 0.8] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          Launching Soon
                        </motion.h3>
                        <motion.p 
                          className="text-blue-200 text-sm"
                          animate={{ opacity: [0.6, 0.8, 0.6] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          Subscribe for early access
                        </motion.p>
                      </div> */}
                    {/* </motion.div> */}
                  </motion.div>
                </motion.div>
              </div>
            </div>
            
            {/* Footer Section */}
            <motion.div 
              className="p-6 border-t border-white/10 backdrop-blur-md bg-white/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <motion.p 
                    className="text-blue-200 font-medium"
                    whileHover={{ color: '#ffffff' }}
                  >
                    © 2025 ClipMailo
                  </motion.p>
                </div>
                
                <motion.div 
                  className="flex space-x-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {['twitter', 'facebook', 'instagram', 'linkedin'].map((platform, index) => (
                    <motion.a 
                      key={index}
                      href={platform === "instagram" && "https://www.instagram.com/clipmailo/"} 
                      variants={itemVariants}
                      whileHover={{ scale: 1.2, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                      className="p-2 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
                    >
                      {platform === 'twitter' && (
                        <svg className="h-5 w-5 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      )}
                      {platform === 'facebook' && (
                        <svg className="h-5 w-5 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                        </svg>
                      )}
                      {platform === 'instagram' && (
                        <svg className="h-5 w-5 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      )}
                      {platform === 'linkedin' && (
                        <svg className="h-5 w-5 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      )}
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ModernBlogComingSoon;