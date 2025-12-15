// app/(main)/page.js

import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Grace International School | Excellence in Education",
  description:
    "Grace International School provides world-class education in Sierra Leone, focusing on academic excellence, digital literacy, and character development.",
};

export default function HomePage() {
  return (
    <div className="homepage-content">

      {/* =====================================================
          1. HERO SECTION
      ====================================================== */}
      <section className="relative h-[80vh] flex items-center justify-center text-white">

        {/* Background Image */}
        <Image
          src="/images/schoolbg1.jpg"
          alt="Grace International School Campus"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-blue-900/60"></div>

        {/* Text Content */}
        <div className="z-10 max-w-4xl text-center p-6">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg">
            Excellence in Education for a Global Future.
          </h1>

          <p className="text-xl md:text-2xl mb-8 font-light drop-shadow-md">
            Fostering character, academic rigor, and digital literacy in Sierra Leone.
          </p>

          <Link
            href="/about"
            className="bg-green-500 hover:bg-green-600 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-xl transition duration-300"
          >
            Learn More About Our Vision
          </Link>
        </div>
      </section>

      {/* =====================================================
          2. EDUCATIONAL PILLARS
      ====================================================== */}
      <section className="py-16 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold text-blue-800 mb-10">Our Educational Pillars</h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
            <h3 className="text-2xl font-semibold text-blue-600 mb-3">Academic Rigor</h3>
            <p className="text-gray-600">
              Preparing students for success with a challenging curriculum meeting international standards.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
            <h3 className="text-2xl font-semibold text-blue-600 mb-3">Holistic Development</h3>
            <p className="text-gray-600">
              Building character, leadership, and creativity through balanced extracurricular programs.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
            <h3 className="text-2xl font-semibold text-blue-600 mb-3">Digital Integration</h3>
            <p className="text-gray-600">
              Empowering students with technology and access to our secure Student Portal.
            </p>
          </div>

        </div>
      </section>

      {/* =====================================================
          3. NEWS & EVENTS
      ====================================================== */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-800 mb-8 border-b-2 border-green-500 pb-2">
          Latest School Updates
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white p-6 shadow-md rounded-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-2">Admissions Open for 2026!</h3>
            <p className="text-gray-600">
              Applications are now being accepted for all grades. Schedule a virtual tour today.
            </p>
            <Link href="/admissions" className="text-green-600 hover:text-green-700 mt-2 inline-block">
              Read More &rarr;
            </Link>
          </div>

          <div className="bg-white p-6 shadow-md rounded-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-2">Term 1 Parent-Teacher Day</h3>
            <p className="text-gray-600">
              Join us on October 25th. Check the portal for your personalized schedule.
            </p>
            <Link href="/calendar" className="text-green-600 hover:text-green-700 mt-2 inline-block">
              View Calendar &rarr;
            </Link>
          </div>

        </div>
      </section>

      {/* =====================================================
          4. STUDENT PORTAL CTA
      ====================================================== */}
      <section className="bg-blue-950 py-12">
        <div className="max-w-4xl mx-auto text-center p-6">
          
          <h2 className="text-3xl font-bold text-white mb-4">
            Students & Parents Portal
          </h2>

          <p className="text-white/80 text-lg mb-6">
            View grades, schedules, announcements, and more through our secure online portal.
          </p>

          <Link
            href="/login"
            className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 text-lg font-bold px-8 py-3 rounded-full shadow-2xl transition duration-300"
          >
            Login to Portal Now
          </Link>

        </div>
      </section>

    </div>
  );
}
