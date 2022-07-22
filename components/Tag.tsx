import { StyleProp, StyleSheet, ViewStyle } from "react-native"
import { Text, View } from "./Themed"

export type TagProps = {
    title: string,
    style?: StyleProp<ViewStyle>
}

export function Tag({ title, style }: TagProps) {
    return (
        <View style={[styles.tag, style]}>
            <Text style={styles.content}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    tag: {
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#ffffff'
    },
    content: {
        fontSize: 12
    }
})