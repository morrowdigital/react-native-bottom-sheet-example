import BottomSheet from "@gorhom/bottom-sheet"
import { useEffect, useMemo, useRef } from "react"
import { StyleSheet, Text, View } from "react-native"
import { MyButton } from "./MyButton"

export function Popup({
  showPopup,
  setShowPopup,
}: {
  showPopup: boolean
  setShowPopup: (b: boolean) => void
}) {
  //   const [currentIndex, setCurrentIndex] = useState(-1)
  const bottomSheetRef = useRef<BottomSheet>(null)
  const popupSnappoints = useMemo(() => ["30%"], [])

  useEffect(() => {
    if (showPopup) {
      bottomSheetRef.current?.expand()
    } else {
      bottomSheetRef.current?.close()
    }
  }, [showPopup])

  return (
    <BottomSheet
      index={-1}
      enablePanDownToClose={false}
      detached={true}
      ref={bottomSheetRef}
      style={styles.popup}
      snapPoints={popupSnappoints}
      // add bottom inset to elevate the sheet
      bottomInset={60}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.popupText}>popup! </Text>
        <Text style={styles.popupText}> 🎉</Text>
        <View style={styles.btnWrap}>
          <MyButton
            onPress={() => {
              setShowPopup(false)
            }}
            title="Close"
          />
        </View>
      </View>
    </BottomSheet>
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
