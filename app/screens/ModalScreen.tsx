import { navigationRef } from "@/navigators"
import { SafeAreaView, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { useConfirmationModal } from "./ConfirmationModal"

export const ModalScreen = () => {
  const { showConfirmation } = useConfirmationModal()
  return (
    <SafeAreaView
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "gray",
        opacity: 0.8,
        flex: 1,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          console.log("Showing modal!")
          showConfirmation({ messageTx: "common:modal", options: { durationMillis: 2000 } })
        }}
        style={{
          width: 200,
          height: 45,
          backgroundColor: "green",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text>Show react native modal</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigationRef.goBack()}
        style={{
          width: 200,
          height: 45,
          backgroundColor: "orange",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Close Modal</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

// @demo remove-file
