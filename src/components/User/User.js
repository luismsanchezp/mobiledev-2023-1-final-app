import React from 'react'
import { 
  View, 
  StyleSheet, 
  Text
} from 'react-native';

export const User = ({
  userItem
}) => {

  //Give format to birthdate so that it can be displayed as Month long, day long and year
    const birthdateDate = new Date(userItem?.profile?.birthdate);
    const birthdateMonth = birthdateDate.toLocaleString('default', { month: 'long' });
    const birthdateDay = birthdateDate.toLocaleString('default', { day: 'numeric' });
    const birthdateYear = birthdateDate.toLocaleString('default', { year: 'numeric' });
    const birthdateString = birthdateMonth + " " + birthdateDay + ", " + birthdateYear;

  return (
    <View style={styles.item}>
        <Text style={styles.title}>{userItem?.profile?.names+" "}{userItem?.profile?.lastnames}</Text>
        <View style={styles.viewText}>
            <Text style={styles.textSubtitle}>Email</Text>
            <Text style={styles.text}>{userItem?.email}</Text>
        </View>
        <View style={styles.viewText}>
            <Text style={styles.textSubtitle}>Birthdate</Text>
            <Text style={styles.text}>{birthdateString}</Text>
        </View>
        <View style={styles.viewText}>
            <Text style={styles.textSubtitle}>Phone</Text>
            <Text style={styles.text}>{userItem?.profile?.phoneNumber}</Text>
        </View>
        <View style={styles.viewText}>
            <Text style={styles.textSubtitle}>City</Text>
            <Text style={styles.text}>{userItem?.profile?.city}</Text>
        </View>
        <View style={styles.viewText}>
            <Text style={styles.textSubtitle}>State</Text>
            <Text style={styles.text}>{userItem?.profile?.state}</Text>
        </View>
        <View style={styles.viewText}>
            <Text style={styles.textSubtitle}>Role</Text>
            <Text style={styles.text}>{userItem?.role}</Text>
        </View>
        <View style={styles.viewText}>
            <Text style={styles.textSubtitle}>Active</Text>
            <Text style={styles.text}>{userItem?.active ? "Yes" : "No"}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  textSubtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 10,
  },
  text: {
    fontSize: 14,
    color: '#000',
  },
  compDesc: {
    marginTop: 10,
  },
  viewText: {
    flexDirection: 'row',
    marginTop: 10,
  },
  editButton: {
    alignItems: 'center',
    backgroundColor: '#f4d73b',
    borderRadius: 10,
    padding: 10,
    width: 100,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  editButtonTxt: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
  },
});