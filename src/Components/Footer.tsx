import React from "react";
import {
  Film,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="w-screen bg-indigo-700 text-white py-8 px-6 mt-15 dark:bg-gray-900 dark:text-gray-300">
      <div className="mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Film className="text-xl dark:text-indigo-400" />
            <span className="font-bold italic text-lg dark:text-white">
              Movie Z
            </span>
          </div>
          <p className="text-sm dark:text-gray-400">
            © 2024 Movie Z. All Rights Reserved.
          </p>
        </div>

        <div className="flex gap-16">
          <div>
            <h3 className="font-semibold text-lg mb-2 dark:text-white">
              Contact Information
            </h3>
            <div className="flex items-center gap-2 mb-1 pt-4">
              <Mail className="dark:text-gray-400" />
              <div>
                <p className="dark:text-gray-300">E-Mail:</p>
                <p className="dark:text-gray-300">support@moviez.com</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-4">
              <Phone className="dark:text-gray-400" />
              <div>
                <p className="dark:text-gray-300">Phone:</p>
                <p className="dark:text-gray-300">+976 99770070</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2 dark:text-white">
              Follow us
            </h3>
            <div className="flex gap-6 ">
              <a
                href="#"
                className="hover:underline flex items-center gap-1 dark:text-gray-400 hover:dark:text-white"
              >
                <Facebook className="dark:text-gray-400" /> Facebook
              </a>
              <a
                href="#"
                className="hover:underline flex items-center gap-1 dark:text-gray-400 hover:dark:text-white"
              >
                <Instagram className="dark:text-gray-400" /> Instagram
              </a>
              <a
                href="#"
                className="hover:underline flex items-center gap-1 dark:text-gray-400 hover:dark:text-white"
              >
                <Twitter className="dark:text-gray-400" /> Twitter
              </a>
              <a
                href="#"
                className="hover:underline flex items-center gap-1 dark:text-gray-400 hover:dark:text-white"
              >
                <Youtube className="dark:text-gray-400" /> Youtube
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
