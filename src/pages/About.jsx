function About() {
  return (
    <div className="min-h-screen bg-white px-6 sm:px-12 py-20 text-gray-900 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif font-semibold mb-4">Our Story</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Crafted with intention. Curated with elegance.
        </p>
      </div>

      {/* IMAGE + TEXT SECTION */}
      <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
        <img
          src="/image4.jpg" // replace with your image
          alt="About Us"
          className="w-full h-[400px] object-cover rounded-3xl shadow-lg"
        />
        <div>
          <h2 className="text-2xl font-semibold mb-4">Cool Stuff. Real Stuff.</h2>
          <p className="text-gray-700 leading-relaxed">
            Pichimango began during the height of the 2020–2021 pandemic, a time when the world slowed down and live-selling began to thrive. What started as a humble venture in a rapidly growing digital marketplace quickly evolved into a trusted name in curated resell fashion. Since then, Pichimango has consistently offered high-quality, trend-forward pieces that blend accessibility with luxury — and the journey is far from over.
          </p>

        </div>
      </div>

      {/* VALUES SECTION */}
      <div className="bg-gray-50 rounded-3xl p-10 mb-20 shadow-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center">What We Stand For</h2>
        <div className="grid sm:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-serif font-medium mb-2">Curated Quality</h3>
            <p className="text-gray-600 text-sm">
              Every item we showcase is handpicked with care — ensuring it meets our standards for design, condition, and lasting value.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-serif font-medium mb-2">Trust & Transparency</h3>
            <p className="text-gray-600 text-sm">
              We prioritize honest sourcing and product authenticity. What you see is exactly what you'll receive — no compromises.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-serif font-medium mb-2">Uncompromising Quality</h3>
            <p className="text-gray-600 text-sm">
              Quality is never an option—it’s a standard. From materials to experience, we deliver excellence.
            </p>
          </div>
        </div>
      </div>

      {/* CALL TO ACTION */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Let’s Stay Connected</h2>
        <p className="text-gray-600 mb-6">
          Follow us on Facebook and be the first to know about exclusive drops and features.
        </p>
        <a
          href="https://www.facebook.com/pichimango.ae"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition"
        >
          Follow @pichimango.ae
        </a>
      </div>
    </div>
  );
}

export default About;
