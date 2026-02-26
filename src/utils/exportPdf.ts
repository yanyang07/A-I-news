import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DailyData } from '../data/mockData';

function formatDateForTitle(dateStr: string): string {
  // "2026-02-25" → "26/02"  (yy/mm style as requested)
  const parts = dateStr.split('-'); // [2026, 02, 25]
  if (parts.length !== 3) return dateStr;
  const yy = parts[0].slice(2); // "26"
  const mm = parts[1];          // "02"
  const dd = parts[2];          // "25"
  return `${dd}/${mm}`;
}

export async function exportToPdf(data: DailyData) {
  const { date, aiInsight, newsItems } = data;
  const titleDate = formatDateForTitle(date);
  const fileName = `AI Index ${titleDate}.pdf`;

  // ── Build off-screen render container ────────────────────────────────────
  const insightParagraphs = (aiInsight || '')
    .split(/\n+/)
    .filter((p) => p.trim())
    .map((p) => `<p style="margin:0 0 10px 0;line-height:1.8;">${p}</p>`)
    .join('');

  const newsRows = newsItems
    .map((item) => {
      const link = item.sourceLinks?.[0] || '';
      const linkHtml = link
        ? `<div style="margin-top:3px;"><a href="${link}" style="color:#0891b2;font-size:11px;word-break:break-all;">${link}</a></div>`
        : '';
      return `
        <tr>
          <td style="padding:9px 8px;border-bottom:1px solid #f0f0f0;vertical-align:top;">
            <div style="font-size:12.5px;font-weight:500;color:#111;line-height:1.55;">${item.title}</div>
            ${linkHtml}
          </td>
          <td style="padding:9px 8px;border-bottom:1px solid #f0f0f0;vertical-align:top;width:68px;text-align:center;">
            <span style="font-size:10px;background:#f1f5f9;color:#475569;padding:2px 7px;border-radius:4px;white-space:nowrap;">${item.site}</span>
          </td>
        </tr>`;
    })
    .join('');

  const container = document.createElement('div');
  container.style.cssText = `
    position: fixed;
    top: -9999px;
    left: -9999px;
    width: 794px;
    background: #fff;
    padding: 48px 56px;
    font-family: "PingFang SC","Microsoft YaHei","Helvetica Neue",Arial,sans-serif;
    color: #111;
    box-sizing: border-box;
  `;

  container.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:6px;">
      <div style="width:32px;height:32px;background:linear-gradient(135deg,#06b6d4,#2563eb);border-radius:8px;display:flex;align-items:center;justify-content:center;">
        <span style="color:#fff;font-weight:800;font-size:13px;">AI</span>
      </div>
      <span style="font-size:20px;font-weight:800;color:#0e1726;letter-spacing:-.3px;">AI Index</span>
    </div>
    <div style="font-size:12px;color:#64748b;margin-bottom:28px;">${date}</div>

    ${aiInsight ? `
    <div style="font-size:11px;font-weight:700;color:#0891b2;letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px;padding-bottom:6px;border-bottom:2px solid #e0f2fe;">AI Insight</div>
    <div style="background:#f8fafc;border-left:3px solid #0891b2;padding:12px 16px;border-radius:4px;margin-bottom:26px;font-size:13px;color:#334155;line-height:1.8;">
      ${insightParagraphs}
    </div>
    ` : ''}

    <div style="font-size:11px;font-weight:700;color:#0891b2;letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px;padding-bottom:6px;border-bottom:2px solid #e0f2fe;">
      News · ${newsItems.length} Updates
    </div>
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        <tr>
          <th style="font-size:10.5px;color:#64748b;font-weight:600;text-align:left;padding:5px 8px 8px;border-bottom:2px solid #e2e8f0;">标题 / 链接</th>
          <th style="font-size:10.5px;color:#64748b;font-weight:600;text-align:center;padding:5px 8px 8px;border-bottom:2px solid #e2e8f0;width:68px;">平台</th>
        </tr>
      </thead>
      <tbody>${newsRows}</tbody>
    </table>
  `;

  document.body.appendChild(container);

  try {
    // Render to canvas (handles CJK fonts via OS)
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      windowWidth: 794,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();   // 210mm
    const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // If content overflows one page, split across multiple pages
    let yOffset = 0;
    while (yOffset < imgHeight) {
      if (yOffset > 0) pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, -yOffset, imgWidth, imgHeight);
      yOffset += pageHeight;
    }

    pdf.save(fileName);
  } finally {
    document.body.removeChild(container);
  }
}
