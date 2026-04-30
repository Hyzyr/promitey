# Landing Page Sections

This directory contains all sections for the public landing page.

## 📖 Development Guide

**Before adding or modifying sections, read:**

→ [Landing Page Conventions](../../../../docs/LANDING_PAGE_CONVENTIONS.md) — **Rules and best practices**

## 🏗️ Current Sections

- [hero-section.tsx](hero-section.tsx) — Hero banner with CTA
- [benefits/](benefits/) — Feature benefits grid
- [connect-guide.tsx](connect-guide.tsx) — Step-by-step connection guide
- [testimonials/](testimonials/) — Customer testimonials carousel
- [pricing/](pricing/) — Pricing plans with cards
- [faq/](faq/) — Frequently asked questions accordion

## 🎯 Quick Rules

1. **Folder vs File**: Use folder if section has 3+ components or 150+ lines
2. **Component Location**: Reusable UI → `/components/ui/`, section-specific → stay here
3. **Translations**: All text must use `useTranslations('landing.sectionName')`
4. **Container**: Wrap content in `<Container>` component
5. **Section ID**: Always add `id="section-name"` for anchor navigation

**Full conventions**: [LANDING_PAGE_CONVENTIONS.md](../../../../docs/LANDING_PAGE_CONVENTIONS.md)
