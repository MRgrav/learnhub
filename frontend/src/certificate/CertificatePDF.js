import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer'; 

export default function CertificatePDF() {
    const styles = StyleSheet.create({
        page: {
            width: '100%',
            height: 'fit-content'
        },
        pageBackground: {
            position: 'absolute',
            minWidth: '100%',
            minHeight: 'auto',
            display: 'block',
            height: 'auto',
            width: '100%',
        },
        container: {
            padding: 10
        },
        heading: {
            fontWeight: 'bold',
            fontSize: '24dp'
        }
    });
  return (
    <Document>
        <Page size="LETTER" orientation="landscape" style={styles.page}>
            <Image src="./media/bgCertificate.jpeg" style={styles.pageBackground}/>
            <View style={styles.container}>
                <Text style={styles.heading}>Hello</Text>
            </View>
        </Page>
    </Document>
  )
}
