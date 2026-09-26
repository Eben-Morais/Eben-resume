import React, { useState, memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import {
  ArrowUpRight, ArrowDownToLine, Copy, Check,
  Mail, Phone, MapPin, Linkedin, Github,
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

function Contact({ onCopyEmail }) {
  const shouldReduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopyEmail(portfolioData.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const contactLinks = [
    {
      icon: Phone,
      label: 'Telephone',
      display: portfolioData.contact.phone,
      href: `tel:${portfolioData.contact.phone.replace(/\s+/g, '')}`,
      external: false,
    },
    {
      icon: MapPin,
      label: 'Location',
      display: portfolioData.contact.location,
      href: null,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      display: 'linkedin.com/in/eben-morais',
      href: portfolioData.contact.linkedin,
      external: true,
    },
    {
      icon: Github,
      label: 'GitHub',
      display: 'github.com/Eben-Morais',
      href: portfolioData.contact.github,
      external: true,
    },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="py-24 sm:py-32 relative"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="contact-title"
          eyebrow="06 // Contact"
          title="Let's discuss an entry-level development opportunity."
          description="Available for Junior Web Developer and Junior Backend Developer roles."
        />

        {/* Business card container */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.06 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          {/* Top gradient accent stripe */}
          <div
            className="h-px w-full"
            style={{ background: 'linear-gradient(90deg, transparent, var(--accent), var(--accent-violet), transparent)' }}
            aria-hidden="true"
          />

          <div className="p-7 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">

            {/* Left: Contact channels */}
            <div className="lg:col-span-7 space-y-8">

              {/* Primary email — hero element */}
              <div>
                <span
                  className="block text-xs font-mono font-semibold tracking-widest uppercase mb-3"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Direct Inquiry · Primary Channel
                </span>
                <a
                  href={`mailto:${portfolioData.contact.email}`}
                  className="group text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight transition-all duration-200"
                  style={{
                    fontFamily: '"Plus Jakarta Sans", Inter, sans-serif',
                    color: 'var(--text-primary)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; }}
                >
                  {portfolioData.contact.email}
                </a>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="btn-secondary flex items-center gap-2"
                  id="contact-copy-email"
                >
                  {copied
                    ? <Check className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} aria-hidden="true" />
                    : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
                  <span>{copied ? 'Copied!' : 'Copy Email'}</span>
                </button>

                <a
                  href={portfolioData.contact.cvFile}
                  download="Eben_Morais_CV.pdf"
                  className="btn-secondary flex items-center gap-2"
                >
                  <ArrowDownToLine className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Download CV</span>
                </a>

                <a
                  href={portfolioData.contact.vcfFile}
                  download="Eben_Artizio_Morais.vcf"
                  className="btn-secondary flex items-center gap-2"
                >
                  <ArrowDownToLine className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>vCard</span>
                </a>
              </div>

              {/* Contact details grid */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 pt-5"
                style={{ borderTop: '1px solid var(--border)' }}
              >
                {contactLinks.map(({ icon: Icon, label, display, href, external }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        background: 'var(--accent-softer)',
                        border: '1px solid var(--border-accent)',
                      }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} aria-hidden="true" />
                    </div>
                    <div>
                      <p
                        className="text-[10px] font-mono font-semibold tracking-widest uppercase mb-0.5"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          target={external ? '_blank' : undefined}
                          rel={external ? 'noopener noreferrer' : undefined}
                          className="text-sm font-medium inline-flex items-center gap-1 transition-colors"
                          style={{ color: 'var(--text-secondary)' }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
                        >
                          {display}
                          {external && <ArrowUpRight className="w-3 h-3 opacity-50" aria-hidden="true" />}
                        </a>
                      ) : (
                        <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                          {display}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Digital business card (QR) */}
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.04 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-2xl p-6 sm:p-7 flex flex-col items-center text-center max-w-xs w-full"
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-accent)',
                }}
              >
                {/* Gradient corner accent */}
                <div
                  className="absolute top-0 right-0 w-20 h-20 rounded-bl-3xl rounded-tr-2xl opacity-30"
                  style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-violet))' }}
                  aria-hidden="true"
                />

                <img
                  src={portfolioData.contact.qrCode}
                  alt="QR code containing Eben Artizio Morais's contact card"
                  width="160"
                  height="160"
                  loading="lazy"
                  className="w-36 h-36 rounded-xl object-contain mb-5 relative z-10"
                  style={{ background: '#fff', padding: '8px' }}
                />

                <span
                  className="text-xs font-mono font-bold tracking-widest uppercase mb-2 relative z-10"
                  style={{ color: 'var(--accent)' }}
                >
                  Direct Contact Card
                </span>
                <p
                  className="text-xs leading-relaxed relative z-10"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Scan to instantly import full contact record including phone, email, address, LinkedIn, and GitHub.
                </p>

                {/* Name badge at bottom */}
                <div
                  className="mt-5 pt-4 w-full text-center relative z-10"
                  style={{ borderTop: '1px solid var(--border)' }}
                >
                  <p
                    className="text-sm font-bold"
                    style={{
                      fontFamily: '"Plus Jakarta Sans", Inter, sans-serif',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {portfolioData.personal.name}
                  </p>
                  <p
                    className="text-xs font-mono mt-0.5"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {portfolioData.personal.roles.join(' · ')}
                  </p>
                </div>
              </motion.div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default memo(Contact);
