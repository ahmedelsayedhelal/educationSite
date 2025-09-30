import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        {/* الأقسام الأربعة جمب بعض */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Byway Description */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Byway</h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              Empowering learners through accessible and engaging online education.
              Byway is a leading online learning platform dedicated to providing 
              high-quality, flexible, and affordable educational experiences.
            </p>
          </div>

          {/* Get Help */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get Help</h4>
            <ul className="space-y-2">
              <li><a  className="text-gray-300 hover:text-white transition">Contact Us</a></li>
              <li><a  className="text-gray-300 hover:text-white transition">Latest Articles</a></li>
              <li><a  className="text-gray-300 hover:text-white transition">FAQ</a></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Programs</h4>
            <ul className="space-y-2">
              <li><a  className="text-gray-300 hover:text-white transition">Art & Design</a></li>
              <li><a  className="text-gray-300 hover:text-white transition">Business</a></li>
              <li><a  className="text-gray-300 hover:text-white transition">IT & Software</a></li>
              <li><a  className="text-gray-300 hover:text-white transition">Languages</a></li>
              <li><a  className="text-gray-300 hover:text-white transition">Programming</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="text-gray-300 space-y-2 text-sm">
              <p>Address: 123 Main Street, Anytown, CA 12345</p>
              <p>Tel: +(123) 456-7890</p>
              <p>Mail: bywayedu@webkud.in</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Byway. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;