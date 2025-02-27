import { TxKeyPath } from "app/i18n"
import React, { createContext, useState, useContext, ReactNode } from "react"
import { View, ViewStyle, TextStyle, StyleProp, Modal, Text, Dimensions } from "react-native"

interface MessageModalProps {
  messageTx: TxKeyPath
  options?: {
    durationMillis?: number
    containerStyle?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
  }
}

const { width, height } = Dimensions.get('window')
/**
 * Quick modal to display confirmation to the user if something is "Sent" or "Deleted", etc.
 */
export const ConfirmationModal = ({ confirmation }: { confirmation: MessageModalProps | null }) => {
  console.log("Showing confirmation!!")
  return (
    <Modal visible={!!confirmation} animationType="fade" transparent>
      <View style={$fullScreenContainer}>
        <View style={[$messageContainer]}>
          <Text style={[$modalText]}>REACT NATIVE MODAL MESSAGE</Text>
        </View>
      </View>
    </Modal>
  )
}

const $fullScreenContainer: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  width: width,
  height: height,
  backgroundColor: "green",
}
const $messageContainer: ViewStyle = {
  backgroundColor: "black",
  borderRadius: 10,
  paddingTop: 20,
  paddingBottom: 25,
  paddingHorizontal: 36,
  justifyContent: "center",
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 20,
}

const $modalText: TextStyle = {
  color: "white",
  textAlign: "center",
  marginBottom: 3,
}

type ConfirmationModalContextType = {
  showConfirmation: (message: MessageModalProps) => Promise<void>
  confirmation: MessageModalProps | null
}

const ConfirmationModalContext = createContext<ConfirmationModalContextType | undefined>(undefined)

export const useConfirmationModal = () => {
  const context = useContext(ConfirmationModalContext)
  if (!context) {
    throw new Error("useConfirmationModal must be used within a ConfirmationModalProvider")
  }
  return context
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const ConfirmationModalProvider = ({ children }: { children: ReactNode }) => {
  const [confirmation, setConfirmation] = useState<MessageModalProps | null>(null)

  const showConfirmation = (message: MessageModalProps): Promise<void> => {
    return new Promise((resolve) => {
      setConfirmation(message)

      if (message.options?.durationMillis) {
        delay(message.options.durationMillis).then(() => {
          resolve()
          setConfirmation(null)
        })
      } else {
        resolve()
      }
    })
  }

  return (
    <ConfirmationModalContext.Provider value={{ showConfirmation, confirmation }}>
      {children}
      <ConfirmationModal confirmation={confirmation} />
    </ConfirmationModalContext.Provider>
  )
}
