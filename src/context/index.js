import BusinessContextProvider, { useBezContext } from "./BusinessContextProvider";
import { ConfirmationProvider, useConfirmationContext } from "./ConfirmationProvider";

export { useBezContext, useConfirmationContext };

export function ContextManager({ children }) {
    return (
        <BusinessContextProvider>
            <ConfirmationProvider>{children}</ConfirmationProvider>
        </BusinessContextProvider>
    );
}
