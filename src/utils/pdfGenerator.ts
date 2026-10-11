import { jsPDF } from 'jspdf';

// Wolf head SVG path data for PDF rendering
// This is the exact TOM wolf-face emblem used throughout the brand
function drawWolfHead(doc: jsPDF, x: number, y: number, size: number, filled: boolean = true) {
  const s = size / 64; // scale factor
  const ox = x;
  const oy = y;

  doc.setLineWidth(0.5 * s);

  if (filled) {
    doc.setFillColor(17, 17, 17); // #111111
    // Main head shape
    doc.triangle(
      ox + 32 * s, oy + 4 * s,   // top center
      ox + 14 * s, oy + 18 * s,  // left ear base
      ox + 6 * s, oy + 10 * s,   // left ear tip
      'F'
    );
    doc.triangle(
      ox + 32 * s, oy + 4 * s,   // top center
      ox + 50 * s, oy + 18 * s,  // right ear base
      ox + 58 * s, oy + 10 * s,  // right ear tip
      'F'
    );
    // Main head body
    doc.rect(ox + 14 * s, oy + 18 * s, 36 * s, 16 * s, 'F');
    // Lower face / snout area
    doc.triangle(
      ox + 14 * s, oy + 34 * s,
      ox + 50 * s, oy + 34 * s,
      ox + 32 * s, oy + 46 * s,
      'F'
    );
    // Cheeks
    doc.rect(ox + 18 * s, oy + 34 * s, 8 * s, 8 * s, 'F');
    doc.rect(ox + 38 * s, oy + 34 * s, 8 * s, 8 * s, 'F');
    // Chin
    doc.triangle(
      ox + 22 * s, oy + 42 * s,
      ox + 42 * s, oy + 42 * s,
      ox + 32 * s, oy + 52 * s,
      'F'
    );

    // Eyes (white)
    doc.setFillColor(255, 255, 255);
    doc.circle(ox + 24 * s, oy + 28 * s, 3 * s, 'F');
    doc.circle(ox + 40 * s, oy + 28 * s, 3 * s, 'F');

    // Pupils
    doc.setFillColor(17, 17, 17);
    doc.circle(ox + 24.5 * s, oy + 28 * s, 1.5 * s, 'F');
    doc.circle(ox + 40.5 * s, oy + 28 * s, 1.5 * s, 'F');

    // Snout line
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(1.2 * s);
    doc.line(ox + 28 * s, oy + 36 * s, ox + 32 * s, oy + 39 * s);
    doc.line(ox + 32 * s, oy + 39 * s, ox + 36 * s, oy + 36 * s);

    // Nose
    doc.setFillColor(60, 60, 60);
    doc.ellipse(ox + 32 * s, oy + 36 * s, 2 * s, 1.5 * s, 'F');
  } else {
    // Outline only
    doc.setDrawColor(17, 17, 17);
    doc.setLineWidth(1 * s);
    // Simplified outline
    doc.lines(
      [
        [18, 6, false],  // to right ear tip
        [-12, 8, true],  // to right ear base
        [0, 16, true],   // down right side
        [-4, 8, true],   // cheek
        [-10, 10, true], // chin right
        [-10, -10, true],// chin left
        [-4, -8, true],  // cheek left
        [0, -16, true],  // up left side
        [-12, -8, true], // left ear base
        [18, -6, true],  // to top
      ],
      ox + 14 * s, oy + 18 * s,
      [1, 1], 'FD'
    );
  }
}

// Draw a decorative divider line
function drawDivider(doc: jsPDF, y: number, pageWidth: number) {
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  const margin = 25;
  doc.line(margin, y, pageWidth - margin, y);
  // Center diamond ornament
  doc.setFillColor(17, 17, 17);
  const cx = pageWidth / 2;
  doc.triangle(cx - 2, y, cx, y - 2, cx + 2, y, 'F');
  doc.triangle(cx - 2, y, cx, y + 2, cx + 2, y, 'F');
}

