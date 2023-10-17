import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { BottomSheetComponent } from "./src/components/BottomSheetComponent"
import { MyButton } from "./src/components/MyButton"
import { Popup } from "./src/components/Popup"

export default function App() {
  const [showBottomSheet, setShowBottomSheet] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  const [enablePopUp, setEnablePopUp] = useState(true)
  const [enableBottomSheet, setEnableBottomSheet] = useState(true)

  useEffect(() => {
    if (showBottomSheet) {
      setEnablePopUp(false)
    } else {
      setEnablePopUp(true)
    }
  }, [showBottomSheet])

  useEffect(() => {
    if (showPopup) {
      setEnableBottomSheet(false)
    } else {
      setEnableBottomSheet(true)
    }
  }, [showPopup])

  return (
    <GestureHandlerRootView
      style={{ flex: 1, paddingTop: 50, backgroundColor: "#edeef0" }}
    >
      <View style={styles.container}>
        <MyButton
          onPress={() => {
            setShowBottomSheet(!showBottomSheet)
          }}
          disabled={!enableBottomSheet}
          title={`${showBottomSheet ? "Hide" : "Show"} Bottom Sheet`}
        />
        <MyButton
          onPress={() => {
            setShowPopup(!showPopup)
          }}
          disabled={!enablePopUp}
          title={`${showPopup ? "Hide" : "Show"} Popup`}
        />
        <Popup showPopup={showPopup} setShowPopup={setShowPopup} />
        <BottomSheetComponent
          showBottomSheet={showBottomSheet}
          setShowBottomSheet={setShowBottomSheet}
        />
      </View>
      {/* <View style={styles.popupWrap}> */}
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
})
