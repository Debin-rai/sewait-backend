/**
 * Utility to generate a PDF from an HTML element
 * We use a dynamic import because html2pdf often relies on window/document, 
 * which aren't available during server-side rendering in Next.js.
 */
export async function downloadAsPDF(elementId: string, filename: string) {
    if (typeof window === "undefined") return;

    try {
        // Dynamically import html2pdf to avoid SSR issues
        // We use any specifically because the types for html2pdf.js are often missing or problematic
        const html2pdfModule = (await import('html2pdf.js' as any)).default;

        const element = document.getElementById(elementId);
        if (!element) {
            console.error(`Element with id ${elementId} not found.`);
            return;
        }

        const opt = {
            margin: [15, 15, 15, 15], // Top, Left, Bottom, Right margins in mm
            filename: `${filename}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true }, // Higher scale for better resolution
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Generate and save the PDF
        await html2pdfModule().set(opt).from(element).save();
    } catch (error) {
        console.error("Error generating PDF:", error);
    }
}
