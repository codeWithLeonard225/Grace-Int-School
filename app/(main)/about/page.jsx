export default function AboutPage() {
  return (
    <div>

      {/* HERO SECTION */}
      <section className="relative h-[55vh] bg-cover bg-center flex items-center"
        style={{ backgroundImage: "url('/images/school-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-blue-900/70"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">About Grace International School</h1>
          <p className="text-lg md:text-xl font-light">
            Shaping minds, building character, and preparing future leaders of Sierra Leone.
          </p>
        </div>
      </section>

      {/* SCHOOL INTRO */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Who We Are</h2>
            <p className="text-gray-700 leading-relaxed">
              Grace International School is a premier educational institution in Sierra Leone,
              dedicated to academic excellence and holistic development.  
              For years, we have provided a world-class learning experience supported by modern
              teaching methods, trained educators, and a safe, nurturing environment.
            </p>

            <p className="text-gray-700 leading-relaxed mt-4">
              We believe every child deserves a quality education that blends knowledge,
              discipline, creativity, leadership, and digital literacy.
            </p>
          </div>

          <div className="rounded-lg overflow-hidden shadow-xl">
            <img src="/images/classroom.jpg" alt="School Classroom" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-blue-800 mb-3">Our Vision</h3>
            <p className="text-gray-700">
              To raise globally competitive students through quality education,
              digital innovation, and character development.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-blue-800 mb-3">Our Mission</h3>
            <p className="text-gray-700">
              To provide a safe, technology-driven, and morally grounded learning environment
              where students excel academically and socially.
            </p>
          </div>

        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-16 bg-white">
        <h2 className="text-center text-3xl font-bold text-blue-900 mb-10">
          Our Core Values
        </h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">

          <div className="bg-blue-900 text-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-semibold mb-2">Discipline</h3>
            <p>We instill strong moral values and respect in our students.</p>
          </div>

          <div className="bg-white text-blue-900 p-8 rounded-xl shadow-lg border hover:shadow-2xl transition">
            <h3 className="text-2xl font-semibold mb-2">Excellence</h3>
            <p>We maintain high academic standards and expect the best from every student.</p>
          </div>

          <div className="bg-blue-900 text-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-semibold mb-2">Innovation</h3>
            <p>We integrate digital literacy and modern learning tools in our teaching.</p>
          </div>

        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">Why Parents Choose Us</h2>

          <ul className="space-y-4 text-gray-700 text-lg">
            <li>✔ Highly qualified teachers with modern training</li>
            <li>✔ Safe and secure learning environment</li>
            <li>✔ Blended learning with digital tools</li>
            <li>✔ Strong focus on character development and discipline</li>
            <li>✔ Affordable and flexible school fees</li>
            <li>✔ Active parent-teacher communication and support</li>
            <li>✔ Clean classrooms and a well-organized environment</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-900 py-14">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-white mb-4">Join Grace International School</h2>
          <p className="text-white/80 text-lg mb-6">
            Enroll your child in a school committed to excellence and global learning.
          </p>
          <a 
            href="/contact"
            className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-3 text-lg font-bold rounded-full"
          >
            Contact Us Today
          </a>
        </div>
      </section>

    </div>
  );
}
