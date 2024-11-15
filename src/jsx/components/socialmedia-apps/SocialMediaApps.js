import React from 'react'
import { FaInstagram, FaYoutube, FaTelegramPlane, FaLinkedinIn  } from "react-icons/fa";
const SocialMediaApps = () => {
    return (
        <ul className="social-icons mt-4">
        <li>
        <a href="https://t.me/foxdevuz">
              <i><FaTelegramPlane /></i>
            </a>
          </li>
          <li>
            <a href={"https://www.youtube.com/@Plain2Do"}>
              <FaYoutube />
            </a>
          </li>
          <li>
            <a href={"https://www.instagram.com/plain2do/profilecard/?igsh=MmhucGdjYnpubG94"}>
              <i><FaInstagram/></i>
            </a>
          </li>
          <li>
            <a href={"https://www.linkedin.com/company/105528760/admin/dashboard/"}>
              <i><FaLinkedinIn /></i>
            </a>
          </li>
        </ul>
    )
}

export default SocialMediaApps
