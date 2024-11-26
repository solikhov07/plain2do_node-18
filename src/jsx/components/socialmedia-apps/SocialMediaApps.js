import React from 'react'
import { FaTelegramPlane, FaLinkedin } from "react-icons/fa"
import { FiYoutube } from "react-icons/fi";
import { LuInstagram } from "react-icons/lu";
const SocialMediaApps = () => {
    return (
        <ul className="social-icons mt-4">
        <li>
        <a href="https://t.me/plain2do">
              <i><FaTelegramPlane/></i>
            </a>
          </li>
          <li>
            <a href={"https://www.youtube.com/@Plain2Do"}>
              <i><FiYoutube/></i>
            </a>
          </li>
          <li>
            <a href={"https://www.instagram.com/plain2do/profilecard/?igsh=MmhucGdjYnpubG94"}>
              <i><LuInstagram/></i>
            </a>
          </li>
          <li>
            <a href={"https://www.linkedin.com/company/105528760/admin/dashboard/"}>
              <i><FaLinkedin/></i>
            </a>
          </li>
        </ul>
    )
}

export default SocialMediaApps