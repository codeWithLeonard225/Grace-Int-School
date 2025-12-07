"use client";

import { useState } from "react";
import Image from "next/image";

const galleryItems = [
  {
    type: "image",
    src: "/images/sports1.jpg",
    alt: "Soccer Match",
    category: "Sports",
    title: "Exciting Soccer Match",
    description: "Our students showing great teamwork and sportsmanship during the soccer tournament."
  },
  {
    type: "image",
    src: "/images/sports2.jpg",
    alt: "Basketball Game",
    category: "Sports",
    title: "Basketball Championship",
    description: "Highlight of the basketball championship where our team excelled."
  },
  {
    type: "image",
    src: "/images/thanksgiving1.jpg",
    alt: "Thanksgiving Celebration",
    category: "Thanksgiving",
    title: "Thanksgiving Celebration",
    description: "Students and staff celebrating gratitude and community spirit during Thanksgiving."
  },
  {
    type: "video",
    src: "/videos/fieldtrip.mp4",
    alt: "Field Trip Video",
    category: "Field Trip",
    title: "Science Field Trip",
    description: "A fun educational field trip where students explored local science museums."
  },
  {
    type: "image",
    src: "/images/debate1.jpg",
    alt: "Debate Competition",
    category: "Debates",
    title: "Debate Competition",
    description: "Students showcasing their debating skills in the inter-school debate competition."
  },
  {
    type: "video",
    src: "/videos/debate.mp4",
    alt: "Debate Video",
    category: "Debates",
    title: "Debate Highlights",
    description: "Video highlights from the school's annual debate contest."
  },
];

const categories = ["All", "Sports", "Thanksgiving", "Field Trip", "Debates"];

export default function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [modalItem, setModalItem] = useState(null); // Item to show in modal

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-900 mb-12">
        School Gallery
      </h1>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              activeCategory === cat
                ? "bg-blue-900 text-white shadow-lg"
                : "bg-white text-blue-900 border border-blue-900 hover:bg-blue-900 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {filteredItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => setModalItem(item)}
          >
            {item.type === "image" ? (
              <Image
                src={item.src}
                alt={item.alt}
                width={500}
                height={300}
                className="object-cover w-full h-64 md:h-72"
              />
            ) : (
              <video
                src={item.src}
                className="w-full h-64 md:h-72 object-cover"
                controls
                muted
                loop
              />
            )}

            {/* Title & Description */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-1">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalItem && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setModalItem(null)}
        >
          <div
            className="bg-white rounded-xl overflow-hidden max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {modalItem.type === "image" ? (
              <Image
                src={modalItem.src}
                alt={modalItem.alt}
                width={800}
                height={450}
                className="object-cover w-full h-[400px] md:h-[500px]"
              />
            ) : (
              <video
                src={modalItem.src}
                className="w-full h-[400px] md:h-[500px] object-cover"
                controls
                autoPlay
              />
            )}
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold text-blue-900 mb-2">{modalItem.title}</h3>
              <p className="text-gray-700">{modalItem.description}</p>
              <button
                onClick={() => setModalItem(null)}
                className="mt-4 px-6 py-2 bg-blue-900 text-white rounded-full hover:bg-blue-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
