import jsPDF from 'jspdf';
import { DailyData } from '../data/mockData';

// jsPDF uses built-in fonts which don't support Chinese.
// We use a Base64-embedded NotoSansSC subset approach — but since bundling a
// full CJK font (~5 MB) at runtime is heavy, we instead render via the browser
// Print API wrapped in a hidden iframe so the OS handles CJK fonts natively.
// This gives perfect fidelity for Chinese text without extra assets.

export function exportToPdf(data: DailyData) {
  const { date, aiInsight, newsItems } = data;

  // Build HTML content for the PDF
  const insightParagraphs = (aiInsight || '')
    .split(/\n+/)
    .filter((p) => p.trim())
    .map((p) => `<p style="margin:0 0 10px 0;line-height:1.7;">${p}</p>`)
    .join('');

  const newsRows = newsItems
    .map((item) => {
      const link = item.sourceLinks?.[0] || '';
      const linkHtml = link
        ? `<a href="${link}" style="color:#0891b2;font-size:11px;word-break:break-all;">${link}</a>`
        : '<span style="color:#aaa;font-size:11px;">—</span>';
      return `
        <tr>
          <td style="padding:8px 6px;border-bottom:1px solid #f0f0f0;vertical-align:top;">
            <div style="font-size:12px;font-weight:500;color:#1a1a1a;line-height:1.5;">${item.title}</div>
            <div style="margin-top:3px;">${linkHtml}</div>
          </td>
          <td style="padding:8px 6px;border-bottom:1px solid #f0f0f0;vertical-align:top;width:72px;text-align:center;">
            <span style="font-size:10px;background:#f1f5f9;color:#475569;padding:2px 6px;border-radius:4px;">${item.site}</span>
          </td>
        </tr>`;
    })
    .join('');

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>AI Daily · ${date}</title>
  <style>
    @page { margin: 20mm 18mm; }
    body { font-family: "PingFang SC","Microsoft YaHei","Helvetica Neue",sans-serif; color:#1a1a1a; margin:0; }
    h1 { font-size:22px; font-weight:700; color:#0e1726; margin:0 0 4px 0; }
    .date-badge { display:inline-block; font-size:12px; color:#64748b; margin-bottom:18px; }
    .section-title { font-size:13px; font-weight:700; color:#0891b2; letter-spacing:.08em; text-transform:uppercase; margin:0 0 10px 0; padding-bottom:6px; border-bottom:2px solid #e0f2fe; }
    .insight-box { background:#f8fafc; border-left:3px solid #0891b2; padding:12px 16px; border-radius:4px; margin-bottom:24px; font-size:13px; color:#334155; }
    table { width:100%; border-collapse:collapse; }
    th { font-size:11px; color:#64748b; font-weight:600; text-align:left; padding:6px 6px 8px; border-bottom:2px solid #e2e8f0; }
  </style>
</head>
<body>
  <h1>AI Daily Intelligence</h1>
  <span class="date-badge">${date}</span>

  ${aiInsight ? `
  <div class="section-title">AI Insight</div>
  <div class="insight-box">${insightParagraphs}</div>
  ` : ''}

  <div class="section-title">News · ${newsItems.length} Updates</div>
  <table>
    <thead>
      <tr>
        <th>标题 / 链接</th>
        <th style="width:72px;text-align:center;">平台</th>
      </tr>
    </thead>
    <tbody>
      ${newsRows}
    </tbody>
  </table>
</body>
</html>`;

  // Open in hidden iframe and trigger print-to-PDF
  const iframe = document.createElement('iframe');
  iframe.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;';
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument || iframe.contentWindow?.document;
  if (!doc) return;

  doc.open();
  doc.write(html);
  doc.close();

  // Give the browser a moment to render fonts, then print
  setTimeout(() => {
    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();
    // Clean up after dialog closes
    setTimeout(() => document.body.removeChild(iframe), 2000);
  }, 500);
}
