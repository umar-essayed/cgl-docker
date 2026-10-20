'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  ArrowUpLeft,
  ArrowUpRight,
  MessageCircle,
} from 'lucide-react';
import { CGL_COMPANY_INFO } from '@/lib/data';
import { Locale, getDictionary } from '@/lib/i18n';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from '@/components/theme/ThemeToggle';

interface NavbarProps {
  lang?: Locale;
  variant?: 'auto' | 'dark-hero' | 'solid';
}

export default function Navbar({ lang = 'ar', variant = 'auto' }: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dict = getDictionary(lang);
  const isRtl = lang === 'ar';

  // Determine if current page has a dark cinematic hero at the top
  const isDarkHeroPage = variant === 'dark-hero' || (variant === 'auto' && (
    !pathname ||
    pathname === '/' ||
    pathname === `/${lang}` ||
    pathname === `/${lang}/` ||
    pathname.endsWith('/about')
  ));

  // Solid navbar mode is active on pages without dark hero OR when scrolled / mobile menu open
  const isSolid = !isDarkHeroPage || isScrolled || mobileMenuOpen;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle hash scrolling on page load (e.g. from another page or direct link)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.substring(1);
      const timer = setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          const navHeight = 75;
          const pos = el.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({ top: pos - navHeight, behavior: 'smooth' });
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes('#')) {
      const [targetPath, hash] = href.split('#');
      const cleanPath = (pathname || '').replace(/\/$/, '');
      const cleanTarget = (targetPath || '').replace(/\/$/, '');
      const isCurrentPage = !cleanTarget || cleanPath === cleanTarget;

      if (isCurrentPage && hash) {
        e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          const navHeight = 75;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - navHeight,
            behavior: 'smooth'
          });
          window.history.pushState(null, '', `#${hash}`);
        }
        setMobileMenuOpen(false);
      }
    } else {
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: dict.nav.about, href: `/${lang}/about` },
    { label: dict.nav.services, href: `/${lang}#services` },
    { label: dict.nav.projects, href: `/${lang}/projects` },
    { label: dict.nav.equipment, href: `/${lang}#equipment` },
    { label: dict.nav.news, href: `/${lang}/news` },
    { label: dict.nav.contact, href: `/${lang}#location` },
  ];

  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998] md:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      <header className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
        isSolid
          ? 'bg-[#FBF9F5]/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl py-2.5 shadow-sm dark:shadow-2xl border-b border-[#E6DFD3] dark:border-[#1f1f1f]' 
          : 'bg-transparent py-2.5 sm:py-3.5 border-b border-transparent'
      }`}>
        {/* Straight Accent Edge Line */}
        {isSolid && (
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#3b76b3] shadow-[0_1px_8px_rgba(59,118,179,0.45)] pointer-events-none" />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link 
            href={`/${lang}`} 
            className="flex items-center group py-0.5"
            aria-label="CGL - Creative Geotechnical Laboratories"
          >
            <Image 
              src="/assets/cgl-logo1.png" 
              alt="CGL Labs" 
              width={160} 
              height={48} 
              className="h-7 sm:h-8 md:h-9 w-auto object-contain transition-transform duration-200 group-hover:opacity-90"
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-xs xl:text-sm font-medium transition-colors whitespace-nowrap ${
                  isSolid
                    ? 'text-[#18181B] dark:text-stone-300 hover:text-[#3b76b3] dark:hover:text-[#3b76b3]'
                    : 'text-[#18181B] dark:text-white/90 hover:text-[#3b76b3] dark:hover:text-white dark:drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* WhatsApp Hotline */}
            <a
              href={`https://wa.me/${CGL_COMPANY_INFO.whatsapp1Raw}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-mono text-xs transition-colors border ${
                isSolid
                  ? 'bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-[#18181B] dark:text-stone-300 border-[#E6DFD3] dark:border-[#1f1f1f] shadow-sm'
                  : 'bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 text-[#18181B] dark:text-white border-[#E6DFD3] dark:border-white/20 backdrop-blur-md shadow-sm'
              }`}
              dir="ltr"
              title={dict.nav.whatsapp}
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>{CGL_COMPANY_INFO.phone1}</span>
            </a>

            {/* Language Switcher */}
            <LanguageSwitcher currentLang={lang} isScrolled={isSolid} />

            {/* Theme Toggle (Dark / Light) */}
            <ThemeToggle isScrolled={isSolid} />

            {/* RFQ CTA Button */}
            <Link
              href={`/${lang}/rfq`}
              className="inline-flex items-center gap-1 px-4 py-2 bg-[#3b76b3] hover:bg-[#2a5b8c] text-white text-xs font-bold rounded-lg transition-all shadow-md shadow-[#3b76b3]/20 active:scale-95"
            >
              <span>{dict.nav.rfq}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile & Tablet Actions Bar */}
          <div className="lg:hidden flex items-center gap-1.5 sm:gap-2">
            <LanguageSwitcher currentLang={lang} isScrolled={isSolid} />
            <ThemeToggle isScrolled={isSolid} />

            <Link
              href={`/${lang}/rfq`}
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 bg-[#3b76b3] hover:bg-[#2a5b8c] text-white text-xs font-bold rounded-lg transition-all shadow-sm"
            >
              <span>{dict.nav.rfq}</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg border transition-colors ${
                isSolid
                  ? 'text-[#18181B] dark:text-stone-300 border-[#E6DFD3] dark:border-[#1f1f1f] bg-white dark:bg-[#111111] shadow-sm'
                  : 'text-[#18181B] dark:text-white bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border-[#E6DFD3] dark:border-white/20 backdrop-blur-md shadow-sm'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile & Tablet Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FBF9F5] dark:bg-[#0a0a0a] border-b border-[#E6DFD3] dark:border-[#1f1f1f] px-5 py-5 space-y-4 shadow-xl dark:shadow-2xl backdrop-blur-xl">
            <nav className="space-y-1 border-b border-[#E6DFD3] dark:border-[#1f1f1f] pb-3">
              {navLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block text-sm font-medium text-[#18181B] dark:text-stone-200 hover:text-[#3b76b3] py-2 px-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="pt-1 space-y-2 text-xs font-mono">
              <a
                href={`https://wa.me/${CGL_COMPANY_INFO.whatsapp1Raw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-[#111111] border border-[#E6DFD3] dark:border-[#1f1f1f] text-[#18181B] dark:text-stone-200"
              >
                <span dir="ltr">{CGL_COMPANY_INFO.phone1}</span>
                <span className="text-[#25D366] font-sans font-medium flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5" />
                  {dict.nav.whatsapp}
                </span>
              </a>
            </div>

            <Link
              href={`/${lang}/rfq`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-full py-2.5 bg-[#3b76b3] hover:bg-[#2a5b8c] text-white font-bold rounded-lg text-xs shadow mt-2 transition-colors"
            >
              <span>{dict.nav.rfq}</span>
              <ArrowIcon className="w-4 h-4 mr-1" />
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
