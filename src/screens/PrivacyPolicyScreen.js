import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const PrivacyPolicyScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Privacy Policy</Text>
      <Text style={styles.text}>
        This privacy policy applies to the JO EV app (hereby referred to as "Application") for mobile devices created by (hereby referred to as "Service Provider") as a free service. This service is intended for use "AS IS".

        <Text style={styles.subTitle}>What information does the Application obtain and how is it used?</Text>
        {'\n'}
        The Application does not obtain any information when you download and use it. Registration is not required to use the Application.

        <Text style={styles.subTitle}>Does the Application collect precise real-time location information of the device?</Text>
        {'\n'}
        This Application does not collect precise information about the location of your mobile device.

        <Text style={styles.subTitle}>Do third parties see and/or have access to information obtained by the Application?</Text>
        {'\n'}
        Since the Application does not collect any information, no data is shared with third parties.

        <Text style={styles.subTitle}>What are my opt-out rights?</Text>
        {'\n'}
        You can stop all collection of information by the Application easily by uninstalling it. You may use the standard uninstall processes available as part of your mobile device or via the mobile application marketplace.

        <Text style={styles.subTitle}>Children</Text>
        {'\n'}
        The Application is not used to knowingly solicit data from or market to children under the age of 13. The Service Provider does not knowingly collect personally identifiable information from children. We encourage parents and legal guardians to monitor their children’s Internet usage and to help enforce this Policy. If you believe that a child has provided personally identifiable information to the Service Provider, please contact us at 2024joev@gmail.com so that we can take necessary actions. Additionally, you must be at least 16 years old to consent to the processing of your personally identifiable information in your country.

        <Text style={styles.subTitle}>Security</Text>
        {'\n'}
        The Service Provider is concerned about safeguarding the confidentiality of your information. However, since the Application does not collect any information, there is no risk of unauthorized access to your data.

        <Text style={styles.subTitle}>Changes</Text>
        {'\n'}
        This Privacy Policy may be updated periodically. We will notify you of any changes by updating this page. Please consult this Privacy Policy regularly for any changes, as continued use signifies approval of the updates.

        Effective Date: September 11, 2024

        <Text style={styles.subTitle}>Your Consent</Text>
        {'\n'}
        By using the Application, you consent to the processing of your information as outlined in this Privacy Policy and as amended by the Service Provider.

        <Text style={styles.subTitle}>Contact Us</Text>
        {'\n'}
        If you have any questions regarding privacy while using the Application or about our practices, please contact us via email at 2024joev@gmail.com.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5', // Light grey background
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    color: '#222', // Dark grey color for the title
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333', // Slightly lighter grey for the body text
    textAlign: 'justify', // Justify text for a professional look
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#444', // Darker grey color for section titles
  },
});

export default PrivacyPolicyScreen;