// Draw subtle border frame
function drawPageFrame(doc: jsPDF, pageWidth: number, pageHeight: number) {
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.3);
  const m = 12;
  doc.rect(m, m, pageWidth - 2 * m, pageHeight - 2 * m);
  // Inner frame
  doc.setDrawColor(240, 240, 240);
  doc.rect(m + 2, m + 2, pageWidth - 2 * m - 4, pageHeight - 2 * m - 4);
}

// Draw corner registration marks
function drawCornerMarks(doc: jsPDF, pageWidth: number, pageHeight: number) {
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.2);
  const m = 8;
  const len = 6;
  // Top-left
  doc.line(m, m, m + len, m);
  doc.line(m, m, m, m + len);
  // Top-right
  doc.line(pageWidth - m, m, pageWidth - m - len, m);
  doc.line(pageWidth - m, m, pageWidth - m, m + len);
  // Bottom-left
  doc.line(m, pageHeight - m, m + len, pageHeight - m);
  doc.line(m, pageHeight - m, m, pageHeight - m - len);
  // Bottom-right
  doc.line(pageWidth - m, pageHeight - m, pageWidth - m - len, pageHeight - m);
  doc.line(pageWidth - m, pageHeight - m, pageWidth - m, pageHeight - m - len);
}

export interface RegistrationData {
  firstName: string;
  surname: string;
  email: string;
  country: string;
  state: string;
  city: string;
  language: string;
  interests: string[];
  skills: string;
  experience: string;
  contribution: string;
  github: string;
  portfolio: string;
  participation: string;
  token: string;
  date: string;
}

