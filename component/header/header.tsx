"use client"; 

import Link from 'next/link';
import Image from 'next/image';
import {
  Heart,
  Search,
  ShoppingBag,
  User,
  ChevronDown,
} from 'lucide-react';
import styles from './Header.module.css'; 
import MobileHeader from './MobileHeader';

const CustomTagIcon = ({ size = 16, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className} 
  >
    <path
      d="M14.6667 7.26146V2.72812C14.6667 1.72812 14.24 1.32812 13.18 1.32812H10.4867C9.42667 1.32812 9 1.72812 9 2.72812V7.26146C9 8.26146 9.42667 8.66146 10.4867 8.66146H13.18C14.24 8.66146 14.6667 8.26146 14.6667 7.26146Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.6667 13.2719V12.0719C14.6667 11.0719 14.24 10.6719 13.18 10.6719H10.4867C9.42667 10.6719 9 11.0719 9 12.0719V13.2719C9 14.2719 9.42667 14.6719 10.4867 14.6719H13.18C14.24 14.6719 14.6667 14.2719 14.6667 13.2719Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.0026 8.72813V13.2615C7.0026 14.2615 6.57594 14.6615 5.51594 14.6615H2.8226C1.7626 14.6615 1.33594 14.2615 1.33594 13.2615V8.72813C1.33594 7.72813 1.7626 7.32812 2.8226 7.32812H5.51594C6.57594 7.32812 7.0026 7.72813 7.0026 8.72813Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.0026 2.72812V3.92813C7.0026 4.92813 6.57594 5.32813 5.51594 5.32813H2.8226C1.7626 5.32813 1.33594 4.92813 1.33594 3.92813V2.72812C1.33594 1.72812 1.7626 1.32812 2.8226 1.32812H5.51594C6.57594 1.32812 7.0026 1.72812 7.0026 2.72812Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


const Header = () => {
  const navLinks = [
    { name: 'SHOP', href: '/#' },
    { name: 'SKILLS', href: '/#' },
    { name: 'STORIES', href: '/#' },
    { name: 'ABOUT', href: '/#' },
    { name: 'CONTACT US', href: '#' },
  ];

  const mobileActionIcons = [
    { name: 'Wishlist', href: '/wishlist', icon: <Heart size={24} strokeWidth={1.5} /> },
    { name: 'Search', href: '/search', icon: <Search size={24} strokeWidth={1.5} /> },
    { name: 'Account', href: '/account', icon: <User size={24} strokeWidth={1.5} /> },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.announcementBar}>
        <div className={`${styles.container} ${styles.announcementContent}`}>
          <div className={styles.announcementItemMobile}>
            <CustomTagIcon size={16} />
            <span>Lorem ipsum dolor</span>
          </div>
          {/* On desktop, show all three */}
          <div className={styles.announcementItemDesktop}>
            <CustomTagIcon size={16} />
            <span>Lorem ipsum dolor</span>
          </div>
          <div className={`${styles.announcementItemDesktop} ${styles.ml16}`}>
            <CustomTagIcon size={16} />
            <span>Lorem ipsum dolor</span>
          </div>
          <div className={`${styles.announcementItemDesktop} ${styles.ml16} ${styles.lgFlex}`}>
            <CustomTagIcon size={16} />
            <span>Lorem ipsum dolor</span>
          </div>
        </div>
      </div>

      
      <nav className={styles.mainNav}>
        <div className={styles.container}>          
          <div className={styles.desktopNav}>
            <div className={styles.desktopNavLogoIcon}>
              <Link href="/">
                <Image
                  src="/logo.svg"
                  alt="Shop Logo"
                  width={32}
                  height={32}
                />
              </Link>
            </div>

            
            <div>
              <Link 
                href="/" 
                className={styles.desktopNavLogoText}
              >
                LOGO
              </Link>
            </div>

            
            <div className={styles.desktopNavActions}>
              <div className={styles.desktopNavActionsInner}>
                <button className={styles.actionButton} aria-label="Search">
                  <Search size={24} strokeWidth={1.5} />
                </button>
                <button className={styles.actionButton} aria-label="Wishlist">
                  <Heart size={24} strokeWidth={1.5} />
                </button>
                <button className={styles.actionButton} aria-label="Cart">
                  <ShoppingBag size={24} strokeWidth={1.5} />
                </button>
                <button className={styles.actionButton} aria-label="Account">
                  <User size={24} strokeWidth={1.5} />
                </button>
                <button className={styles.actionButton}>
                  <span style={{fontWeight:"bold"}}>ENG</span>
                  <ChevronDown size={24} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>

          <MobileHeader navLinks={navLinks} mobileActionIcons={mobileActionIcons} />
          <div className={styles.desktopNavLinksContainer}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={styles.desktopNavLink}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;