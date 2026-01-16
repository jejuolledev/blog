'use client';

import { useState } from 'react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { PageTransition } from '@/components/page-transition';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open email client with form data
    const subject = encodeURIComponent(`[Blog Contact] ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:jejuolleapps@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <PageTransition>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold">Contact</h1>
            <p className="mt-4 text-text-muted">
              프로젝트 협업, 질문, 또는 그냥 인사도 좋습니다.
              <br />
              편하게 연락해주세요!
            </p>

            <div className="mt-12 space-y-6">
              <ContactMethod
                icon={<EmailIcon />}
                title="Email"
                value="jejuolleapps@gmail.com"
                href="mailto:jejuolleapps@gmail.com"
              />
              <ContactMethod
                icon={<WebIcon />}
                title="MoaHub"
                value="moahub.co.kr"
                href="https://moahub.co.kr"
              />
              <ContactMethod
                icon={<LocationIcon />}
                title="Location"
                value="South Korea"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-canvas-muted bg-canvas p-8">
            <h2 className="text-xl font-semibold">Send a Message</h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-canvas-muted bg-canvas-muted px-4 py-2 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-canvas-muted bg-canvas-muted px-4 py-2 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-canvas-muted bg-canvas-muted px-4 py-2 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-accent py-3 font-semibold text-white transition-opacity hover:opacity-90"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
      <SiteFooter />
    </PageTransition>
  );
}

function ContactMethod({
  icon,
  title,
  value,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <div className="rounded-lg bg-canvas-muted p-3">{icon}</div>
      <div>
        <p className="text-sm text-text-muted">{title}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="block transition-opacity hover:opacity-70"
      >
        {content}
      </a>
    );
  }

  return content;
}

function EmailIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function WebIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}
