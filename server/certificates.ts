import puppeteer from "puppeteer";

export async function generateCertificate(html: string): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });

  try {
    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}