export function generateRegistrationPDF(data: RegistrationData): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 25;
  const contentWidth = pageWidth - 2 * margin;
  let yPos = 20;

  // ===== PAGE 1: COVER / HEADER =====

  // Page frame
  drawPageFrame(doc, pageWidth, pageHeight);
  drawCornerMarks(doc, pageWidth, pageHeight);

  // Header band
  doc.setFillColor(17, 17, 17);
  doc.rect(0, 0, pageWidth, 45, 'F');

  // Wolf logo in header (white on black)
  doc.setFillColor(255, 255, 255);
  // Draw wolf silhouette simplified for header
  const wolfX = margin;
  const wolfY = 10;
  const wolfS = 0.4;
  // Head shape
  doc.triangle(wolfX + 32 * wolfS, wolfY + 4 * wolfS, wolfX + 14 * wolfS, wolfY + 18 * wolfS, wolfX + 6 * wolfS, wolfY + 10 * wolfS, 'F');
  doc.triangle(wolfX + 32 * wolfS, wolfY + 4 * wolfS, wolfX + 50 * wolfS, wolfY + 18 * wolfS, wolfX + 58 * wolfS, wolfY + 10 * wolfS, 'F');
  doc.rect(wolfX + 14 * wolfS, wolfY + 18 * wolfS, 36 * wolfS, 16 * wolfS, 'F');
  doc.triangle(wolfX + 14 * wolfS, wolfY + 34 * wolfS, wolfX + 50 * wolfS, wolfY + 34 * wolfS, wolfX + 32 * wolfS, wolfY + 46 * wolfS, 'F');
  doc.triangle(wolfX + 22 * wolfS, wolfY + 42 * wolfS, wolfX + 42 * wolfS, wolfY + 42 * wolfS, wolfX + 32 * wolfS, wolfY + 52 * wolfS, 'F');
  // Eyes
  doc.setFillColor(17, 17, 17);
  doc.circle(wolfX + 24 * wolfS, wolfY + 28 * wolfS, 2.5 * wolfS, 'F');
  doc.circle(wolfX + 40 * wolfS, wolfY + 28 * wolfS, 2.5 * wolfS, 'F');

  // Brand name in header
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('TOM', wolfX + 30, 22);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('COMMUNITY REGISTRATION', wolfX + 30, 28);
  doc.setFontSize(7);
  doc.setTextColor(180, 180, 180);
  doc.text('Task-Oriented Multimodal Agent Runtime', wolfX + 30, 33);

  // Registration badge on right
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('OFFICIAL DOCUMENT', pageWidth - margin - 35, 18);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(180, 180, 180);
  doc.text(`Issued: ${data.date}`, pageWidth - margin - 35, 24);
  doc.text(`Token: ${data.token.slice(0, 16)}...`, pageWidth - margin - 35, 29);

  // ===== MAIN CONTENT =====
  yPos = 55;

  // Title
  doc.setTextColor(17, 17, 17);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('Community Registration', margin, yPos);
  yPos += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('Official record of your TOM community membership application', margin, yPos);
  yPos += 12;

  // Divider
  drawDivider(doc, yPos, pageWidth);
  yPos += 10;

  // Applicant Name (large)
  doc.setTextColor(17, 17, 17);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  const fullName = `${data.firstName} ${data.surname}`.trim() || 'Applicant';
  doc.text(fullName, margin, yPos);
  yPos += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(data.email || 'Email not provided', margin, yPos);
  yPos += 12;

  // Registration Token Box
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(margin, yPos, contentWidth, 20, 2, 2, 'F');
  doc.setDrawColor(220, 220, 220);
  doc.roundedRect(margin, yPos, contentWidth, 20, 2, 2, 'S');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(130, 130, 130);
  doc.text('REGISTRATION TOKEN', margin + 5, yPos + 6);
  doc.setFont('courier', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(17, 17, 17);
  doc.text(data.token, margin + 5, yPos + 14);
  yPos += 28;

  // Details section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(17, 17, 17);
  doc.text('Registration Details', margin, yPos);
  yPos += 8;

  // Details table
  const details = [
    ['Full Name', fullName],
    ['Email', data.email || '—'],
    ['Country', data.country || '—'],
    ['State', data.state || '—'],
    ['City', data.city || '—'],
    ['Language', data.language || '—'],
    ['Experience', data.experience || '—'],
    ['GitHub', data.github || '—'],
    ['Portfolio', data.portfolio || '—'],
  ].filter(([, v]) => v !== '—' || true);

  doc.setFontSize(9);
  details.forEach(([label, value]) => {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100, 100, 100);
    doc.text(label, margin + 2, yPos);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(17, 17, 17);
    // Truncate long values
    const displayValue = value.length > 60 ? value.slice(0, 57) + '...' : value;
    doc.text(displayValue, margin + 40, yPos);
    yPos += 6;
  });

  yPos += 6;
  drawDivider(doc, yPos, pageWidth);
  yPos += 10;

  // Interests
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(17, 17, 17);
  doc.text('Areas of Interest', margin, yPos);
  yPos += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  if (data.interests.length > 0) {
    const interestText = data.interests.join('  •  ');
    const lines = doc.splitTextToSize(interestText, contentWidth);
    doc.text(lines, margin + 2, yPos);
    yPos += lines.length * 5;
  } else {
    doc.setTextColor(150, 150, 150);
    doc.text('No interests selected', margin + 2, yPos);
    yPos += 5;
  }

  yPos += 6;

  // Skills
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(17, 17, 17);
  doc.text('Skills & Expertise', margin, yPos);
  yPos += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  if (data.skills) {
    const skillLines = doc.splitTextToSize(data.skills, contentWidth);
    doc.text(skillLines, margin + 2, yPos);
    yPos += skillLines.length * 5;
  } else {
    doc.setTextColor(150, 150, 150);
    doc.text('Not specified', margin + 2, yPos);
    yPos += 5;
  }

  yPos += 6;

  // Contribution preference
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(17, 17, 17);
  doc.text('Contribution Preference', margin, yPos);
  yPos += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  const contribText = data.contribution || data.participation || 'Not specified';
  doc.text(contribText, margin + 2, yPos);
  yPos += 12;

  // ===== PAGE 2: INSTRUCTIONS & FOOTER =====
  doc.addPage();
  yPos = 20;

  // Page 2 frame
  drawPageFrame(doc, pageWidth, pageHeight);
  drawCornerMarks(doc, pageWidth, pageHeight);

  // Page 2 header
  doc.setFillColor(17, 17, 17);
  doc.rect(0, 0, pageWidth, 20, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('TOM Community Registration — Next Steps', margin, 13);

  // Small wolf mark
  doc.setFillColor(255, 255, 255);
  const miniS = 0.2;
  const miniX = pageWidth - margin - 15;
  const miniY = 4;
  doc.triangle(miniX + 32 * miniS, miniY + 4 * miniS, miniX + 14 * miniS, miniY + 18 * miniS, miniX + 6 * miniS, miniY + 10 * miniS, 'F');
  doc.triangle(miniX + 32 * miniS, miniY + 4 * miniS, miniX + 50 * miniS, miniY + 18 * miniS, miniX + 58 * miniS, miniY + 10 * miniS, 'F');
  doc.rect(miniX + 14 * miniS, miniY + 18 * miniS, 36 * miniS, 16 * miniS, 'F');

  yPos = 30;

  doc.setTextColor(17, 17, 17);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Complete Your Registration', margin, yPos);
  yPos += 10;

  const steps = [
    { num: '1', title: 'Save this PDF', desc: 'Keep this document safe. It contains your unique registration token and submitted details.' },
    { num: '2', title: 'Copy your token', desc: `Your token is: ${data.token}. Copy it for the next step.` },
    { num: '3', title: 'Open WhatsApp', desc: 'Use the link provided on the registration completion page to open a WhatsApp conversation with the TOM community team.' },
    { num: '4', title: 'Send your documents', desc: 'Attach this PDF and include your registration token in the message. The team will review your application manually.' },
    { num: '5', title: 'Await confirmation', desc: 'Your registration will be reviewed. You will receive confirmation once approved. This is not instant membership.' },
  ];

  steps.forEach((step) => {
    // Number circle
    doc.setFillColor(17, 17, 17);
    doc.circle(margin + 4, yPos - 1.5, 4, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(step.num, margin + 2.5, yPos);

    // Title
    doc.setTextColor(17, 17, 17);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(step.title, margin + 12, yPos);
    yPos += 5;

    // Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(80, 80, 80);
    const descLines = doc.splitTextToSize(step.desc, contentWidth - 14);
    doc.text(descLines, margin + 12, yPos);
    yPos += descLines.length * 4.5 + 6;
  });

  yPos += 8;
  drawDivider(doc, yPos, pageWidth);
  yPos += 10;

  // Privacy notice
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(17, 17, 17);
  doc.text('Privacy Notice', margin, yPos);
  yPos += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(80, 80, 80);
  const privacyText = 'Your personal data is collected solely for community onboarding purposes. We do not share your information with third parties. You may request deletion of your data at any time by contacting the TOM community team. This document contains your submitted information — treat your registration token as confidential.';
  const privacyLines = doc.splitTextToSize(privacyText, contentWidth);
  doc.text(privacyLines, margin, yPos);
  yPos += privacyLines.length * 4 + 10;

  // Important notice box
  doc.setFillColor(255, 248, 230);
  doc.setDrawColor(250, 200, 100);
  doc.roundedRect(margin, yPos, contentWidth, 22, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(120, 80, 0);
  doc.text('IMPORTANT', margin + 4, yPos + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('This document is proof of your registration submission, not proof of membership approval.', margin + 4, yPos + 11);
  doc.text('Membership is granted only after manual review by the TOM community team.', margin + 4, yPos + 16);

  yPos += 30;

  // Footer
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.line(margin, pageHeight - 20, pageWidth - margin, pageHeight - 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text('TOM — Task-Oriented Multimodal Agent Runtime', margin, pageHeight - 15);
  doc.text('Open Source · Apache-2.0 · github.com/Raghav509/TOM', margin, pageHeight - 11);
  doc.text(`Generated: ${data.date}`, pageWidth - margin - 35, pageHeight - 15);
  doc.text('Page 2 of 2', pageWidth - margin - 15, pageHeight - 11);

  // Save
  const safeName = (data.firstName || 'applicant').replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`TOM_Registration_${safeName}_${data.token.slice(0, 8)}.pdf`);
}
