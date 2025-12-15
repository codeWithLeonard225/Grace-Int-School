// app/(main)/services/page.js

import Image from "next/image";
import Link from "next/link";

// Local metadata export for page-specific SEO
export const metadata = {
  title: "School Services | Academic Programs & Support | Grace International School",
  description:
    "Discover the academic programs offered by Grace International School, from Nursery to Senior Secondary (WASSCE), with available facilities and student support where applicable.",
};

// Updated service categories (realistic for Sierra Leone context)
const serviceCategories = [
 { 
    name: "Academic Programs", 
    description: "Our structured academic pathways guide students from foundational learning through to national and international examinations.", 
    icon: "🎓",
    details: [
      "Nursery School: Early years education focused on play, socialization, and cognitive development.",
      "Primary School: Foundational literacy, numeracy, and character building in preparation for future grades.",
      "Junior Secondary (BECE): Comprehensive curriculum focused on preparing students for the Basic Education Certificate Examination (BECE).",
      "Senior Secondary (WASSCE): Advanced studies aimed at achieving excellence in the West African Senior School Certificate Examination (WASSCE)."
    ],
    image: "/images/service-academics.jpg" 
  },
  {
    name: "Student Support & School Life",
    description:
      "Student welfare and school life services provided based on available resources, with a focus on discipline, guidance, and moral values.",
    icon: "🧑‍🏫",
    details: [
      "Guidance & Counseling: Academic and personal guidance where available.",
      "Co-curricular Activities: Sports, clubs, and social activities depending on school capacity.",
      "Character & Moral Education: Emphasis on discipline, respect, and leadership.",
      "Parental Engagement: Regular communication between school and parents.",
    ],
    image: "/images/service-support.jpg",
  },
  {
    name: "Facilities & Learning Environment",
    description:
      "Learning facilities vary by school. While not all schools have modern facilities, efforts are made to create a safe and effective learning environment.",
    icon: "🏫",
    details: [
      "Classrooms: Well-structured classrooms suitable for effective teaching and learning.",
      "Basic ICT Exposure: Computer studies where resources are available.",
      "Library Access: Textbooks and reading materials to support learning.",
      "Safe School Environment: Clean and secure surroundings for students.",
    ],
    image: "/images/service-facilities.jpg",
  },
];

export default function ServicesPage() {
  return (
    <div className="services-page-content">
      {/* HERO SECTION */}
      <section className="bg-green-600 py-16 px-6 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Our School Services
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-95">
          We provide quality education from Nursery to Senior Secondary level, with supportive school life services and learning environments suited to our context.
        </p>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-16 px-6 max-w-7xl mx-auto space-y-20">
        {serviceCategories.map((service, index) => (
          <div
            key={service.name}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Image */}
            <div className="relative h-72 w-full rounded-xl shadow-xl overflow-hidden">
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <span className="text-4xl mb-4 inline-block">{service.icon}</span>
              <h2 className="text-3xl font-bold text-blue-900 mb-4">
                {service.name}
              </h2>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed border-l-4 border-green-600 pl-4">
                {service.description}
              </p>

              <ul className="space-y-3 text-gray-600">
                {service.details.map((detail, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-green-600 mr-2 text-xl font-bold">✓</span>
                    {detail}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="mt-6 inline-block text-white bg-blue-700 hover:bg-blue-800 font-semibold px-6 py-3 rounded-full transition shadow-md"
              >
                Contact Us →
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-gray-100 py-12 border-t">
        <div className="max-w-4xl mx-auto text-center p-6">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">
            Admissions Ongoing
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Enroll your child today and give them a strong academic foundation for the future.
          </p>
          <Link
            href="/admissions"
            className="bg-red-500 hover:bg-red-600 text-white text-lg font-bold px-8 py-3 rounded-full shadow-lg transition"
          >
            Apply Now →
          </Link>
        </div>
      </section>
    </div>
  );
}
