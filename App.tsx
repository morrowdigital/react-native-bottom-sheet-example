import BottomSheet from "@gorhom/bottom-sheet"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { MyButton } from "./src/components/MyButton"
import { Popup } from "./src/components/Popup"

export default function App() {
  const bottomSheetRef = useRef<BottomSheet>(null)

  const snapPoints = useMemo(() => ["30%", "60%"], [])

  const [currentIndex, setCurrentIndex] = useState(-1)
  const [showBottomSheet, setShowBottomSheet] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  const [enablePopUp, setEnablePopUp] = useState(true)

  const handleSheetChanges = useCallback((index: number) => {
    setEnablePopUp(index === -1)
    setShowBottomSheet(index > -1)
    setCurrentIndex(index)
    console.log("handleSheetChanges", index)
  }, [])

  console.log("enable popup", enablePopUp)

  useEffect(() => {
    if (showBottomSheet) {
      bottomSheetRef.current?.snapToIndex(0)
    } else {
      bottomSheetRef.current?.close()
    }
  }, [showBottomSheet])

  const handlePopupChanges = useCallback((index: number) => {
    console.log("handlePopupChanges", index)
    if (index === -1) {
      // setShowPopup(false)
    }
  }, [])

  return (
    <GestureHandlerRootView
      style={{ flex: 1, paddingTop: 50, backgroundColor: "#edeef0" }}
    >
      <View style={styles.container}>
        <MyButton
          onPress={() => {
            setShowBottomSheet(!showBottomSheet)
          }}
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
        <BottomSheet
          index={-1}
          enablePanDownToClose={true}
          style={showBottomSheet ? styles.shadow : null}
          // style={styles.shadow}
          // detached={true}
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.popupText}>Awesome! 🎉</Text>
            <View style={styles.btnWrap}>
              <MyButton
                onPress={() => {
                  if (currentIndex == 1) {
                    bottomSheetRef.current?.snapToIndex(0)
                  } else {
                    bottomSheetRef.current?.snapToIndex(1)
                  }
                }}
                title={`Animate To ${currentIndex == 1 ? "30%" : "60%"}`}
              />
            </View>
          </View>
        </BottomSheet>
      </View>
      {/* <View style={styles.popupWrap}> */}
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    justifyContent: "center",
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  btnWrap: {
    padding: 12,
  },
  container: {
    flex: 1,
    padding: 24,
    // backgroundColor: "rgb(59, 34, 168)",
  },
  contentContainer: {
    marginTop: 24,
    flex: 1,
    alignItems: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.78,
    shadowRadius: 12,

    elevation: 24,
  },
  popupText: {
    fontSize: 44,
  },
  popup: {
    flex: 1,
    alignItems: "center",
    // add horizontal space
    marginHorizontal: 34,
    // padding: 24,
    // backgroundColor: "red",
  },
  popupWrap: {
    // flex: 1,
    // padding: 24,
    // backgroundColor: "grey",
  },
})
