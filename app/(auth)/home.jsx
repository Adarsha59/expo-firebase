import { Stack } from "expo-router";
import {
  Button,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Modal,
  Animated,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/context/AuthProvider";
import { useCRUD } from "@/context/CrudProvider";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Home() {
  const { username } = useAuth();
  const [text, settext] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editText, setEditText] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const { read, create, update, remove } = useCRUD();
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleCreate = () => {
    if (text) {
      create(text);
      settext("");
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item.id);
    setEditText(item.data);
    setModalVisible(true);
  };

  const confirmEdit = () => {
    if (editText && selectedItem) {
      update(selectedItem, editText);

      setModalVisible(false);
      setSelectedItem(null);
      setEditText("");
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "To-Do App" }} />
      <Animated.View style={[styles.header, { opacity: animation }]}>
        <Text style={styles.headerText}>Welcome, {username || "Guest"}!</Text>
      </Animated.View>
      <TextInput
        placeholder="Enter a task"
        placeholderTextColor="#bbb"
        style={styles.input}
        value={text}
        onChangeText={(text) => settext(text)}
      />
      <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
      <FlatList
        data={read}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <Animated.View
            style={[styles.listItem, { transform: [{ scale: animation }] }]}
          >
            <Text style={styles.itemText}>{item.data}</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEdit(item)}
              >
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => remove(item)}
              >
                <Text style={styles.actionText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Task</Text>
            <TextInput
              style={styles.modalInput}
              value={editText}
              onChangeText={(text) => setEditText(text)}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={confirmEdit}
              >
                <Text style={styles.actionText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.actionText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp("5%"),
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    marginBottom: hp("3%"),
  },
  headerText: {
    fontSize: hp("3%"),
    fontWeight: "bold",
    color: "#4a90e2",
  },
  input: {
    width: wp("85%"),
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("1.5%"),
    fontSize: hp("2%"),
    backgroundColor: "#fff",
    marginBottom: hp("2%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  createButton: {
    backgroundColor: "#4a90e2",
    paddingVertical: hp("1.8%"),
    paddingHorizontal: wp("20%"),
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: hp("2.2%"),
    fontWeight: "bold",
    textAlign: "center",
  },
  listContainer: {
    marginTop: hp("2%"),
    paddingBottom: hp("10%"),
    width: wp("90%"),
  },
  listItem: {
    backgroundColor: "#fff",
    padding: hp("2%"),
    marginBottom: hp("1%"),
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: {
    fontSize: hp("2%"),
    color: "#333",
    flex: 1,
  },
  actionButtons: {
    flexDirection: "row",
  },
  editButton: {
    backgroundColor: "#ffd54f",
    paddingHorizontal: wp("3%"),
    paddingVertical: hp("0.8%"),
    borderRadius: 5,
    marginRight: wp("2%"),
  },
  deleteButton: {
    backgroundColor: "#e57373",
    paddingHorizontal: wp("3%"),
    paddingVertical: hp("0.8%"),
    borderRadius: 5,
  },
  actionText: {
    color: "#fff",
    fontSize: hp("1.8%"),
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    width: wp("80%"),
    padding: hp("2%"),
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: hp("2.5%"),
    fontWeight: "bold",
    color: "#333",
    marginBottom: hp("2%"),
  },
  modalInput: {
    width: wp("70%"),
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("1.5%"),
    fontSize: hp("2%"),
    backgroundColor: "#f9f9f9",
    marginBottom: hp("2%"),
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp("70%"),
  },
  confirmButton: {
    backgroundColor: "#4caf50",
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("5%"),
    borderRadius: 8,
    marginRight: wp("2%"),
  },
  cancelButton: {
    backgroundColor: "#f44336",
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("5%"),
    borderRadius: 8,
  },
});
