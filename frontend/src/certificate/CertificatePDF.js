import React from 'react';
import { Document, Page, Image, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',
    flexDirection: 'row', // Landscape orientation
    backgroundColor: '#5fff9c28', // Background color
    padding: '2rem',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
  },
  firstCol: {
    columnGap: 8,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subheading: {
    fontSize: 16,
    color: 'white',
  },
  certificateText: {
    fontFamily: 'Suez One, serif',
    color: 'green',
    fontSize: '62',
    marginBottom: 5,
  },
});

const CertificatePDF = () => {
  return (
    <Document>
      <Page size="letter" orientation="landscape" style={styles.page}>
        {/* Background Image */}
        <Image src="./media/lighBG.png" style={styles.backgroundImage} />

        {/* Content */}
        <View style={styles.content}>
            <View style={styles.firstCol}>
                
            </View>
         <Text style={styles.certificateText}>CERTIFICATE</Text>
                <Text style={styles.certificateText}>OF COMPLETION</Text>
          {/* <Text style={styles.heading}>Hello, React-PDF!</Text>
          <Text style={styles.subheading}>This is a single-page PDF with a background image.</Text> */}
        </View>
      </Page>
    </Document>
  );
};

export default CertificatePDF;
