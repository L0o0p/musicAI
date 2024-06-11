import { Text } from "@react-three/drei"
import { useEffect, useState } from "react"
import { useAtom } from "jotai"
import { statusAtom } from "../../../store"
export const BubbleContent = () => {
    const [content, setContent] = useState('')
    // 完整的文本内容
    const [status] = useAtom(statusAtom)
    // 打字机效果
    useEffect(() => {
        const timeout = setTimeout(() => {
            setContent(status.slice(0, content.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
    }, [content, status]);

    return (
        <Text
            scale={.35}
            position={[0, 0, .6]}
            color={'darkgray'}
        >
            {content}
        </Text>
    )
}

// 静态文字组件
// import { Text } from "@react-three/drei"
// export const BubbleContent = () => {
//     const status = "Hello," + "\n" + " I' m Tim"

//     return (
//         <Text
//             scale={.35}
//             position={[0, 0, .6]}
//             color={'darkgray'}
//         >
//             {status}
//         </Text>
//     )
// }