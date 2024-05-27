import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import PdfDocument from '../components/generateInvoice/Invoice';

function Download() {
  const fileName = "Invoice.pdf";

  return (
    <div className="App">
      <div className="pdf-viewer">
        <PDFViewer width={600} height={800} showToolbar={false}>
          <PdfDocument />
        </PDFViewer>
      </div>

      <div className='download-link'>
        <PDFDownloadLink
          document={<PdfDocument  />}
          fileName={fileName}
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading..." : "Download Invoice"
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
}

export default Download;