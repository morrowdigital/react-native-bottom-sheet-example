import BottomSheet from "@gorhom/bottom-sheet"
import { useCallback, useEffect, useRef, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { MyButton } from "./MyButton"

export function BottomSheetComponent({
  showBottomSheet,
  setShowBottomSheet,
}: {
  showBottomSheet: boolean
  setShowBottomSheet: (b: boolean) => void
}) {
  // create a reference to the bottom sheet
  const bottomSheetRef = useRef<BottomSheet>(null)

  //custom snap points
  const snapPoints = ["30%", "60%"]

  //track the current snap point index
  const [currentIndex, setCurrentIndex] = useState(-1)

  // track on which snap point index bottom sheet is currently
  const handleSheetChanges = useCallback((index: number) => {
    setShowBottomSheet(index > -1)
    setCurrentIndex(index)
  }, [])

  // expand bottom sheet when showBottomSheet is true to the first snap point
  useEffect(() => {
    if (showBottomSheet) {
      bottomSheetRef.current?.snapToIndex(0)
    } else {
      bottomSheetRef.current?.close()
    }
  }, [showBottomSheet])

  return (
    <BottomSheet
      index={-1}
      enablePanDownToClose={true}
      style={showBottomSheet ? styles.shadow : null}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.popupText}>Awesome! 🎉</Text>
        <View style={styles.btnWrap}>
          <MyButton
            onPress={() => {
              // if current snap point is 1, snap to 0, else snap to 1
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
  )
}

const styles = StyleSheet.create({
  btnWrap: {
    padding: 12,
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
})
