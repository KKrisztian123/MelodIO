import { IonGrid, IonRow } from "@ionic/react"
import type { PropsWithChildren } from "react"

/** Contains Selection Items */
const SelectionContainer = ({children}: PropsWithChildren) => {
    return (
        <IonGrid>
            <IonRow class="ion-justify-content-center">
                {children}
            </IonRow>
        </IonGrid>
    )
}

export default SelectionContainer