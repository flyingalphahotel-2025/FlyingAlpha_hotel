// components/InvoicePDF.jsx
import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tagline: {
    fontSize: 10,
    marginBottom: 20,
    color: '#666',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontSize: 10,
    fontWeight: 'bold',
    width: '40%',
  },
  value: {
    fontSize: 10,
    width: '60%',
  },
  guests: {
    marginTop: 10,
    marginBottom: 10,
  },
  guestTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  guest: {
    marginBottom: 5,
    fontSize: 10,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginVertical: 10,
  },
  paymentSection: {
    marginTop: 15,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 5,
  },
  footer: {
    marginTop: 30,
    fontSize: 8,
    textAlign: 'center',
    color: '#666',
  },
});

// PDF Document component
const InvoiceDocument = ({ booking }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>FlyingAlpha Hotel</Text>
        <Text style={styles.tagline}>Experience Luxury at FlyingAlpha Hotel</Text>
      </View>

      <Text style={styles.title}>BOOKING INVOICE</Text>

      {/* Booking Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Booking Information</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Booking ID:</Text>
          <Text style={styles.value}>{booking.bookingId}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Booking Date:</Text>
          <Text style={styles.value}>{new Date(booking.createdAt).toLocaleDateString()}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Check-in:</Text>
          <Text style={styles.value}>
            {new Date(booking.checkInDate).toLocaleDateString()} at {booking.checkInTime}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Check-out:</Text>
          <Text style={styles.value}>
            {new Date(booking.checkOutDate).toLocaleDateString()} at {booking.checkOutTime}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Room Type:</Text>
          <Text style={styles.value}>{booking.roomType}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Room Numbers:</Text>
          <Text style={styles.value}>{booking.roomNumbers.join(', ')}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Number of Rooms:</Text>
          <Text style={styles.value}>{booking.noOfRooms}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Number of Guests:</Text>
          <Text style={styles.value}>{booking.noOfPersons}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Purpose:</Text>
          <Text style={styles.value}>{booking.purpose.charAt(0).toUpperCase() + booking.purpose.slice(1)}</Text>
        </View>
      </View>

      {/* Guest Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Guest Information</Text>
        <View style={styles.guests}>
          {booking.users.map((user, index) => (
            <View key={user._id} style={styles.guest}>
              <Text>Guest {index + 1}: {user.fullName}</Text>
              <Text>Phone: {user.mobileNumber}</Text>
              <Text>Email: {user.email}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.divider} />

      {/* Payment Details */}
      <View style={styles.paymentSection}>
        <Text style={styles.sectionTitle}>Payment Information</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Total Amount:</Text>
          <Text style={styles.value}>Rs {booking.totalPrice.toLocaleString()}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Payment Method:</Text>
          <Text style={styles.value}>{booking.paymentMethod}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Payment Status:</Text>
          <Text style={styles.value}>{booking.paymentStatus}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Amount Paid:</Text>
          <Text style={styles.value}>Rs {booking.paidAmount.toLocaleString()}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Balance Due:</Text>
          <Text style={styles.value}>Rs {booking.leftAmount.toLocaleString()}</Text>
        </View>

        <View style={styles.total}>
          <Text style={styles.label}>TOTAL DUE:</Text>
          <Text style={styles.value}> Rs {booking.leftAmount.toLocaleString()}</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Thank you for choosing FlyingAlpha Hotel. We look forward to making your stay memorable.</Text>
        <Text>For any inquiries, please contact us at support@flyingalpha.in or +91 7909065928 |+91 9661799667</Text>
      </View>
    </Page>
  </Document>  
);

// Component to trigger PDF download
export function InvoicePDFDownloader({ bookingId }) {
  const [booking, setBooking] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/offlineBooking/${bookingId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch booking');
        }
        const data = await response.json();
        setBooking(data.booking);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching booking:', err);
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchBooking();
    }
  }, [bookingId]);

  if (loading) return <div className="text-center">Loading invoice...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!booking) return null;

  const fileName = `FlyingAlpha_Invoice_${booking.bookingId.replace('#', '')}.pdf`;

  return (
    <PDFDownloadLink
      document={<InvoiceDocument booking={booking} />}
      fileName={fileName}
      className="hidden"
      id="pdf-download-link"
    >
      {({ blob, url, loading, error }) => {
        if (loading) {
          return 'Generating invoice...';
        }
        return 'Download Invoice';
      }}
    </PDFDownloadLink>
  );
}

export function AutoDownloadPDF({ bookingId, onComplete }) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      const downloadLink = document.getElementById('pdf-download-link');
      if (downloadLink) {
        downloadLink.click();
        onComplete?.(); // Reset state
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [bookingId, onComplete]);

  return <InvoicePDFDownloader bookingId={bookingId} />;
}