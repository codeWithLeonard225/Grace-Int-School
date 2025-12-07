// app/(main)/contact/page.js

import Link from 'next/link';
// Assuming you have a component for the form (ContactForm.js)
// We will use a placeholder div for the form and the map iframe for now.

// Local metadata export for page-specific SEO
export const metadata = {
  title: "Contact Us | Grace International School – Address, Phone, Email",
  description:
    "Get in touch with Grace International School. Find our campus address, contact numbers, email, and office hours in Freetown, Sierra Leone.",
};

export default function ContactPage() {
  return (
    <div className="contact-page-content pt-10">
      
      {/* =====================================================
          1. HERO HEADER: Introduction
      ====================================================== */}
      <section className="bg-blue-900 py-16 px-6 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
          We'd Love to Hear From You
        </h1>
        <p className="text-xl max-w-3xl mx-auto opacity-90">
          Reach out to us via phone, email, or use the convenient contact form below.
        </p>
      </section>

      {/* =====================================================
          2. CONTACT DETAILS & OFFICE HOURS
      ====================================================== */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          
          {/* Email */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <span className="text-4xl text-green-600 mb-3 block">📧</span>
            <h3 className="text-2xl font-bold text-blue-800 mb-2">Email Us</h3>
            <p className="text-gray-600">
              For general inquiries, please email:
            </p>
            <Link href="mailto:info@graceis.sl" className="text-lg font-semibold text-green-600 hover:text-green-700 transition">
              info@graceis.sl
            </Link>
          </div>

          {/* Phone */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <span className="text-4xl text-green-600 mb-3 block">📞</span>
            <h3 className="text-2xl font-bold text-blue-800 mb-2">Call Admissions</h3>
            <p className="text-gray-600">
              Reach our Admissions Office during business hours:
            </p>
            <Link href="tel:+23276XXXXXXX" className="text-lg font-semibold text-green-600 hover:text-green-700 transition">
              (+232) 76 XXX XXX
            </Link>
          </div>
          
          {/* Office Hours */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <span className="text-4xl text-green-600 mb-3 block">⏰</span>
            <h3 className="text-2xl font-bold text-blue-800 mb-2">Office Hours</h3>
            <p className="text-gray-600">
              **Monday - Friday:** 8:00 AM - 4:00 PM
            </p>
            <p className="text-gray-600">
              **Saturday/Sunday:** Closed
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          3. ADDRESS, MAP, AND CONTACT FORM
      ====================================================== */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* CONTACT FORM (Placeholder) */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-2xl">
            <h2 className="text-3xl font-bold text-blue-800 mb-6 border-b-2 border-green-500 pb-2">
              Send Us a Message
            </h2>
            {/* 🛑 Placeholder for your form component (e.g., <ContactForm />) */}
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Full Name</label>
                <input type="text" id="name" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email Address</label>
                <input type="email" id="email" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-gray-700 font-medium mb-1">Subject</label>
                <select id="subject" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500">
                    <option>General Inquiry</option>
                    <option>Admissions Question</option>
                    <option>Website Feedback</option>
                    <option>Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-1">Your Message</label>
                <textarea id="message" rows="4" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition duration-300"
              >
                Submit Inquiry
              </button>
            </form>
          </div>
          
          {/* ADDRESS & MAP */}
          <div className="space-y-8">
            <div className="bg-blue-800 p-8 text-white rounded-xl shadow-2xl">
              <h3 className="text-2xl font-bold mb-3">Our Location</h3>
              <p className="text-lg font-light mb-4">
                **Grace International School Main Campus**
                <br />
                14 School Road, Regent Village, 
                <br />
                Freetown, Sierra Leone
              </p>
              <Link
                href="#" // Use a Google Maps URL here
                target="_blank"
                className="inline-block border border-green-400 text-green-400 hover:bg-green-400 hover:text-blue-900 font-semibold px-4 py-2 rounded-full transition"
              >
                Get Directions &rarr;
              </Link>
            </div>
            
            {/* Embedded Map */}
            <div className="relative h-96 w-full rounded-xl shadow-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15764.120790349887!2d-13.242379!3d8.487979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDIyJzE4LjEiUyAxM8KwMTQnMTMuNCJX!5e0!3m2!1sen!2ssl!4v1625400000000!5m2!1sen!2ssl" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Grace International School Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}